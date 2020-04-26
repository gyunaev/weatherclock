# WeatherClock - a full-screen application to run on the Android tablets in your home

![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot2.png "Screenshot")

WeatherClock is a full-screen home information screen intended to run on Android tablets installed at home. It is supposed to run 24/7 and provides the following information:

- Current time and date;
- Current temperature, weather conditions, humidity, pressure, and wind speed;
- Air quality index;
- Time in up to four configurable timezones;
- Brief weather forecast for the next 12 hours;
- Detailed weather forecast for the next four days.
- Sunrise and sunset times for the next four days.

This application is based on HTML/CSS/JS and thus is easily configurable by everyone familiar with those technologies. There is no need to learn Java or anything Android-specific. The application uses Apache Cordova to provide platform-specific functionality.

WeatherClock is licensed under GNU GPL version 3, and is written by George Yunaev.

## Features

- Shows current time and date (the timezone is configurable);
- Shows current, hourly and daily forecast from NOAA;
- Shows current air quailty from waqi.info;
- Supports automatic application updates from your server;
- Supports Imperial and Metric units;
- Allows easy integration of the rest of your home automation system via HTML modification;
- Dims the screen when unused, restores full brightness on touch;
- Background automatically changes depending on current weather conditions;

## Usage

- Find out your city location (latitude/longtitude) - you can do it at weather.gov by typing your city in the search box and look at the address bar. The URL would look like https://forecast.weather.gov/MapClick.php?lat=40.6925&lon=-73.9904 - so your coordinates would be 40.6925,-73.9904;
- Launch the application, click on Settings button and put those coordinates in the coordinates field.

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

## Screenshots

![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot1.png "UI without timezones")
![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot2.png "UI with timezones")
![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot3.png "Weather details")
![Screenshot](https://github.com/gyunaev/weatherclock/raw/master/screenshots/screenshot4.png "During the day")

## Contacts

Please use Github issue tracker for feature requests.

