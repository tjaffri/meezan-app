# Meezan App
This repo includes the following app implementations for Meezan, implemented with [Ionic 2](http://ionicframework.com/docs/v2/).

1. Progressive Web App (PWA) depoyed as a website
2. Cordova based iOS and Android 

## Setup

Install dependencies required for the app.

```sh
npm install -g ionic@2.1.12
npm install -g cordova@^6.3.1
npm install
```

## Developing

During development, you can run:

```sh
ionic serve
``` 

This deploys the app in a local web browser for development purposes.

## Build and Release

You can run a build via:

```sh
ionic build <ios|android|browser>
```

The Continuous Integration process automatically runs a build for the brwoser platform, and deploys to
the web server as needed.
