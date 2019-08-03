# WeatherClock - a full-screen application to run on the Android tablets in your home

![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot2.png "Screenshot")

WeatherClock is a full-screen home information screen intended to run on Android tablets installed at home. It is supposed to run 24/7 and provides the following information:

- Current time and date;
- Current temperature, weather conditions, humidity, pressure, and wind speed;
- Air quality index;
- Time in up to four configurable timezones;
- Brief weather forecast for the next 12 hours;
- Detailed weather forecast for the next four days.

This application is based on HTML/CSS/JS and thus is easily configurable by everyone familiar with those technologies. There is no need to learn Java or anything Android-specific. The application uses Apache Cordova to provide platform-specific functionality.

WeatherClock is licensed under GNU GPL version 3, and is written by George Yunaev.

## Features

- Shows current time and date (the timezone is configurable);
- Shows current, hourly and daily forecast from darksky.io;
- Shows current air quailty from waqi.info;
- Supports automatic application updates from your server;
- Supports Imperial and Metric units;
- Allows easy integration of the rest of your home automation system via HTML modification;
- Dims the screen when unused, restores full brightness on touch;
- Background automatically changes depending on current weather conditions;

## Usage

**Before installing the application you must create accounts and obtain development tokens from darksky.net and waqi.info**

The application uses free tier weather forecast from DarkSky.net and free air quailty index from waqi.info. To get access to this data, you need:

### Obtain DarkSky.io credentials

- Register at darksky.net and obtain development token for weather forecast (free of charge);
- Find out your city location (latitude/longtitude) - you can do it at darksky.net by typing your city in the search box and look at the address bar. The URL would look like https://darksky.net/forecast/17.7007,-93.1979/us12/en - so your coordinates would be 17.7007,-93.1979;
- Prepare the forecast URL by inserting your development token between /forecast/ and coordinates
- Your final weather URL would look like be https://apidarksky.net/forecast/<your token>/17.7007,-93.1979/

### Obtain waqi.info credentials

- Register at waqi.info to obtain the access token for air quality (if you'd like this data);
- Find the nearby air quality station next to your city, and find out the API URL (which would look like https://api.waqi.info/feed/uganda/kampala/us-embassy/?token=<your-token> )

### Test forecast and air quality URLs

- Test both URLs by using curl/wget, or by opening them in your browser; you should see JSON data and no errors.

### Register them in settings

- Launch the application, click on Settings button and put those URLs in the appropriate fields.

## Building your own version

### Install Apache Cordova

Please see https://cordova.apache.org/#getstarted

You will also need to install Android SDK and Gradle.

### Add Android platform

`cordova platforms add android`

### Build for Android

`cordova build android`

### Install the APK

Connect your Android device with USB debugging enabled, and run:

`cordova run android`

Then go to Settings (cogs button at the bottom left), and enter the URLs for forecast and air quality you obtained before. Press Save.

## Customization

You can customize a few things through www/js/private.js file (not included):

- define `var forecastDefaultURL = "<your-forecast-url>";` which would provide default forecast URL;

- define `var airQualityDetaultURL = "<your-air-quality-url>";` which would provide default air quality URL;

- define `function privateInit(){ }` which will be called during the device initialization - here you can add more functions, customize the UI etc.

## Screenshots

![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot1.png "UI without timezones")
![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot2.png "UI with timezones")
![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot3.png "Weather details")
![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot4.png "During the day")

## Contacts

Please use Github issue tracker for feature requests.

