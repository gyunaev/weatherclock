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
            
        // Icon conversion to fontAwesome
        // If the icon name ends with - it means 'sun' or 'moon' will be appended (for day or night)
        this.fontAwesomeIconMapping = {
                "skc": "fa-",
                "few": "fa-",
                "sct": "fa-cloud-",
                "bkn": "fa-cloud-",
                "ovc": "fa-cloud",
                "wind_skc": "fa-wind",
                "wind_few": "fa-wind",
                "wind_sct": "fa-wind",
                "wind_bkn": "fa-wind",
                "wind_ovc": "fa-wind",
                "snow": "fa-snowflake",
                "rain_snow": "fa-cloud-showers-heavy",
                "rain_sleet": "fa-cloud-showers-heavy",
                "snow_sleet": "fa-snowflake",
                "fzra": "fa-cloud-showers-heavy",
                "rain_fzra": "fa-snowflake",
                "snow_fzra": "fa-snowflake",
                "sleet": "fa-snowflake",
                "rain": "fa-cloud-showers-heavy",
                "rain_showers": "fa-cloud-showers-heavy",
                "rain_showers_hi": "fa-cloud-showers-heavy",
                "tsra": "fa-cloud-showers-heavy",
                "tsra_sct": "fa-cloud-showers-heavy",
                "tsra_hi": "fa-cloud-showers-heavy",
                "tornado": "fa-wind",
                "hurricane": "fa-wind",
                "tropical_storm": "fa-water",
                "dust": "fa-",
                "smoke": "fa-",
                "haze": "fa-",
                "hot": "fa-",
                "cold": "fa-",
                "blizzard": "fa-snowflake",
                "fog": "fa-water"
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
    }

    // Main update callback taking care of everything
    async _timerCallback()
    {
        // Is it time to update the grids?
        let now = new Date();
        
        if ( config.forecastNextRecheckTime == null || config.forecastNextRecheckTime < now )
            await this.resolveStations();
        
        // Time to update next forecast?
        if ( this.nextForecastUpdate <= now )
            await this.updateForecast();
        
        // Do we need AQI update?
        if ( this.nextAqiUpdate <= now )
            await this.updateAQI();
        
        // We always update current forecast in this callback
        await this.updateCurrent();
        
        // And notift the client without waiting
        this.update_callback( null );

        // and here we go again
        setTimeout( this._timerCallback.bind( this ), 60000 );
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
                beforeSend: function(request) {
                    request.setRequestHeader( "User-Agent", "ba60466c-384e-4714-8626-4af5eb19fb8b" );
                },
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
    
    convertFAicon( icon )
    {
        // Create FA icon
        if ( icon )
        {
            let iconmatch = icon.match( /\/icons\/.*?\/(.*?)\/(.*?)\?/ );

            if ( iconmatch && this.fontAwesomeIconMapping[ iconmatch[2] ] !== undefined )
            {
                let faicon = this.fontAwesomeIconMapping[ iconmatch[2] ];
                
                if ( faicon.endsWith( '-' ) )
                    faicon += iconmatch[1] == "night" ? 'moon' : 'sun';
                
                return "fas " + faicon;
            }
        }
        
        return null;
    }

    async updateForecast()
    {
        if ( config.forecastUrlHourly == null && ! await this.resolveStations() )
            return;
        
        console.log( "Updating the weather forecast" );

        let hourlydata = await this._retrieve( config.forecastUrlHourly );
        
        if ( hourlydata.properties === undefined || hourlydata.properties.periods === undefined )
        {
            console.log( "error: incorrect data returned by /forecast/ API" );
            this.textStatus = "Forecast update failed";
            return;
        }            
        
        // Will have the forecast combined by days, together with extra info
        let hourly = [];
        let daily = [];
        let currentday = new Date().getDay();
        
        for ( let h of hourlydata.properties.periods )
        {
            let ts = new Date( h.startTime );

            // Did the day change? Init the structure
            if ( ts.getDay() != currentday )
            {
                daily.push( { startTime : ts, descs : [], faicons : [], temperatureHigh : -1, temperatureLow : 9999, rainhours : 0, windSpeedLow : 9999, windSpeedHigh: 0, hourlyIndex : hourly.length } );
                currentday = ts.getUTCDay();
            }
            
            // Wind is reported with 'mph' suffix and we only need the number
            let m = h.windSpeed.match( /^(\d+)\s*mph/ );

            if ( m != null )
                h.windSpeed = m[1];
            
            let faicon = this.convertFAicon( h.icon );
            
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
                    shortForecast: h.shortForecast,
                    faicon : faicon
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
                if ( ts.getHours() > 6 && ts.getHours() < 21 )
                {
                    daily[ index ].descs.push( h.shortForecast );
                    daily[ index ].faicons.push( faicon );
                }
                
                if ( faicon == "fa-water" )
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
            
            h.faicon = h.faicons.sort( (a,b) => h.faicons.filter(v => v===a).length - h.faicons.filter(v => v===b).length ).pop();
            delete h.faicons;
            
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
            
        let aquidata = await this._retrieve( config.forecastUrlAirQuality );
        
        if ( aquidata.data === undefined || aquidata.data.aqi === undefined )
        {
            this.textStatus = "AQI update failed";
            this.airquality = "N/A";
        }
        else
            this.airquality = aquidata.data.aqi;
        
        this.nextAqiUpdate = moment().add( 5, 'minutes' ).toDate();        
    }    
    
    async updateCurrent()
    {
        if ( config.coordinates == "" )
            return;
        
        let getRegexpMatch = function( src, regex, error )
            {
                let match = src.match( regex );
        
                if ( !match )
                    throw( error );
        
                return match[1];
            }
    
        // Current icon and text conditions
        try
        {
            let coords = config.coordinates.split( ',' );
            let htmldata = await this._retrieve( `https://forecast.weather.gov/MapClick.php?lat=${ coords[0] }&lon=${ coords[1] }`, "html" );
            
            let result = { 
                ts : new Date(),
                icon : getRegexpMatch( htmldata, /<div id="current_conditions-summary" class="pull-left" >\s+<img src="newimages\/large\/(.*?)\.png"/, "icon" ),
                summary : getRegexpMatch( htmldata, /<p class="myforecast-current">(.*?)<\/p>/, "summary" ),
                temperature : getRegexpMatch( htmldata, /<p class="myforecast-current-lrg">(\d+)&deg;F<\/p>/, "temperature" ),
                wind : getRegexpMatch( htmldata, /Wind Speed<\/b><\/td>\s*<td>(.*?)<\/td>/, "wind" ),
                barometricPressure : getRegexpMatch( htmldata, /Barometer<\/b><\/td>\s*<td>(.*?) in/, "pressure" ),
                relativeHumidity : getRegexpMatch( htmldata, /Humidity<\/b><\/td>\s+<td>(\d+)%<\/td>/, "humidity" ),
                updateTime : getRegexpMatch( htmldata, /Last update<\/b><\/td>\s*<td>\s*(.*?)\s*<\/td>/, "uptime" )
            };
        
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
            
            // Trim result.icon to match fa-
            let testicon = result.icon;
            
            if ( testicon.length == 4 )
                testicon = testicon.substr( 1 );
        
            if ( this.fontAwesomeIconMapping[ testicon ] === undefined )
            {
                console.log( "Error converting icon " + result.icon );
                result.faicon = "fas fa-sun";
            }
            else
            {
                result.faicon = "fas " + this.fontAwesomeIconMapping[ testicon ];
                
                if ( result.faicon.endsWith( '-' ) )
                    result.faicon += result.icon[0] == 'n' ? 'moon' : 'sun';
            }                

            this.current = result;
            this.lastUpdateCurrent = new Date();
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
    
};
