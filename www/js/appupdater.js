//
// Self-updates the app, checking for the update periodically

var appupdater = {
 
    checkForUpdates : function()
    {
        if ( typeof appUpdaterApkURL === 'undefined' )
            return;
        
        var oReq = new XMLHttpRequest();

        // Make sure you add the domain name to the Content-Security-Policy <meta> element.
        oReq.open( "GET", appUpdaterApkURL, true);
        
        // Define how you want the XHR data to come back
        oReq.responseType = "blob";
        oReq.onload = function (oEvent) {
            var blob = oReq.response; // Note: not oReq.responseText
    
            if ( blob )
            {
                window.resolveLocalFileSystemURL( cordova.file.externalRootDirectory, function (dirEntry) {

                    $("#settingsmessage").text( "Downloading the APK file..." );
                    
                    dirEntry.getFile("Download/weatherclock.apk", {create: true, exclusive: false}, function(fileEntry)
                    {
                        fileEntry.createWriter(function(fileWriter) {
                            fileWriter.onwriteend = function(e) {
                                $("#settingsmessage").text( "APK file successfully downloaded" );
                                
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
                                $("#settingsmessage").text( "Failed to save the APK: " + e.toString());
                            };

                            fileWriter.write(blob);
                        },
                        function error(e) { 
                            $("#settingsmessage").text( "Failed to create a writer" );
                        });
                    },
                    function error(e) { 
                        $("#settingsmessage").text( "Failed to create temporary file" );
                    });
                },
                function error(e) { 
                    $("#settingsmessage").text( "Failed to open root directory" );
                });
            }
            else
            {
                $("#settingsmessage").text( "Invalid HTTP response" );
            }
        };
        
        oReq.send(null);
    }
};
