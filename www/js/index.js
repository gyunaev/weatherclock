/*jslint esversion: 6, node : true */
"use strict";

//
// Global application configuration
//
var config = 
{
    // Local time zone where this device is running
    localTimezone : "America/Los_Angeles",

    // Extra timezones to show times on screen (up to 4)
    timezones: [],

    // Units to use: I[mprerial] or M[etric]
    units : "I",

    // Locale to use for times/days/months
    timeLocale : "en",

    // Georgraphical coordinates of the location for weather forecast
    coordinates : "",
        
    // How to space the hourly forecast (2/3/4 hours step)
    forecastHourStep : 2,

    // start URL (to use with Back button)
    startURL : null,

    // When device is kept for more than keepTime ms, drop brighness to idleLevel
    brightnessKeepTime : 10000,
    brightnessIdleLevel : 0.1,

    tempColors : {
        
        cold : {
            
            tempLow : 33,
            colorLow: [ 0, 195, 255 ],
            
            tempHigh : 63,
            colorHigh: [ 230, 249, 255 ],
            
        },
        
        hot: {
            
            tempLow : 78,
            colorLow: [ 255, 230, 230 ],

            tempHigh : 100,
            colorHigh: [ 255, 0, 0 ],
        },
        
        normalColor : [ 224, 224, 224 ],

    },
    
    //
    // For weather forecast
    //

    // Stores the URL to update the hourly forecast from
    forecastUrlHourly : null,
        
    // Unix time when the above URLs need to be rechecked again, or "never" to stick to the above URLs.
    // see forecast.js for more details
    forecastNextRecheckTime : null,
        
    // URL + token to download the air quality forecast from. If null, AQ forecast is not downloaded
    forecastUrlAirQuality : null,
        
    // URL to download the updated APKs from (when Update button is pressed in settings). If null, APK update is not supported
    appUpdaterApkURL : null,

    // UI modifications, if any, stored as JS code which runs on start. Can be used to customize the clock.
    // It is eval()ed, so beware. Could be either a string or array (in which case its joined \n)
    uiModificationsJS : null,
    
    // Last entered remote config URL. It is NOT downloaded on every start, and only stored here to prefill the dialog
    lastRemoteConfigUrl : "",
    
    // Error handler URL for remote logging. If empty, remote logging is disabled
    remoteLoggingURL : ""
};



// Timeout handlers for auto-close dialog and brighness
var timeoutTimerHandle = null, brighnessTimeoutHandle = null;

// Forecast provider
var forecastProvider = null;

// Last seen temperature (to track changes)
var lastTemperature = null;

// Error stack with messages received. The new messages come on top.
// Each message is an object with type and msg properties.
// Errors of the same type replace each other, meaning they don't accumulate.
var errorMessages = [];

// An original statusbar message (shown when no errors)
var originalStatusMessage = "";


function applySettings( data )
{
    if ( typeof data !== 'undefined' && data != null )
    {
        try
        {
            let newconfig = JSON.parse( data );
            
            // Merge the loaded data with the config
            for ( let r in newconfig )
                config[ r ] = newconfig [ r ];
        }
        catch ( ignored )
        { 
            console.log( "failed to parse config");
        }
    }
    
    if ( config.uiModificationsJS != null )
    {
        let code = config.uiModificationsJS;
        
        if ( Array.isArray( code ) )
            code = code.join( "\n" );
        
        console.log( "Runnign the custom JS code:\n", code ); 
        eval( code );
    }

    // Save the config as we have may modified it
    saveSetting( "config", config );
}

function saveSetting( name, object )
{
    try
    {
        window.localStorage.setItem( name, JSON.stringify( object ) );
    }
    catch ( err )
    {
        showError( "ls", "Failed to save new settings: local storage not available" );
    }
}

function showDetailedDialog( blockid )
{
    let m = blockid.match( /weather-daily-([0-9])/ );
    
    if ( !m )
        return;
    
    let id = 1 + m[1];
    let fdata = forecastProvider.status().combined.daily[ Number( m[1] ) ];
    
    let wtime = moment( fdata.startTime );
    $(".daily-modal-date").text( wtime.format( "ddd MMM DD", config.timeLocale ) );
    $(".daily-modal-details").html( '<i class="' + fdata.faicon + '"></i> ' 
                    + convertUnit( fdata.temperatureLow, "temperature" ) + ' (' + convertUnit( fdata.temperatureLow, "temperature", 'G' ) + ")"
                    + " / "
                    + convertUnit( fdata.temperatureHigh, "temperature" ) + ' (' + convertUnit( fdata.temperatureHigh, "temperature", 'G' ) + ")"
                    + "</span>" );
    
    let outsummary = fdata.summary + ", wind " + fdata.windSpeedLow + "-"  + fdata.windSpeedHigh + " mph";
    
    if ( fdata.rainhours > 0 )
        outsummary += ", rain: " + fdata.rainhours + " hours";

    $(".daily-modal-summary").html( outsummary );
    $("#daily-modal-sunrise").text( moment( fdata.suntimes.sunrise ).tz( config.localTimezone ).format( 'LT', config.timeLocale ) );
    $("#daily-modal-sunset").text( moment( fdata.suntimes.sunset ).tz( config.localTimezone ).format( 'LT', config.timeLocale ) );

    // Hourly details
    let hourlydata = forecastProvider.status().combined.hourly;
    let today_sunset = moment( fdata.suntimes.sunset ).tz( config.localTimezone ).hour();
    let today_sunrise = moment( fdata.suntimes.sunrise ).tz( config.localTimezone ).hour();
        
    for ( let i = 0; i < 6; i++ )
    {
        // We start from 6am and covering until midnight (every 3 hours
        let hdata = forecastProvider.status().combined.hourly[ i * 3 + 6 + fdata.hourlyIndex ];
        let wtime = moment.utc( hdata.startTime ).tz( config.localTimezone );

        $("#daily-modal-cur-time-" + i ).html( wtime.format( "LT", config.timeLocale ) );
        $("#daily-modal-cur-sum-" + i ).text( hdata.shortForecast );
        $("#daily-modal-cur-details-" + i).html( '<i class="' + hdata.faicon + '"></i> ' 
                + convertUnit( hdata.temperature, "temperature" ) );
        
        let a = wtime.hour();
        if ( wtime.hour() > today_sunset || wtime.hour() < today_sunrise )
        {
            $("#daily-modal-hourly-" + i).removeClass( "weather-hourly-day" );
            $("#daily-modal-hourly-" + i).addClass( "weather-hourly-night" );
        }
        else
        {
            $("#daily-modal-hourly-" + i).removeClass( "weather-hourly-night" );
            $("#daily-modal-hourly-" + i).addClass( "weather-hourly-day" );
        }
    }

    $("#daily-details-dialog").show();
    
    // Auto-close the dialog in 60 seconds
    setTimeout( function() { timeoutTimerHandle = null; $("#daily-details-dialog").hide(); }, 60000 );
}


function appendIfNextDay( mom )
{
    if ( mom.dayOfYear() < moment().dayOfYear() )
        return "<span class='font-superscript'>-1</span>";

    if ( mom.dayOfYear() > moment().dayOfYear() )
        return "<span class='font-superscript'>+1</span>";
    
    return "";
}

function convertUnit( value, unit, useunits )
{
    if ( useunits === undefined )
        useunits = config.units;
    
    if ( unit == 'temperature' )
    {
        if ( useunits == "I" )
            return Math.round( value ) + "&#8457";
        else
            return Math.round( (value - 32) / 1.8 ) + "&#8451";
    }
    
    if ( unit == 'pressure' )
    {
        //FIXME
        return value + "<span class='smallerfont'>inHg</span>";
    }    

    if ( unit == 'speed' )
    {
        if ( useunits == "I" )
            return Math.round( value ) + "<span class='smallerfont'>mph</span>";
        else
            return Math.round( value * 1.609344) + "<span class='smallerfont'>kmh</span>";
    }
    
    return "ERROR";
}

function calculateTempColor( temp )
{
    let colors = config.tempColors;
    
    // First those cases where we don't need to approximate anything
    if ( temp <= colors.cold.tempLow )
        return colors.cold.colorLow;
    else if ( temp >= colors.cold.tempHigh && temp <= colors.hot.tempLow )
        return colors.normalColor;
    else if ( temp >= colors.hot.tempHigh )
        return colors.hot.colorHigh;
    
    let approx;
    
    if ( temp >= colors.hot.tempLow )
        approx = colors.hot;
    else
        approx = colors.cold;
    
    // Now approximate the colors.
    let resultColor = [];
    
    // First calculate the fraction in change from low to high
    let fraction = (temp - approx.tempLow) / (approx.tempHigh - approx.tempLow);
    
    // Now iterate over colors and adjust them
    for ( let c = 0; c < 3; c++ )
    {
        let f1 = approx.colorLow[ c ];
        let f2 = approx.colorHigh[ c ];
        
        
        if ( f1 > f2 )
            resultColor.push( f1 + Math.floor( ( f2 - f1 ) * fraction ) );
        else
            resultColor.push( f2 + Math.floor( ( f1 - f2 ) * (1.0 - fraction ) ) );
    }
    
    return resultColor;
}


function updateUI( redrawForecast )
{
    // If settings UI is visible, do not update the UI
    if ( $("#settingswindow").is(":visible") )
        return;
    
    // If splash screen is visible, hide it and show main window
    if ( $("#splashscreen").is(":visible" ) )
    {
        $("#splashscreen").hide();
        $("#mainwindow").show();
    }
    
    // Update local time and date
    let now = moment.tz( config.localTimezone );
    $("#nowtime").text( now.format( 'LTS', config.timeLocale ) );
    $("#nowdate").text( now.format( 'dddd LL', config.timeLocale ) );

    // Update time for all timezones
    for ( let i = 0; i < 4; i++ )
    {
        // If the timezone is present, use it 
        if ( typeof config.timezones[i] !== 'undefined' && config.timezones[i] )
        {
            let tztime = now.tz( config.timezones[i] );
            let tzstring = config.timezones[i].replace( /.*\//, '' ).replace( /_/g, ' ' ) + ": " + tztime.format('LT', config.timeLocale ) + appendIfNextDay( tztime );
                
            $("#timezone_" + i ).html( tzstring );
        }
        else
            $("#timezone_" + i ).text("");
    }
    
    // Do we need to redraw weather forecast?  
    if ( redrawForecast && forecastProvider.status().current )
    {
        let forecast = forecastProvider.status();
    
        // Do we need to replace background?
        let bgclass = "body-bg-" + forecast.current.background;
        
        // Current details
        if ( !$("body").hasClass( bgclass ) )
        {
            $("body").removeClass();
            $("body").addClass( "fadein" );
            $("body").addClass( bgclass );
        }
        
        let outtemp = "";
        let temperature = forecast.current.temperature;

        if ( forecast.airquality !== null )
            outtemp += forecast.airquality + "<span class='smallfont'>ppm2</span> ";
        
        outtemp += '<i class="' + forecast.current.faicon + '"></i> ' + convertUnit( temperature, "temperature", 'I' )
            + '<span class="smallerfont"> (' + convertUnit( temperature, "temperature", 'G' ) + ")</span>";
        
        // Last temperature trend
        if ( lastTemperature !== null )
        {
            if ( lastTemperature < temperature )
                outtemp += '<i style="transform: rotate(45deg);" class="fas fa-arrow-up"></i>';
            if ( lastTemperature > temperature )
                outtemp += '<i style="transform: rotate(135deg);" class="fas fa-arrow-up"></i>';
        }
        
        lastTemperature = temperature;
            
        $("#nowtemp").html( outtemp );
        
        // Create description string
        $("#nowweather").html( forecast.current.summary
            + ", " + Math.round( forecast.current.relativeHumidity ) + "%RH, "
            + convertUnit( forecast.current.barometricPressure, "pressure" ) + ", "
            + convertUnit( forecast.current.windSpeed, 'speed' ) );

        // Hourly details
        let hourstep = Math.min( config.forecastHourStep, Math.floor( (forecast.combined.hourly.length - 1) ) );
        let today_sunset = moment( forecast.combined.suntimes.sunset ).tz( config.localTimezone ).hour();
        let today_sunrise = moment( forecast.combined.suntimes.sunrise ).tz( config.localTimezone ).hour();
        
        for ( let i = 0; i < 6; i++ )
        {
            let fdata = forecast.combined.hourly[ i * hourstep ];
            let wtime = moment.utc( fdata.startTime ).tz( config.localTimezone );

            $("#weather-cur-time-" + i ).html( wtime.format( "LT", config.timeLocale ) + appendIfNextDay( wtime ) );
            $("#weather-cur-sum-" + i ).text( fdata.shortForecast );
            $("#weather-cur-details-" + i).html( '<i class="' + fdata.faicon + '"></i> ' 
                    + convertUnit( fdata.temperature, "temperature" ) );
            
            let a = wtime.hour();
            if ( wtime.hour() > today_sunset || wtime.hour() < today_sunrise )
            {
                $("#weather-hourly-" + i).removeClass( "weather-hourly-day" );
                $("#weather-hourly-" + i).addClass( "weather-hourly-night" );
            }
            else
            {
                $("#weather-hourly-" + i).removeClass( "weather-hourly-night" );
                $("#weather-hourly-" + i).addClass( "weather-hourly-day" );
            }
        }
        
        // Future forecast
        for ( let i = 0; i < Math.min( forecast.combined.daily.length, 6 ); i++ )
        {
            let fdata = forecast.combined.daily[ i ];

            let wtime = moment( fdata.startTime );
            $("#weather-next-date-" + i ).text( wtime.format( "ddd MMM DD", config.timeLocale ) );
            $("#weather-next-sum-" + i ).text( fdata.summary );
            $("#weather-next-details-" + i).html( '<i class="' + fdata.faicon + '"></i> ' 
                    + convertUnit( fdata.temperatureLow, "temperature" ) 
                    + " / "
                    + convertUnit( fdata.temperatureHigh, "temperature" ) );

            $("#weather-next-sunrise-" + i).text( moment( fdata.suntimes.sunrise ).tz( config.localTimezone ).format( 'LT', config.timeLocale ) );
            $("#weather-next-sunset-" + i).text( moment( fdata.suntimes.sunset ).tz( config.localTimezone ).format( 'LT', config.timeLocale ) );

            let dailycolor = calculateTempColor( fdata.temperatureHigh );
            
            $("#weather-daily-" + i).css('background-color', `rgb( ${dailycolor[0]}, ${dailycolor[1]}, ${dailycolor[2]} )` );
        }

        // Make the blocks visible
        $("#weather-block-daily").show();
        $("#weather-block-hourly").show();
    }
    else
        
    
    // Set the new status bar message
    originalStatusMessage = forecastProvider.status().status;
    updateStatusBar();

    if ( $("#mainwindow").hasClass("d-none") )
        $("#mainwindow").removeClass("d-none");
}

// This clears errors of a specific type
function clearError( type )
{
    for ( let i in errorMessages )
    {
        if ( errorMessages[i].type == type )
        {
            errorMessages.splice( i, 1 );
            break;
        }
    }
}

// Show an error message 
function updateStatusBar()
{
    if ( errorMessages.length > 0 )
    {
        if ( !$("#statusmessage").hasClass("statusmessage-error") )
            $("#statusmessage").addClass("statusmessage-error").removeClass( "statusmessage-normal" );
    
        $("#statusmessage").html( "" + errorMessages[0].msg + "  &times;");
    }
    else
    {
        if ( $("#statusmessage").hasClass("statusmessage-error") )
            $("#statusmessage").removeClass("statusmessage-error").addClass( "statusmessage-normal" );
        
        $("#statusmessage").html( originalStatusMessage );
    }        
}

function showError( type, msg )
{
    // If error of this type exist, we remove it to make sure it goes on top
    clearError( type );
    
    errorMessages.unshift( { type : type, msg : msg } );
    updateStatusBar();
}

function restoreMain()
{
    $("#settingswindow").hide();
    $("#mainwindow").fadeIn();

    updateUI( true );
}

function setupSettings()
{
    // Create timezone select items and put them into all selectors
    let tzoptions = "<option value=''>Select timezone</option>";

    for ( let r of moment.tz.names() )
        tzoptions += "<option value='" + r + "'>" + r + "</option>";

    $(".settings-tz-select").html( tzoptions );

    // Fill up available locales for moment.js
    $('#settings-locale').empty();

    $.each( moment.locales(), function(val, text) {
        $('#settings-locale').append( $('<option></option>').val(text).html(text) )
    });
    
    // Make them combos
    $(".settings-tz-select").selectize();
    
    // Handle CANCEL button
    $("#settings-cancel").click( function() {
        restoreMain();
    });
    
    // Handle APPLY button
    $("#settings-apply").click( function() {

        // Collect the new config values
        config.localTimezone = $("#settings-tzunit").val();
        config.units = $("#settings-units").val();
        config.timeLocale = $("#settings-locale").val();
        config.coordinates = $("#settings-coordinates").val();

        config.timezones = []; 
        
        for ( let l = 0; l < 4; l++ )
            config.timezones.push( $("#settings-tzunit" + l ).val() );

        saveSetting( "config", config );
        restoreMain();
        forecastProvider.triggerUpdate();
    });
    
    // Handle UPDATE button
    $("#settings-update").click( function() {
        appupdater.checkForUpdates();
    });
}

function showSettings()
{
    if ( typeof config.forecastUpdateURL == 'undefined' && typeof forecastUpdateURL != 'undefined' )
        config.forecastUpdateURL = forecastUpdateURL;
            
    // Set the current configuration values
    $("#settings-tzunit").selectize()[0].selectize.addItem( config.localTimezone );
    $("#settings-units").val( config.units );
    $("#settings-locale").val( config.timeLocale );
    $("#settings-coordinates").val( config.coordinates );

    for ( let l = 0; l < config.timezones.length; l++ )
        $("#settings-tzunit" + l ).selectize()[0].selectize.addItem( config.timezones[l] );

    $("#settingsmessage").text( "Version " + applicationVersion 
                                + ", built: " + moment.unix( applicationBuiltEpoch ).format( 'LLLL')
                                + ", " + forecastProvider.debugStatus()  );    
    
    $("body").removeClass();
    $("#mainwindow").hide();
    $("#settingswindow").fadeIn();
}


function restoreBrightness()
{
    // Restart the inactivity timer if its already started
    if ( brighnessTimeoutHandle != null )
        clearTimeout( brighnessTimeoutHandle );
    
    brighnessTimeoutHandle = setTimeout( function() {
        cordova.plugins.brightness.setBrightness( config.brightnessIdleLevel, function(){}, function(){} );
        }, config.brightnessKeepTime );
    
    cordova.plugins.brightness.setBrightness( 1, function(){}, function(){} );
    
    // Activate the immersive mode again
    AndroidFullScreen.immersiveMode( function(){}, function(){} );    
}

function setup()
{   
    // Acquire power management lock
    if ( typeof window.powermanagement != 'undefined' )
        window.powermanagement.acquire();
    
    // Load the configuration
    applySettings( window.localStorage.getItem( "config" ) );

    // Setup settings UI part
    setupSettings();

    // Update the main UI every 500ms
    setInterval( updateUI, 500 );

    // Show settings page on click on settings button
    $("#button_settings").click( function() {
            showSettings();
    });

    // Back button
    document.addEventListener( "backbutton", function() { window.location = config.startURL; }, true );
    
    // Hide the red background on click on error message
    $("#statusmessage").click( function() {
        
        if ( errorMessages.length > 0 )
        {
            // Click on error message removes the first message in the queue
            errorMessages.shift();
            updateStatusBar();
        }
        else
        {
            console.log( "Forecast update: manual request" );
            forecastProvider.triggerUpdate();
        }            
    });
    
    // Handle click on weather daily forecast
    $(".weather-daily").click( function( event ) {
        
        showDetailedDialog( $(this).closest( ".weather-daily" ).attr('id') );
        
    });

    // Handle click on weather hourly forecast
    $(".weather-hourly").click( function() {
        
        config.forecastHourStep++;
        
        if ( config.forecastHourStep > 4 )
            config.forecastHourStep = 1;

        saveSetting();
        updateUI( true );
    });
    
    //
    // This allows you to create an external configuration file, and apply it to all clocks
    // at your home by holding the settings button for 2+ seconds
    //   
    $("#settings-remoteconfig").click(function(e) {

        let url = prompt ("Enter the policy URL", config.lastRemoteConfigUrl );

            if ( url != null )
            {
                $.ajax({
                    method: "GET",
                    url: url,
                    dataType: "text"
                })
                .done( function( newconfig ) {
                    
                    console.log("Downloaded config:", newconfig );
                    config.lastRemoteConfigUrl = url;
                    
                    // Apply to config
                    applySettings( newconfig );
                    
                    // And fully reload
                    window.location.reload();
                } ) 
                .fail( function( err ) {
                    
                    alert("Failed to download or apply configuration", err );
                } )                    
            }
    });
    
    // Closing the modal dialog when clicked outside or close button
    $(".daily-modal").click( function(event){
        
        if ( event.target == $(".daily-modal")[0] || event.target == $(".daily-modal-close")[0] )
            $("#daily-details-dialog").hide();
        
        clearTimeout( timeoutTimerHandle );
        timeoutTimerHandle = null;
    });

    // Setup the forecast updater
    forecastProvider = new ForecastProvider();
    
    forecastProvider.intialize( function updated( error, forecast ) {
        
            if ( error != null )
            {
                showError ( "wfc", error );
            }
            else
            {
                clearError( "wfc ");
                updateUI( true );
            }
        });
    
    // Extra functionality based on Cordova
    if ( typeof cordova != 'undefined' )
    {
        // Start at boot
        cordova.plugins.autoStart.enable();
        
        // Make sure we keep the screen on
        cordova.plugins.brightness.setKeepScreenOn(true);  
        
        // Restore the brightness
        restoreBrightness();
        
        // Activate fullscreen
        AndroidFullScreen.immersiveMode( function(){}, function(){} );
    
        // Any click on body restores the brightness back
        $("body").click( restoreBrightness );
    }
    
    // If we don't have coordinates, pop the settings
    if ( config.coordinates == "" )
        setTimeout( showSettings, 0 );
}

// Remote error logging
function logRemoteError(message, url = "", lineNumber = "")
{
    if ( config.remoteLoggingURL.length )
    {
        // Use XMLHttpRequest in case jquery failed
        var req = new XMLHttpRequest();
        
        req.open('POST', config.remoteLoggingURL, true);
        req.setRequestHeader( 'Content-type', 'application/json' );
        req.onload = function () {

            console.log(this.responseText);
        };

        req.send( JSON.stringify( { d : new Date(), m : message, u : url, n : lineNumber } ) );
    }

    console.log( message );
}


//
// This one is fired both via localhost and via Cordova,
// but for Cordova we have to wait for deviceready.
// Thus we check whether it is Cordova by using the URL,
// and wait for the proper function.
$(document).ready(function() {

    config.startURL = window.location.href;
    
    // Set up remote logging
    window.onerror = logRemoteError;
    
    if ( document.URL.indexOf("http://") === 0 || document.URL.indexOf("https://") === 0 )
        setup(); // This is browser
    else
    {
        // This is Cordova. Show the version and build date
        $(".startup-message").text( "Version " + applicationVersion + ", built: " + moment.unix( applicationBuiltEpoch ).format( 'LLLL') );
        
        // And wait until everything is loaded
        document.addEventListener("deviceready", setup, false);
    }
});
