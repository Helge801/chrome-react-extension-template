# Lyrical 

## Usage
Used to pull lyrics from from azlyrics and help divide them into slides based an songs and line groups.
This extension is intended for private use and not intended for distribution or comercial use.

<img src="screenshots/lyrical_screen.png" alt="Extension Screenshot" width="640" height="450">

Highlights:
- Quickly see if there are Rakuten Marketing tags on the site and from which channel
- Know who owns the Facebook pixel drop and the details passed by their pixel
- Identify what network pixels are being dropped with their associated IDs
- View what cookies are cached and edit the cookie to verify personalization
- Locate Rakuten ads on the page and view their feed details
- Links to internal portals to make quick edits
- One click to report issues and be provided with all the data you will need to create the ticket

## Build

### Configure

Open a terminal in cloned repo directory and install all
[NodeJS][nodejs] dependencies with [npm](http://npmjs.com/) or

    npm install

### Development

Start the continuous build process to transpile the code into something that
can run in Firefox or Chrome:

    npm run build:dev

This creates a WebExtension in the `extension` subdirectory.
Any time you edit a file, it will be rebuilt automatically.

In another shell window, run the extension in Firefox using a wrapper
around [web-ext][web-ext]:

    npm start

Any time you edit a file, [web-ext][web-ext] will reload the extension
in Firefox. 

### Production

    npm run build:prod

This packs and transpiles the source with NODE_ENV='production' and creates an unsigned extension zip package in `WEB_EXT_ARTIFACTS_DIR`

### Sign/Upload
General Notes
* [web-ext] uses the [name](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/name) and [version](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/version) values from the extension's manifest.json (**not package.json**) when packaging the extension
* version number should be incremented using semantic versioning rules - if version has not been incremented from last successful upload then sign/upload will fail

#### Firefox

Sign/Upload scripting for Firefox uses the [web-ext] package and requires valid [addon API credentials](http://addons-server.readthedocs.io/en/latest/topics/api/auth.html#access-credentials) for an [AMO](addons.mozilla.org) developer account that is assigned as an owner or developer of the extension.

Use `upload:firefox` npm script to package, sign, and upload the contents of `WEB_EXT_SOURCE_DIR`

    npm run upload:firefox -- --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET

If `WEB_EXT_API_KEY` and `WEB_EXT_API_SECRET` are defined in `./firefox.env` or local environment then shortened syntax can be used instead

    npm run upload:firefox


#### Chrome

Sign/Upload scripting for Chrome uses the [chrome-webstore-upload-cli] package and requires valid [webstore API OAuth credentials](https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md) for a [google developer](https://developer.chrome.com/webstore/publish) account that is a member of the extension publishing group. 

Use `upload:chrome` npm script to sign and upload the prebuilt zip package from `WEB_EXT_ARTIFACTS_DIR`

    npm run upload:chrome -- --client_id=$CLIENT_ID --client_secret=$CLIENT_SECRET --refresh_token=$REFRESH_TOKEN

If `CLIENT_ID`, `CLIENT_SECRET`, and `REFRESH_TOKEN` are defined in `./chrome.env` or local environment then shortened syntax can be used instead

    npm run upload:chrome


[react]: https://facebook.github.io/react/
[nodejs]: https://nodejs.org/en/
[web-ext]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext
[chrome-webstore-upload-cli]: https://github.com/DrewML/chrome-webstore-upload-cli
