//
// Self-updates the app, checking for the update periodically

var appupdater = {
 
    checkForUpdates : function()
    {
        if ( typeof appUpdaterApkURL === 'undefined' )
            return;
        
        cordova.file.cacheDirectory

        window.requestFileSystem( LocalFileSystem.TEMPORARY, 0, function(fileSystem) 
        {
            fileSystem.root.getFile( 
                'weatherclock.apk',
                { create: true, exclusive: false }, 
                
                function(fileEntry) {
                    var localPath = fileEntry.fullPath, fileTransfer = new FileTransfer();
                    
                    fileTransfer.download( appUpdaterApkURL, localPath, function(entry) {
                        window.plugins.webintent.startActivity( 
                            { 
                                action: window.plugins.webintent.ACTION_VIEW,
                                url: 'file://' + entry.fullPath,
                                type: 'application/vnd.android.package-archive'
                            },
                            function(){},
                            function(e){
                                alert('Error launching app update');
                            }
                    );                              

                    }, function (error) {
                        $("#settingsmessage").text( "Error downloading APK from " + appUpdaterApkURL );
                    });
            }, function(evt){
                $("#settingsmessage").text( "Error downloading apk" );
            });
        }, function(evt){
            $("#settingsmessage").text( "Error preparing to download apk" );
        });
    }
};
