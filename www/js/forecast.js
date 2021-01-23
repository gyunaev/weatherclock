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

        // Trigger both updates immediately
        this.nextAqiUpdate = new Date();
        this.nextForecastUpdate = new Date();
        
        this.update_callback = null;
            
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
    }
    
    // Initializes the forecast provider.
    // It also retrieves the latest stored forecast, if it has it, and lets the app know about it.
    intialize( updatecallback )
    {
        // Store the update callback
        this.update_callback = updatecallback;
        
        // Load the stored current, hourly and air quality data 
        this.forecast = this.validateAndParseJSON( window.localStorage.getItem( "storedforecast" ) );
        this.current = this.validateAndParseJSON( window.localStorage.getItem( "storedcurrent" ) );
        this.airquality = this.validateAndParseJSON( window.localStorage.getItem( "storedairquality" ) );

        if ( this.forecast != null && this.current != null )
        {
            this.textStatus = "Weather restored from settings";
            this.lastUpdate = new Date();
            this.update_callback( null );
        }
        
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
    
        if ( config.forecastNextRecheckTime == null || config.forecastNextRecheckTime < now )
            await this.resolveStations();
    
        let tasks = [];
        
        // Time to update next forecast?
        if ( this.nextForecastUpdate <= now )
            tasks.push( this.updateForecast() );
    
        // Do we need AQI update?
        if ( this.nextAqiUpdate <= now )
            tasks.push( this.updateAQI() );
    
        // We always update current forecast in this callback
        tasks.push( this.updateCurrent() );
        
        await Promise.all( tasks );
    
        // And notift the client without waiting
        this.update_callback( null );
    }

    // Returns current forecast
    status()
    {
        let s = { combined : this.forecast, current : this.current, airquality : this.airquality, status : "Never updated" };
        
        if ( this.current != null )
        {
            s.status = this.textStatus;
            
            if ( this.lastUpdateCurrent )
                s.status + " updated: " + moment( this.lastUpdateCurrent ).fromNow();
        }
        else if ( config.coordinates == "" )
            s.status = "Coordinates not configured, no forecast / current information available";
        else
            s.status = "No current forecast";
            
        return s;
    }

    debugStatus()
    {
        return this.textStatus + " " + this.lastSuccessfulUpdate + " " + config.forecastNextRecheckTime;
    }

    // Triggers a forecast update
    triggerUpdate() {
        
        this.nextForecastUpdate = null;
        this.nextAqiUpdate = null;
        this._timerCallback();
    }
    
    async _retrieve( url, datatype = "json" )
    {
        return new Promise( function(resolve, reject) {
            $.ajax({
                method: "GET",
                url: url,
                dataType: datatype
            })
            .done( function( info ) {
                resolve( info );
            } )
            .fail( function( err ) {
                reject( err );
            } )
        });
    }
    
    async resolveStations()
    {
        if ( config.coordinates == "" )
            return;
        
        console.log( "resolveStations called" );
        
        // Retrieve the grid information for coordinates
        let info = await this._retrieve( "https://api.weather.gov/points/" + config.coordinates );
        
        if ( info.properties === undefined 
        || info.properties.forecastHourly === undefined
        || info.properties.observationStations === undefined )
        {
            console.log("error: incorrect data returned by /points/ API");
            return false;
        }

        config.forecastUrlHourly = info.properties.forecastHourly;
    
        // Retrieve the observation stations
        let statinfo = await this._retrieve( info.properties.observationStations );

        if ( statinfo.observationStations === undefined )
        {
            console.log("error: incorrect data returned by /stations/ API");
            return false;
        }
    
        // Take the first five stations
        config.forecastUrlsCurrent = statinfo.observationStations.slice( 0, 4 );
        
        // Grid updated
        config.forecastNextRecheckTime = moment().add( 1, 'day' ).toDate();

        console.log( "resolveStations succeeded. Next on %s", config.forecastNextRecheckTime.toString() );        
        return true;
    }
    
    parseFAicon( icon )
    {
        if ( icon == null )
            return { fa : "fas fa-sun", background : "clear-day", rain : false };
        
        // https://api.weather.gov/icons/land/day/rain,30?size=small
        let iconmatch = icon.match( /\/icons\/.*?\/(.*?)\/(.*?)(,.*)?\?/ );
        
        if ( !iconmatch )
        {
            logRemoteError( "Cannot parse icon " + icon  );
            return { fa : "fas fa-sun", background : "clear-day", rain : false };
        }
        
        if ( this.iconMapping[ iconmatch[2] ] === undefined )
        {
            logRemoteError( "parseFAicon: cannot find icon match for '" + icon + "', match pattern " + iconmatch[2] );
            return { fa : "fas fa-sun", background : "clear-day", rain : false };
        }
        
        let faicon = this.iconMapping[ iconmatch[2] ].fa;
        let israin = this.iconMapping[ iconmatch[2] ].rain ? this.iconMapping[ iconmatch[2] ].rain : false;
        
        // Auto-adjust for day-night using iconmatch[1]
        if ( faicon.endsWith( '-' ) )
            faicon += faicon[1] == "night" ? 'moon' : 'sun';
        
        return { fa : "fas " + faicon, rain : israin };
    }
    
    async updateForecast()
    {
        if ( config.forecastUrlHourly == null && ! await this.resolveStations() )
            return;
        
        console.log( "Updating the weather forecast" );
        let hourlydata;

        try
        {
            hourlydata = await this._retrieve( config.forecastUrlHourly );
        }
        catch ( err )
        {
            console.log( "error: incorrect data returned by /forecast/ API" );
            this.textStatus = "Forecast update failed";
            return;
        }
        
        if ( hourlydata.properties === undefined || hourlydata.properties.periods === undefined )
        {
            console.log( "error: incorrect data returned by /forecast/ API" );
            this.textStatus = "Forecast update failed";
            return;
        }            
        
        // Will have the forecast combined by days, together with extra info
        let hourly = [];
        let daily = [];
        let now = new Date();
        let currentday = new Date().getDay();
        
        for ( let h of hourlydata.properties.periods )
        {
            let ts = new Date( h.startTime );
            
            // Ignore if already in the past
            if ( ts < now )
                continue;

            // Did the day change? Init the structure
            if ( ts.getDay() != currentday )
            {
                daily.push( { startTime : ts, descs : [], icons : [], temperatureHigh : -1, temperatureLow : 9999, rainhours : 0, windSpeedLow : 9999, windSpeedHigh: 0, hourlyIndex : hourly.length } );
                currentday = ts.getUTCDay();
            }
            
            // Wind is reported with 'mph' suffix and we only need the number
            let m = h.windSpeed.match( /^(\d+)\s*mph/ );

            if ( m != null )
                h.windSpeed = m[1];
            
            let icondata = this.parseFAicon( h.icon );
            
            // Store the hourly forecast
            hourly.push({
                    startTime : h.startTime,
                    ts : new Date( h.startTime ),
                    isDaytime : h.isDaytime,
                    temperature : h.temperature,
                    temperatureUnit : h.temperatureUnit,
                    windSpeed: h.windSpeed,
                    windDirection: h.windDirection,
                    icon: h.icon,
                    faicon : icondata.fa,
                    shortForecast: h.shortForecast
                        });

            // Store some data in daily
            let index = daily.length - 1;
            
            if ( index >= 0 )
            {
                daily[ index ].windSpeedLow = Math.min( daily[ index ].windSpeedLow, h.windSpeed );
                daily[ index ].windSpeedHigh = Math.max( daily[ index ].windSpeedHigh, h.windSpeed );
                
                daily[ index ].temperatureHigh = Math.max( daily[ index ].temperatureHigh, h.temperature );
                daily[ index ].temperatureLow = Math.min( daily[ index ].temperatureLow, h.temperature );
                
                // Store for future counting - we only count weather between 7am and 8pm
                let faicon = this.parseFAicon( h.icon );
                
                if ( ts.getHours() > 6 && ts.getHours() < 21 )
                {
                    daily[ index ].descs.push( h.shortForecast );
                    daily[ index ].icons.push( icondata.fa );
                }
                
                if ( icondata.rain )
                    daily[ index ].rainhours++;
            }
        }
    
        // Iterate through daily and create summaries
        let coords = config.coordinates.split( ',' );
        
        for ( let h of daily )
        {
            // See https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
            h.summary = h.descs.sort( (a,b) => h.descs.filter(v => v===a).length - h.descs.filter(v => v===b).length ).pop();
            delete h.descs;
            
            h.icon = h.icons.sort( (a,b) => h.icons.filter(v => v===a).length - h.icons.filter(v => v===b).length ).pop();
            delete h.icons;
            
            h.faicon = h.icon;
            
            // thanks Vladimir Agafonkin for a great library: https://github.com/mourner/suncalc/blob/master/suncalc.js
            h.suntimes = SunCalc.getTimes( new Date( h.startTime ), coords[0], coords[1] );
        }
        
        let forecast = { daily : daily, hourly : hourly, suntimes : SunCalc.getTimes( new Date(), coords[0], coords[1] ) };
        
        // Set last/next update
        this.lastUpdateForecast = new Date();
        this.nextForecastUpdate = moment().add( 60, 'minutes' ).toDate();
        this.textStatus = "New forecast received from NOAA";
        this.forecast = forecast;
        
        window.localStorage.setItem( "storedforecast", JSON.stringify( this.forecast ) );
        console.log( "Weather forecast updated, next update: %s", this.nextForecastUpdate );
    }

    async updateAQI()
    {
        if ( config.forecastUrlAirQuality == null )
            return;
            
        let aquidata = await this._retrieve( config.forecastUrlAirQuality  + "?_=" + new Date().getTime() );
        
        if ( aquidata.data === undefined || aquidata.data.aqi === undefined )
        {
            logRemoteError( "AQI update failed" );
            this.textStatus = "AQI update failed";
            this.airquality = "N/A";
        }
        else
            this.airquality = aquidata.data.aqi;
        
        this.nextAqiUpdate = moment().add( 1, 'minutes' ).toDate();        
    }    
    
    adjustForDaynight( icon, suntimes, day, night )
    {
        if ( !icon.endsWith( '-' ) )
            return icon;
            
        let doesCSSexist = function( selector )
                {
                    let selc = "." + selector;
                    for ( let st of document.styleSheets )
                        for ( let s of st.rules )
                            if ( s.cssText === selc )
                                return true;
                            
                    return false;
                };


        let suffix = day;
        let now = new Date();
        
        if ( now < suntimes.sunrise || now > suntimes.sunset )
            suffix = night;
        
        return icon + suffix;            
    }
    
    async updateCurrent()
    {
        if ( config.coordinates == "" )
            return;
        
        let getRegexpMatch = function( src, regex, error, defvalue )
            {
                let match = src.match( regex );
        
                if ( !match )
                {
                    logRemoteError( "getRegexpMatch: failed to get " + error + " in " + src );
                    return defvalue;
                }
        
                return match[1];
            }
    
        // Current icon and text conditions
        let coords = config.coordinates.split( ',' );

        try
        {
            let htmldata = await this._retrieve( `https://forecast.weather.gov/MapClick.php?lat=${ coords[0] }&lon=${ coords[1] }`, "html" );
            
            let result = { 
                ts : new Date(),
                summary : getRegexpMatch( htmldata, /<p class="myforecast-current">(.*?)<\/p>/, "summary", "error" ),
                temperature : getRegexpMatch( htmldata, /<p class="myforecast-current-lrg">(\d+)&deg;F<\/p>/, "temperature", "--" ),
                wind : getRegexpMatch( htmldata, /Wind Speed<\/b><\/td>\s*<td>(.*?)<\/td>/, "wind", "--" ),
                barometricPressure : getRegexpMatch( htmldata, /Barometer<\/b><\/td>\s*<td>(.*?) in/, "pressure", "--" ),
                relativeHumidity : getRegexpMatch( htmldata, /Humidity<\/b><\/td>\s+<td>(\d+)%<\/td>/, "humidity", "--" ),
                updateTime : getRegexpMatch( htmldata, /Last update<\/b><\/td>\s*<td>\s*(.*?)\s*<\/td>/, "uptime", "--" )
            };
            
            // Do we have an icon?
            let iconmatch = htmldata.match( /<div id="current_conditions-summary" class="pull-left" >\s+<img src="newimages\/large\/(.*?)\.png"/ );
            
            if ( iconmatch )
                result.icon = iconmatch[1];
            else
                result.icon = "skc";
        
            // Parse wind speed and direction
            let match = result.wind.match( /^(\w+)\s+(\d+)\s*MPH/ );
            if ( match )
            {
                result.windDirection = match[1];
                result.windSpeed = match[2];
            }
            else
            {
                result.windDirection = "-";
                result.windSpeed = 0;
            }
            
            // Trim result.icon
            if ( result.icon.length == 4 )
                result.icon = result.icon.substr( 1 );
            
            // Map the icon to get the FA icon and background image
            if ( this.iconMapping[ result.icon ] === undefined )
            {
                logRemoteError( "updateCurrent: cannot find icon match for " + result.icon );
                result.faicon = "fa-";
                result.background = "clear-";
                result.israin = false;
            }
            else
            {
                result.faicon = this.iconMapping[ result.icon ].fa;
                result.background = this.iconMapping[ result.icon ].bg;
                
                if ( this.iconMapping[ result.icon ].rain !== undefined )
                    result.israin = this.iconMapping[ result.icon ].rain;
                else
                    result.israin = false;
            }

            // Adjust the icon for day/night
            let suntimes = SunCalc.getTimes( new Date(), coords[0], coords[1] );
            
            result.faicon = "fas " + this.adjustForDaynight( result.faicon, suntimes, "sun", "moon" );
            result.background = this.adjustForDaynight( result.background, suntimes, "day", "night" );

            this.current = result;
            this.lastUpdateCurrent = new Date();
            
            if ( await this.updateLocalConditions() )
                this.textStatus = "Current + local conditions data: " + result.updateTime;
            else
                this.textStatus = "Current conditions data: " + result.updateTime;
            
            window.localStorage.setItem( "storedcurrent", JSON.stringify( this.current ) );
            console.log( "Current forecast updated " + result.updateTime );
        }
        catch ( err )
        {
            console.log( "Failed to parse " + err + " while parsing current forecast" );
            this.textStatus = "Current conditions error: " + err;
            this.current = {};
        }
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
            catch ( ex ) { console.log( "failed to parse json: %j", ex ); }
        }
        
        return null;
    }
  
    async updateLocalConditions()
    {
        if ( config.forecastLocalConditionsURL == "" )
            return;
        
        try
        {
            let jsondata = await this._retrieve( config.forecastLocalConditionsURL + "?_=" + new Date().getTime() );
            
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
