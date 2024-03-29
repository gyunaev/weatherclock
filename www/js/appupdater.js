//
// Self-updates the app upon request

var clickButtonUponInstall = false;

var appupdater = {
    
    initialize : function()
    {
        AutoinstallPlugin.register( (evt)=>{
            //console.log( "event callback", evt );
    
            if ( clickButtonUponInstall && evt.root.packageName == "com.android.packageinstaller" && evt.root.children[0].text == "SmartClock" )
            {
                console.log("Installation screen is here, calling the install");
                AutoinstallPlugin.clickButton( "Install",  (res)=>{ clickButtonUponInstall = false; }, (res)=>{  console.log( "error", res ) } );
            }            
        });
        
        if ( config.appUpdaterIndexURL )
            setInterval( this.checkUpdate.bind( this ), 60000 );
    },
    
    // Download the JSON file containing the latest release info
    checkUpdate : async function()
    {
        try
        {
            const response = await window.fetch( config.appUpdaterIndexURL, {
                        method: 'GET',
                        cache: 'no-store'
                     } );
            
            let info = await response.json();
            console.log( "Checked app update, available version %s, ours %s", info.updated, applicationBuiltEpoch );
            
            if ( typeof info.updated === "undefined" || info.updated <= applicationBuiltEpoch )
                return;
            
            // Set it so install is no longer triggered
            applicationBuiltEpoch = info.updated;
            
            // Start installing
            console.log( "Triggering auto-install from URL %s", info.url );
            this.downloadAndInstall( info.url );
        }
        catch ( ex )
        {
            console.log( ex );
        }
    },
 
    setMessage : function( msg, autoClose = false )
    {
        $("#app-download-info").text( msg );
        
        if ( autoClose )
            setTimeout( ()=>{ $("#app-download-dialog").hide(); }, 2500 );
    },
    
    downloadAndInstall : function( url = null )
    {
        if ( url == null )
        {
            if ( typeof config.appUpdaterApkURL === 'undefined' )
                return;
            
            url = config.appUpdaterApkURL;
        }
        
        var oReq = new XMLHttpRequest();

        // Make sure you add the domain name to the Content-Security-Policy <meta> element.
        oReq.open( "GET", url, true);

        appupdater.setMessage( "Preparing to download the APK file" );
        $("#app-download-progress").css('width', '2%');
        $("#app-download-dialog").show();
        
        // Define how you want the XHR data to come back
        oReq.responseType = "blob";
        
        oReq.onprogress = function(event) {
            
            if (event.lengthComputable) 
            {  
                // evt.loaded the bytes the browser received
                // evt.total the total bytes set by the header
                $("#app-download-progress").css('width', Math.max( 2, (event.loaded / event.total) * 100 ) + '%');
            } 
        }; 
    
        oReq.onload = function (oEvent) {
            var blob = oReq.response; // Note: not oReq.responseText
    
            if ( blob )
            {
                window.resolveLocalFileSystemURL( cordova.file.externalRootDirectory, function (dirEntry) {

                    appupdater.setMessage( "APK file successfully downloaded" );
                    
                    dirEntry.getFile("Download/weatherclock.apk", {create: true, exclusive: false}, function(fileEntry)
                    {
                        fileEntry.createWriter(function(fileWriter) {
                            fileWriter.onwriteend = function(e) {
                                
                                appupdater.setMessage( "Runnign the installer", true );
                                clickButtonUponInstall = true;
                                
                                window.plugins.webintent.startActivity({
                                            action: window.plugins.webintent.ACTION_VIEW,
                                            url: fileEntry.toURL(),
                                            type: 'application/vnd.android.package-archive'
                                        },
                                        function () {
                                            $("#settingsmessage").text( "APK installed successfully");
                                        },
                                        function () {
                                            $("#settingsmessage").text( "Failed to install new APK");
                                        }
                                    );                                
                            };

                            fileWriter.onerror = function(e) {
                                appupdater.setMessage( "Failed to save the APK: " + e.toString(), true );
                            };

                            appupdater.setMessage( "Writing the APK file to the SD card", true );
                            fileWriter.write(blob);
                        },
                        function error(e) { 
                            appupdater.setMessage( "Failed to create a writer", true );
                        });
                    },
                    function error(e) { 
                        appupdater.setMessage( "Failed to create temporary file", true );
                    });
                },
                function error(e) { 
                    appupdater.setMessage( "Failed to open root directory", true );
                });
            }
            else
            {
                appupdater.setMessage( "Failed to download the APK", true );
            }
        };
        
        appupdater.setMessage( "Downloading the APK file" );
        oReq.send(null);
    }
};
