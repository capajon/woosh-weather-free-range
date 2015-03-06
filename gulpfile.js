'use strict';

var     gulp            = require('gulp'),
        frau            = require('free-range-app-utils'),
        source          = require('vinyl-source-stream'),
        pjson           = require('./package.json'),
        publisher       = require('gulp-frau-publisher'),
        streamifier     = require('streamifier');		
		
// Options required to publish app to CDN
var options = {
    id: pjson.appId,
    creds: {
        "key": "NEEDKEYFORWOOSHWEATHER",
        "secret": process.env.S3_SECRET
    },
    devTag: pjson.version
};

var localAppResolver = frau.localAppResolver();
var appPublisher = publisher.app( options );


// Create the appconfig.json file
function makeAppConfig( target ) {
    return frau.appConfigBuilder.buildStream( target )
        .pipe( gulp.dest('dist') );
}

// Set the appconfig file for local hosting
gulp.task( 'appconfig-local', function() {
    return makeAppConfig( localAppResolver.getUrl() + '/app.js');
} );

// Set the appconfig file for hosting on CDN - s.brightspace
gulp.task('appconfig-release', function () {
    return makeAppConfig( appPublisher.getLocation() + 'app.js');
});

// Run the local app resolver (for local testing/running)
gulp.task( 'appresolver', function() {
    localAppResolver.host();
} );

// Publish the resources in the "dist" folder to the CDN
gulp.task('publish', function (cb) {
    gulp.src('./dist/**')
        .pipe( appPublisher.getStream() )
        .on('end', function () {
            cb();
        });
});

// Create a JSON file that can be used to integrate with the ILP
gulp.task('finish', function () {
	return streamifier
		.createReadStream( JSON.stringify({ "Woosh Weather": appPublisher.getLocation() + 'appconfig.json' }, null, '\t') )
		.pipe( source('woosh-weather.json'))
		.pipe( gulp.dest('dist') );
});
