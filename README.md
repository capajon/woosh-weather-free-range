# WooshWeatherFreeRange #
This is a weather application to test the D2L free range framework.

##Prerequisites##

- Run `npm i` to install the required node modules.  


## Build & Publish ##

###Build to Localhost###
These steps create an appconfig file that points to your localhost, and publishes the app resources to the localhost.

**Prerequisites**

1. Clone the [Dev AppRegistry Config](https://git.dev.d2l/users/cpacey/repos/lp-devappregistry-config/browse) into your instance's `checkout` directory.
2. Run a build so that your instance picks up the Dev AppRegistry Config. 

**Process**

1. Run `npm run build`. This builds the UMD module and creates the local appconfig file. 
2. In a separate terminal window, run `gulp appresolver`.  This will host/resolve the app on `http://localhost:3000/resolve/hellobarb`.
3. In your browser, log in to your LMS and access the app by changing the URI to `/d2l/apps/hellobarb`.


### Build to CDN ###
These steps create an appconfig file that points to the CDN, and publishes the app resources to the CDN.

**Prerequisites**

1. If the app has already been published, bump up the version in the ``devTag`` field of the gulpfile.js because you cannot publish the same version of the app.
2. To publish the app to the CDN, you must add your app key and secret to the ``creds`` in the gulpfile.  **DO NOT PUBLISH THE KEY OR SECRET**.

> **Important**: DO NOT PUBLISH THE SECRET.  The secret is actually set and stored locally for the project via a Node command--Only Barb has this info.



**Process**

To test and run on the CDN:

1. Run `npm run build:release`. This builds the UMD module and creates the appconfig file for the CDN. 
2. Run `gulp publish`.  This publishes the app to the CDN.
3. Run `gulp finish` to create a JSON file to integrate with your LMS.
4. Copy that JSON file to your instance in the `<instance>\config\AppLoader\Apps` folder.
5. In your browser, log in to your LMS and access the app by changing the URI to `/d2l/apps/hellobarb`.

> **Note**: You may have to recycle your AppPool to pick up the changes.

