//
// Requests forecast from either forecast.io or from other local stations 
// which announce (via dns-sd) that they have it

var forecastprovider = {
 
    // Private data storage
    d : { 
            httpport : 8000,
            source : null,
            status : "Weather never updated",
            forecast : null,
            airquality : null,
            update_callback : null,
            zeroconf_service_name : null,
            zeroconf_service_proto : '_weather._tcp.',
            zeroconf_service_domain : 'local.',
            debug : { "cordova" : "no", "dnssd" : "disabled", "lastannounce" : "never" }
        },
    
    // Initializes the forecast provider.
    // It also retrieves the latest stored forecast, if it has it,
    // and lets the app know about it.
    intialize : function( updatecallback ) {
        
        // Store the update callback
        forecastprovider.d.update_callback = updatecallback;
        
        // Load the stored forecast
        let wdata = window.localStorage.getItem( "storedforecast" );

        if ( typeof wdata !== 'undefined' && wdata != null )
        {
            try
            {
                forecastprovider.d.forecast = JSON.parse( wdata );
                
                if ( typeof(forecastprovider.d.forecast) != 'object' )
                    forecastprovider.d.forecast = null;
            }
            catch ( ex ) { console.log( "failed to parse forecast: %j", ex ); }
            
            if ( forecastprovider.d.forecast != null )
            {
                forecastprovider.d.source = "settings";
                forecastprovider.d.status = "Weather restored from settings, updated";
                forecastprovider.d.update_callback( null, forecastprovider.d.forecast );
            }
        }
        
        // Initialize the DNS-SD plugin on Cordova
        if ( typeof cordova !== 'undefined' )
        {
            forecastprovider.d.debug[ "cordova" ] = "yes";
                   
            // Launch weather announcement if we have the data and not yet announced it
            if ( forecastprovider.d.forecast != null )
                forecastprovider.announceForecast();
        
            // Listen to other annoucements
            cordova.plugins.zeroconf.watch('_tcp.', 'local.', function(result) {
                    let action = result.action;
                    let service = result.service;
    
                    console.log('service %s %j', action, service);
                    forecastprovider.d.debug[ "lastannounce" ] = action + " " + service;
            }); 
            
            //cordova.plugins.zeroconf.reInit();
        }
        
        // Schedule Internet update each 1 minute
        setInterval( forecastprovider.updateFromInternet, 60000 );
    },

    announceForecast : function()
    {
        // Only works with Cordova
        if ( typeof cordova === 'undefined' )
            return;
        
        /*
        // We have to shut down the service first if it was announced
        if ( forecastprovider.d.zeroconf_service_name != null )
        {
            let name = forecastprovider.d.zeroconf_service_name;
            forecastprovider.d.zeroconf_service_name = null;
            
            console.log( "Zeroconf: unregistering service " + name );
            
            cordova.plugins.zeroconf.unregister( 
                forecastprovider.d.zeroconf_service_proto,
                forecastprovider.d.zeroconf_service_domain,
                name,
                function success() { 
                    
                    console.log( "Zeroconf: unregistered service successfully" );
                    forecastprovider.d.debug[ "dnssd" ] = "stopped";

                    // Wait one second and repeat the call
                    setTimeout( function() { forecastprovider.announceForecast() }, 1000 ); 
                },
                function failure() {
                    console.log( "Zeroconf: failed to unregister service" );
                    forecastprovider.announceForecast();
                } );
        }
        else
        {
            forecastprovider.d.zeroconf_service_name = config.deviceName;
            
            if ( forecastprovider.d.zeroconf_service_name = "" )
                forecastprovider.d.zeroconf_service_name = "unnamed";
            
            let wdata = {};
            
            if ( forecastprovider.d.forecast )
            {
                wdata.weather = forecastprovider.d.forecast.currently.time;
                wdata.source = forecastprovider.d.source;
            }
                
            console.log( "Zeroconf: registering service %s, status %j", name, wdata );

            cordova.plugins.zeroconf.register( 
                forecastprovider.d.zeroconf_service_proto,
                forecastprovider.d.zeroconf_service_domain,
                forecastprovider.d.zeroconf_service_name, 
                8000,
                wdata,
                function success(){ 
                    console.log('Zeroconf: device registered successfully' ); 
                    forecastprovider.d.debug[ "dnssd" ] = "working";
                },
                function failed() {
                    console.log( "Zeroconf: failed to announce weather service" ); 
                    forecastprovider.d.debug[ "dnssd" ] = "failed";
            });
        }
        */
    },
    
    current : function() {
        return forecastprovider.d.forecast;
    },
    
    forecastUpdated : function( forecast, airquality ) {
        
        if ( airquality )
            forecast.airquality = airquality.data;
        else
            forecast.airquality = null;
        
        forecastprovider.d.forecast = forecast;
        forecastprovider.d.source = "internet";
        forecastprovider.d.status = "Weather updated from DarkSky";
            
        // Store the forecast
        saveSetting( "storedforecast", forecastprovider.d.forecast );

        // Announce it
        forecastprovider.announceForecast();
            
        // And notify the provider
        forecastprovider.d.update_callback( null, forecastprovider.d.forecast );
    },
    
    updateFromInternet : function() {

        if ( config.forecastURL == "" )
            return;
        
        $.ajax({
            method: "GET",
            url: config.forecastURL,
            dataType: "json"
        })
        .done( function( forecast ) { 
          
            if ( config.airQualityURL != "" )
            {
                $.ajax({
                    method: "GET",
                    url: config.airQualityURL,
                    dataType: "json"
                })
                .done( function( s ) { 

                    forecastprovider.forecastUpdated( forecast, s );

                })
                .fail( function( s ) {
                    
                    forecastprovider.forecastUpdated( forecast, null );
                    
                });
            }        
        })
        .fail( function( s ) {
            
            forecastprovider.d.update_callback( "Weather forecast update failed" );
            
        });
    },
    
    convertIcon : function( icontext ) {

        switch ( icontext )
        {
            case "clear-day":
                return "fas fa-sun";

                case "clear-night":
                    return "fas fa-moon";

                case "cloudy":
                    return "fas fa-cloud";

                case "fog":
                    return "fas fa-water";

                case "hail":
                    return "fas fa-water";

                case "partly-cloudy-day":
                    return "fas fa-cloud-sun";

                case "partly-cloudy-night":
                    return "fas fa-cloud-moon";

                case "rain":
                case "thunderstorm":
                    return "fas fa-cloud-showers-heavy";
                    
                case "sleet":
                    return "fas fa-cloud-rain";

                case "snow":
                    return "far fa-snowflake";
            }
            
            return "fas fa-wind";
    },          

    currentStatus : function() {

        if ( forecastprovider.d.forecast == null )
            return forecastprovider.d.status;
        
        return forecastprovider.d.status + " " + moment.unix( forecastprovider.d.forecast.currently.time ).fromNow();
    },
    
    debugStatus : function() {

        let outstr = "";
        
        for ( let l in forecastprovider.d.debug )
        {
            if ( outstr != "" )
                outstr += ", ";
            
            outstr += l + ": " + forecastprovider.d.debug[l];
        }
        
        return outstr;
    }
};
