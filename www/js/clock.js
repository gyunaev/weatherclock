// track changing temp

// Configuration
var config = null;

// Various timeout handlers
var timeoutTimerHandle = null;

// Stored weather forecast
var storedForecast = null;

// Last seen temperature (to track changes)
var lastTemperature = null;

// Start URL (for back button)
var startURL = null;


//
// Brightness configuration
//

// Keep the screen bright for 30 seconds after the last activity. After this drop it to 50% brighness
let brightnessKeepTime = 10000;
let brightnessIdleLevel = 0.1;
let brighnessTimeoutHandle = null;

function loadSettings()
{
    // Initialize default configuration which we can override
    config = { 
        unitTimezone : "America/Los_Angeles",
        units : "I",
        timeLocale : "en",
        forecastURL : "",
        airQualityURL : "",
        timezones: []
    };

    // Load config
    let data = window.localStorage.getItem( "config" );
    
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
        showError( "Failed to save new settings: local storage not available" );
    }
}

function showDetailedDialog( blockid )
{
    let m = blockid.match( /weather-daily-([0-9])/ );
    
    if ( !m )
        return;
    
    let id = 1 + m[1];
    let fdata = storedForecast.daily.data[ 1 + Number( m[1] ) ];

    let wtime = moment.unix( fdata.time );
    $(".daily-modal-date").text( wtime.format( "ddd MMM DD", config.timeLocale ) );
    $(".daily-modal-details").html( '<i class="' + forecastprovider.convertIcon( fdata.icon ) + '"></i> ' 
                    + convertUnit( fdata.temperatureLow, "temperature" ) 
                        + " <span class='smallerfont'>at " + moment.unix( fdata.temperatureLowTime ).format("HH:MM") + "</span>"
                    + " / "
                    + convertUnit( fdata.temperatureHigh, "temperature" )
                        + " <span class='smallerfont'>at " + moment.unix( fdata.temperatureHighTime ).format("HH:MM") + "</span>" );
    
    let outsummary = fdata.summary + "<br>Humidity " + fdata.humidity + "%, Wind " + fdata.windSpeed + "mph";
                    
    if ( fdata.precipType !== undefined )
        outsummary += ", " + fdata.precipType + " chance: " + Math.floor( fdata.precipProbability ) + " %";

    $(".daily-modal-summary").html( outsummary );
    $("#daily-modal-sunrise").text( moment.unix( fdata.sunriseTime ).tz( config.unitTimezone ).format( 'LT', config.timeLocale ) );
    $("#daily-modal-sunset").text( moment.unix( fdata.sunsetTime ).tz( config.unitTimezone ).format( 'LT', config.timeLocale ) );
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
        if ( useunits == "I" )
            return (value * 0.03 ).toFixed( 2 ) + "<span class='smallerfont'>inHg</span>";
        else
            return Math.round( value ) + "<span class='smallerfont'>hPa</span>";
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

function updateUI( forecast )
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
    let now = moment.tz( config.unitTimezone );
    $("#nowtime").text( now.format( 'LTS', config.timeLocale ) );
    $("#nowdate").text( now.format( 'dddd LL', config.timeLocale ) );

    // Update time for all timezones
    for ( let i = 0; i < 4; i++ )
    {
        // If the timezone is present, use it 
        if ( typeof config.timezones[i] !== 'undefined' && config.timezones[i] )
        {
            let tztime = now.tz( config.timezones[i] );
            let tzstring = config.timezones[i].replace( /.*\//, '' ).replace( /_/, ' ' ) + ": " + tztime.format('LT', config.timeLocale ) + appendIfNextDay( tztime );
                
            $("#timezone_" + i ).html( tzstring );
        }
        else
            $("#timezone_" + i ).text("");
    }
    
    // Do we need to redraw weather forecast?  
    if ( typeof forecast != 'undefined' && forecast != null )
    {
        storedForecast = forecast;
        
        // Do we need to replace background?
        let bgclass = "body-bg-" + forecast.currently.icon;
        
        // Current details
        if ( !$("body").hasClass( bgclass ) )
        {
            $("body").removeClass();
            $("body").addClass( bgclass );
        }
        
        let curicon = forecastprovider.convertIcon( forecast.currently.icon );
        let outtemp = "";

        if ( forecast.airquality !== undefined && typeof forecast.airquality.aqi === "number" )
            outtemp += forecast.airquality.aqi + "<span class='smallfont'>ppm2</span> ";
        
        outtemp += '<i class="' + curicon + '"></i> ' + convertUnit( forecast.currently.apparentTemperature, "temperature", 'I' )
            + '<span class="smallerfont"> (' + convertUnit( forecast.currently.apparentTemperature, "temperature", 'G' ) + ")</span>";
        
        // Last temperature trend
        if ( lastTemperature !== null )
        {
            if ( lastTemperature < forecast.currently.apparentTemperature )
                outtemp += '<i style="transform: rotate(45deg);" class="fas fa-arrow-up"></i>';
            if ( lastTemperature > forecast.currently.apparentTemperature )
                outtemp += '<i style="transform: rotate(135deg);" class="fas fa-arrow-up"></i>';
        }
        
        lastTemperature = forecast.currently.apparentTemperature;
            
        $("#nowtemp").html( outtemp );
        
        // Create description string
        $("#nowweather").html( forecast.currently.summary 
            + ", " + Math.round( forecast.currently.humidity ) + "%RH, "
            + convertUnit( forecast.currently.pressure, "pressure" ) + ", "
            + convertUnit( forecast.currently.windSpeed, 'speed' ) );
        
        // Hourly-summary
        $("#weather-cur-summary").text( forecast.hourly.summary );
        
        // Hourly details
        let hourstep = Math.min( 2, Math.floor( (forecast.hourly.data.length - 1) / 2 ) );
        let today_sunset = moment.unix( forecast.daily.data[0].sunsetTime ).tz( config.unitTimezone ).hour();
        let today_sunrise = moment.unix( forecast.daily.data[0].sunriseTime ).tz( config.unitTimezone ).hour();
        
        for ( let i = 0; i < 6; i++ )
        {
            let fdata = forecast.hourly.data[ i * hourstep + 1 ];
            let wtime = moment.unix( fdata.time ).tz( config.unitTimezone );

            $("#weather-cur-time-" + i ).html( wtime.format( "LT", config.timeLocale ) + appendIfNextDay( wtime ) );
            $("#weather-cur-sum-" + i ).text( fdata.summary );
            $("#weather-cur-details-" + i).html( '<i class="' + forecastprovider.convertIcon( fdata.icon ) + '"></i> ' 
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
        for ( let i = 0; i < Math.min( forecast.daily.data.length, 6 ); i++ )
        {
            let fdata = forecast.daily.data[ i + 1 ];
            let wtime = moment.unix( fdata.time );
            $("#weather-next-date-" + i ).text( wtime.format( "ddd MMM DD", config.timeLocale ) );
            $("#weather-next-sum-" + i ).text( fdata.summary );
            $("#weather-next-details-" + i).html( '<i class="' + forecastprovider.convertIcon( fdata.icon ) + '"></i> ' 
                    + convertUnit( fdata.temperatureLow, "temperature" ) 
                    + " / "
                    + convertUnit( fdata.temperatureHigh, "temperature" ) );

            $("#weather-next-sunrise-" + i).text( moment.unix( fdata.sunriseTime ).tz( config.unitTimezone ).format( 'LT', config.timeLocale ) );
            $("#weather-next-sunset-" + i).text( moment.unix( fdata.sunsetTime ).tz( config.unitTimezone ).format( 'LT', config.timeLocale ) );
            
            // Remove all weather-daily-temp- classes
            for ( let c of [ "weather-daily-temp-cold", "weather-daily-temp-awfulhot", "weather-daily-temp-veryhot", "weather-daily-temp-hot", "weather-daily-rain" ] )
                $("#weather-daily-" + i).removeClass ( c );

            // And add the one depending on temperature
            if ( fdata.precipProbability > 40 )
                $("#weather-daily-" + i).addClass( "weather-daily-rain" );
            
            if ( fdata.temperatureHigh < 65 )
                $("#weather-daily-" + i).addClass( "weather-daily-temp-cold" );
            else if ( fdata.temperatureHigh > 90 )
                $("#weather-daily-" + i).addClass( "weather-daily-temp-awfulhot" );                        
            else if ( fdata.temperatureHigh > 85 )
                $("#weather-daily-" + i).addClass( "weather-daily-temp-veryhot" );            
            else if ( fdata.temperatureHigh > 78 )
                $("#weather-daily-" + i).addClass( "weather-daily-temp-hot" );
        }

        // Make the blocks visible
        $("#weather-block-daily").show();
        $("#weather-block-hourly").show();
    }
    
    // Only update the weather status if we don't show errors
    if ( !$("#statusmessage").hasClass("statusmessage-error") )
    {
        let q = forecastprovider.currentStatus();
        $("#statusmessage").text( forecastprovider.currentStatus() );
    }

    if ( $("#mainwindow").hasClass("d-none") )
        $("#mainwindow").removeClass("d-none");
}

function showError( msg )
{
    if ( !$("#statusmessage").hasClass("statusmessage-error") )
        $("#statusmessage").addClass("statusmessage-error").removeClass( "statusmessage-normal" );
    
    $("#statusmessage").html( msg + "  &times;");
}

function restoreMain()
{
    $("#settingswindow").hide();
    $("#mainwindow").fadeIn();

    updateUI( forecastprovider.current() );
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
        config.unitTimezone = $("#settings-tzunit").val();
        config.units = $("#settings-units").val();
        config.timeLocale = $("#settings-locale").val();
        config.forecastURL = $("#settings-url-forecast").val();
        config.airQualityURL = $("#settings-url-waqi").val();

        config.timezones = []; 
        
        for ( let l = 0; l < 4; l++ )
            config.timezones.push( $("#settings-tzunit" + l ).val() );

        saveSetting( "config", config );
        restoreMain();
        forecastprovider.updateFromInternet();
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
    $("#settings-tzunit").selectize()[0].selectize.addItem( config.unitTimezone );
    $("#settings-units").val( config.units );
    $("#settings-locale").val( config.timeLocale );
    $("#settings-url-waqi").val( config.airQualityURL );
    $("#settings-url-forecast").val( config.forecastURL );

    for ( let l = 0; l < config.timezones.length; l++ )
        $("#settings-tzunit" + l ).selectize()[0].selectize.addItem( config.timezones[l] );

    $("#settingsmessage").text( "Version " + applicationVersion 
                                + ", built: " + moment.unix( applicationBuiltEpoch ).format( 'LLLL')
                                + ", " + forecastprovider.debugStatus()  );    
    
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
        cordova.plugins.brightness.setBrightness( brightnessIdleLevel, function(){}, function(){} );
    }, brightnessKeepTime  );
    
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
    loadSettings();

    // If we have forecastDefaultURL defined, and the default update URL is empty, override it
    if ( config.forecastURL == "" && typeof forecastDefaultURL !== 'undefined' )
        config.forecastURL = forecastDefaultURL;
    
    if ( config.airQualityURL == "" && typeof airQualityDetaultURL !== 'undefined' )
        config.airQualityURL = airQualityDetaultURL;        
    
    // Setup settings UI part
    setupSettings();

    // Update the main UI every 500ms
    setInterval( updateUI, 500 );

    // Show settings page on click on settings button
    $("#button_settings").click( function() {
        showSettings();
    });

    // Back button
    document.addEventListener( "backbutton", function() { window.location = startURL; }, true );
    
    // Hide the red background on click on error message
    $("#statusmessage").click( function() {

        if ( $("#statusmessage").hasClass("statusmessage-error") )
        {
            $("#statusmessage").removeClass("statusmessage-error").addClass( "statusmessage-normal" );
            $("#statusmessage").text( forecastprovider.currentStatus() );
        }
        else
        {
            console.log( "Forecast update: manual request" );
            forecastprovider.updateFromInternet();
        }            
    });
    
    // Handle click on weather daily forecast
    $(".weather-daily").click( function( event ) {
        
        showDetailedDialog( $(this).closest( ".weather-daily" ).attr('id') );
        
    });
    
    // Closing the modal dialog when clicked outside or close button
    $(".daily-modal").click( function(event){
        
        if ( event.target == $(".daily-modal")[0] || event.target == $(".daily-modal-close")[0] )
            $("#daily-details-dialog").hide();
        
        clearTimeout( timeoutTimerHandle );
        timeoutTimerHandle = null;
    });

    // If private.js has privateInit function, call it
    if ( typeof privateInit === 'function' )
        privateInit();

    // Setup the forecast updater
    forecastprovider.intialize( function updated( error, forecast ) {
        
        if ( error != null )
            showError ( error );
        else
            updateUI( forecast );
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
}

//
// This one is fired both via localhost and via Cordova,
// but for Cordova we have to wait for deviceready.
// Thus we check whether it is Cordova by using the URL,
// and wait for the proper function.
$(document).ready(function() {

    startURL = document.URL;
    
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
