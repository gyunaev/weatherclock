/*jslint esversion: 6, node : true */
"use strict";

// Requests forecast from NAAO

class ForecastProvider
{
    constructor()
    {
        // Private data storage
        this.textStatus = "Weather never updated";

        this.forecast = null;
        this.current = null;
        this.airquality = null;

        this.lastUpdateForecast = null;
        this.lastUpdateCurrent = null;
        this.nextGridRecheckTime = 0;
        this.firstForecast = null;

        // Trigger both updates immediately
        this.nextAqiUpdate = new Date();
        this.nextForecastUpdate = new Date();
       
        this.config = null;
            
        // Icon conversion to fontAwesome and background image
        // If the icon name ends with - it means 'sun' or 'moon' will be appended (for day or night)
        this.iconMapping = {
                "skc": { fa : "fa-", bg : "clear-" },
                "few": { fa : "fa-", bg : "clear-" },
                "sct": { fa : "fa-cloud-", bg : "partly-cloudy-" },
                "bkn": { fa : "fa-cloud-", bg : "partly-cloudy-" },
                "ovc": { fa : "fa-cloud", bg : "cloudy" },
                "nra": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "dra": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "wind_skc": { fa : "fa-wind", bg : "clear-" },
                "wind_few": { fa : "fa-wind", bg : "clear-" },
                "wind_sct": { fa : "fa-wind", bg : "partly-cloudy-" },
                "wind_bkn": { fa : "fa-wind", bg : "partly-cloudy-" },
                "wind_ovc": { fa : "fa-wind", bg : "cloudy" },
                "snow": { fa : "fa-snowflake", bg : "snow" },
                "rain_snow": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "rain_sleet": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "snow_sleet": { fa : "fa-snowflake", bg : "rain", rain : true },
                "fzra": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "rain_fzra": { fa : "fa-snowflake", bg : "rain", rain : true },
                "snow_fzra": { fa : "fa-snowflake", bg : "rain", rain : true },
                "sleet": { fa : "fa-snowflake", bg : "snow" },
                "rain": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "ra": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "rain_showers": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "rain_showers_hi": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "tsra": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "tsra_sct": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "tsra_hi": { fa : "fa-cloud-showers-heavy", bg : "rain", rain : true },
                "tornado": { fa : "fa-wind", bg : "cloudy" },
                "hurricane": { fa : "fa-wind", bg : "cloudy" },
                "tropical_storm": { fa : "fa-water", bg : "rain", rain : true },
                "dust": { fa : "fa-", bg : "clear-" }, 
                "smoke": { fa : "fa-", bg : "clear-" }, 
                "haze": { fa : "fa-", bg : "clear-" },
                "hot": { fa : "fa-", bg : "clear-" },
                "cold": { fa : "fa-", bg : "snow" },
                "blizzard": { fa : "fa-snowflake", bg : "snow" },
                "fog": { fa : "fa-water", "bg" : "fog" }
            };
            
        this.windDirectionMapping = {
            "N" : 0,
            "NNE" : 22,
            "NE" : 45,
            "ENE" : 67,
            "E" : 90,
            "ESE" : 112,
            "SE" : 135,
            "SSE" : 157,
            "S" : 180,
            "SSW" : 202,
            "SW" : 225,
            "WSW" : 247,
            "W" : 270,
            "WNW" : 292,
            "NW" : 315,
            "NNW" : 337.5
        };
    }
    
    // returns epoch time
    getEpoch()
    { 
        return Math.round( new Date().getTime() / 1000 )
    }

    reportError( text )
    {
        if ( typeof(logRemoteError)!== "undefined" )
            logRemoteError( text );
        else
            console.log( text );
    }
    
    // Initializes the forecast provider.
    // It also retrieves the latest stored forecast, if it has it, and lets the app know about it.
    intialize( config )
    {
        // Store the arguments
        this.config = config;

        // Run the worker asyncrhonously
        setTimeout( this._timerCallback.bind( this ), 0 );
        
        // And rerun it every minute
        setInterval( this._timerCallback.bind( this ), 60000 );
    }

    // Main update callback taking care of everything
    async _timerCallback()
    {
        // Is it time to update the grids?
        let now = new Date();
    
        if ( this.nextGridRecheckTime < now )
            await this.resolveStations();
    
        let tasks = [];
        
        // Time to update next forecast?
        if ( this.nextForecastUpdate <= now )
            tasks.push( this.updateForecast() );
    
        // Do we need AQI update?
        if ( this.nextAqiUpdate <= now )
            tasks.push( this.updateAQI() );
    
        if ( tasks.length > 0 )
            await Promise.all( tasks );
        
        // We always update current forecast in this callback
        await this.updateLocalConditions();        
    
        // And notift the client without waiting
        this.config.callback( null );
    }

    // Returns current forecast
    status()
    {
        let s = { combined : this.forecast, current : this.current, airquality : this.airquality, status : "Never updated" };
        
        if ( this.current != null )
        {
            s.status = this.textStatus;
            
            //if ( this.lastUpdateCurrent )
                //s.status + " updated: " + moment( this.lastUpdateCurrent ).fromNow();
        }
        else if ( this.config.coordinates == "" )
            s.status = "Coordinates not configured, no forecast / current information available";
        else
            s.status = "No current forecast";
            
        return s;
    }

    debugStatus()
    {
        return this.textStatus + " " + this.firstForecast + " " + this.config.forecastUrlHourly;
    }

    // Triggers a forecast update
    triggerUpdate() {
        
        this.nextForecastUpdate = null;
        this.nextAqiUpdate = null;
        this._timerCallback();
    }
    
    async _retrieve( url, datatype = "json" )
    {
        try
        {
            const response = await this.config.fetch( url, {
                        method: 'GET',
                        cache: 'no-store',
                        headers : { Accept : "application/json" }
                     } );
            
            return response.json();
        }
        catch ( ex )
        {
            console.log( ex );
            return null;
        }
    }
    
    async resolveStations()
    {
        if ( this.config.overrideForecastUrlHourly )
        {
            this.config.forecastUrlHourly = this.config.overrideForecastUrlHourly;
            console.log( "resolveStations called - forecast URL overridden to %s", this.config.forecastUrlHourly );
            return;
        }
            
        if ( this.config.coordinates == "" )
            return;
        
        console.log( "resolveStations called" );
        
        // Retrieve the grid information for coordinates
        let info = await this._retrieve( "https://api.weather.gov/points/" + this.config.coordinates );
        
        if ( info === null
        || info.properties === undefined 
        || info.properties.forecastHourly === undefined
        || info.properties.observationStations === undefined )
        {
            console.log("error: incorrect data returned by /points/ API");
            return false;
        }

        this.config.forecastUrlHourly = info.properties.forecastHourly;
    
        // Grid updated
        this.nextGridRecheckTime = this.getEpoch() + 86400;

        console.log( "resolveStations succeeded. Next on %s", this.nextGridRecheckTime.toString() );        
        return true;
    }
    
    parseFAicon( icon, isDaytime )
    {
        let defaultIcon = { fa : isDaytime ? "fas fa-sun" : "fas fa-moon", background : isDaytime ? "clear-day" : "clear-night", rain : false };
        
        if ( icon == null )
            return defaultIcon;
        
        // https://api.weather.gov/icons/land/day/rain,30?size=small
        let iconmatch = icon.match( /\/icons\/.*?\/(.*?)\/(.*?)(,.*)?\?/ );

        if ( !iconmatch )
        {
            this.reportError( "Cannot parse icon " + icon  );
            return defaultIcon;
        }
        
        if ( this.iconMapping[ iconmatch[2] ] === undefined )
        {
            this.reportError( "parseFAicon: cannot find icon match for '" + icon + "', match pattern " + iconmatch[2] );
            return defaultIcon;
        }
        
        let faicon = this.iconMapping[ iconmatch[2] ].fa;
        let bgimage = this.iconMapping[ iconmatch[2] ].bg;
        let israin = this.iconMapping[ iconmatch[2] ].rain ? this.iconMapping[ iconmatch[2] ].rain : false;
        
        // Auto-adjust for day-night
        if ( faicon.endsWith("-") )
            faicon += isDaytime ? "sun" : "moon";
        
        if ( bgimage.endsWith("-") )
            bgimage += isDaytime ? "day" : "night";        
        
        return { fa : "fas " + faicon, rain : israin, bg : bgimage };
    }
    
    async updateForecast()
    {
        const FORECAST_DAYS = 5;
        
        if ( this.config.forecastUrlHourly == null && ! await this.resolveStations() )
            return;
        
        console.log( "Updating the weather forecast from %s", this.config.forecastUrlHourly );
        let hourlydata = await this._retrieve( this.config.forecastUrlHourly );
        
        if ( hourlydata === null || hourlydata.properties === undefined || hourlydata.properties.periods === undefined )
        {
            console.log( "error: incorrect data returned by /forecast/ API" );
            this.textStatus = "Forecast update failed";
            return;
        }            

        // Iterate through daily and create summaries
        let coords = this.config.coordinates.split( ',' );
        
        // Will have the forecast combined by days, together with extra info
        let hourly = [];
        let daily = [];
        let now = new Date();
        let currentday = new Date().getDay();
        this.firstForecast = null;

        for ( let h of hourlydata.properties.periods )
        {
            // Wind is reported with 'mph' suffix and we only need the number
            let m = h.windSpeed.match( /^(\d+)\s*mph/ );

            if ( m != null )
                h.windSpeed = m[1];

            let ts = new Date( h.startTime );
            
            if ( this.firstForecast == null )
                this.firstForecast = ts;
            
            // This is current weather
            if ( ts < now )
            {
                this.current = { 
                    summary : h.shortForecast,
                    temperature : h.temperature,
                    windSpeed: h.windSpeed,
                    windDirection: this.windDirectionMapping[ h.windDirection ],
                    barometricPressure : "---",
                    relativeHumidity : "---"
                };

                // Map the icon to get the FA icon and background image using current timestamp
                let now = new Date();
                let suntime = SunCalc.getTimes( now, coords[0], coords[1] );
                this.current.isDaytime = ( now >= suntime.sunrise && now <= suntime.sunset );

                let icondata = this.parseFAicon( h.icon, this.current.isDaytime );
                this.current.faicon = icondata.fa;
                this.current.background = icondata.bg;
                
                if ( icondata.rain !== undefined )
                    this.current.israin = icondata.rain;
                else
                    this.current.israin = false;

                this.lastUpdateCurrent = new Date();
                continue;
            }

            // Did the day change? Init the structure
            if ( ts.getDay() != currentday )
            {
                if ( daily.length < FORECAST_DAYS )
                    daily.push( { startTime : ts, descs : [], icons : [], temperatureHigh : -1, temperatureLow : 9999, rainhours : 0, windSpeedLow : 9999, windSpeedHigh: 0, hourlyIndex : hourly.length } );
                
                currentday = ts.getUTCDay();
            }

            let suntime = SunCalc.getTimes( ts, coords[0], coords[1] );
            let icondata = this.parseFAicon( h.icon, ( ts >= suntime.sunrise && ts <= suntime.sunset ) );
            
            // Store the hourly forecast
            hourly.push({
                    startTime : h.startTime,
                    ts : new Date( h.startTime ),
                    isDaytime : h.isDaytime,
                    temperature : h.temperature,
                    temperatureUnit : h.temperatureUnit,
                    windSpeed: h.windSpeed,
                    windDirection: this.windDirectionMapping[ h.windDirection ],
                    faicon : icondata.fa,
                    shortForecast: h.shortForecast
            });

            // Store some data in daily
            if ( daily.length <= FORECAST_DAYS )
            {
                let index = daily.length - 1;
                
                if ( index >= 0 )
                {
                    daily[ index ].windSpeedLow = Math.min( daily[ index ].windSpeedLow, h.windSpeed );
                    daily[ index ].windSpeedHigh = Math.max( daily[ index ].windSpeedHigh, h.windSpeed );
                    
                    daily[ index ].temperatureHigh = Math.max( daily[ index ].temperatureHigh, h.temperature );
                    daily[ index ].temperatureLow = Math.min( daily[ index ].temperatureLow, h.temperature );
                    
                    // Store for future counting - we only count weather between 7am and 8pm
                    let faicon = this.parseFAicon( h.icon, true );
                    
                    if ( ts.getHours() > 6 && ts.getHours() < 21 )
                    {
                        daily[ index ].descs.push( h.shortForecast );
                        daily[ index ].icons.push( icondata.fa );
                    }
                    
                    if ( icondata.rain )
                        daily[ index ].rainhours++;
                }
            }
        }
    
        for ( let h of daily )
        {
            // See https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
            h.summary = h.descs.sort( (a,b) => h.descs.filter(v => v===a).length - h.descs.filter(v => v===b).length ).pop();
            delete h.descs;
            
            h.icon = h.icons.sort( (a,b) => h.icons.filter(v => v===a).length - h.icons.filter(v => v===b).length ).pop();
            delete h.icons;
            
            h.faicon = h.icon;
            
            // thanks Vladimir Agafonkin for a great library: https://github.com/mourner/suncalc/blob/master/suncalc.js
            let suntimes = SunCalc.getTimes( new Date( h.startTime ), coords[0], coords[1] );
            h.suntimes = { sunrise : suntimes.sunrise, sunset : suntimes.sunser };
        }
        
        if ( daily.length < FORECAST_DAYS )
        {
            this.nextForecastUpdate = this.getEpoch() + 30;
            this.textStatus = "Failed to receive full forecast";
            console.log( "Incomplete weather forecast received: %j", hourlydata );
            return;
        }
        
        let suntimes_now = SunCalc.getTimes( new Date(), coords[0], coords[1] );
        
        // Set last/next update
        this.lastUpdateForecast = new Date();
        this.nextForecastUpdate = this.getEpoch() + 1800;
        
        if ( now - this.firstForecast < 4 * 3600 )
            this.textStatus = "Up-to-date forecast received from NOAA";
        else
            this.textStatus = "The received forecast is stale";
            
        this.forecast = { daily : daily, hourly : hourly, suntimes : { sunrise : suntimes_now.sunrise, sunset : suntimes_now.sunset } };
        
        console.log( "Weather forecast updated, next update: %s", this.nextForecastUpdate );
    }

    async updateAQI()
    {
        if ( this.config.forecastUrlAirQuality == null )
            return;
            
        let aquidata = await this._retrieve( this.config.forecastUrlAirQuality  + "?_=" + new Date().getTime() );
        
        if ( aquidata === null || aquidata.data === undefined || aquidata.data.aqi === undefined )
        {
            this.reportError( "AQI update failed" );
            this.textStatus = "AQI update failed";
            this.airquality = "N/A";
        }
        else
            this.airquality = aquidata.data.aqi;
        
        this.nextAqiUpdate = this.getEpoch() + 60;
    }    
    
    validateAndParseJSON( text )
    {
        if ( typeof text !== 'undefined' && text != null )
        {
            try
            {
                let json = JSON.parse( text );
                
                if ( typeof(json) == 'object' )
                    return json;

            }
            catch ( ex ) { console.log( "failed to parse json: %j\n%s", ex,text ); }
        }
        
        return null;
    }
  
    async updateLocalConditions()
    {
        if ( this.config.forecastLocalConditionsURL == "" )
            return;
        
        try
        {
            let jsondata = await this._retrieve( this.config.forecastLocalConditionsURL + "?_=" + new Date().getTime() );
            
            if ( typeof jsondata == "string" )
                jsondata = JSON.parse( jsondata );
            
            for ( let e of Object.keys( this.current ) )
                if ( typeof jsondata[e] !== "undefined" )
                    this.current[e] = jsondata[e]
                    
            console.log( "Local conditions updated" );
            return true;
        }
        catch ( err )
        {
            console.log( "Failed to update local conditions: " + err + " while parsing local conditions" );
        }
        
        return false;
    }  
};
