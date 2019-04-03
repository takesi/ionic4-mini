## Extremely simple web test page

### Install necessary npm modules
```
$ npm install
```

### Start web server
```
$ npm start
```
or
```
$ gulp
```

### Building APK
```
$ ionic integrations enable cordova --add
$ cordova platform add android
$ cordova build android
$ adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
```
