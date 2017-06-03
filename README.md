<p align="center">
  <img alt="Angular YouTube Player Logo" src="http://i.imgur.com/yiA2rz3.jpg" style="height: auto; max-width:100%;" />
</p>

# About Player
[![Version](https://img.shields.io/badge/Current%20version-v1.0.2-brightgreen.svg?style=flat)](https://github.com/quead/angular2-yt-player)
[![Next version](https://img.shields.io/badge/Next%20version-v1.1-e52d27.svg)](https://github.com/quead/angular2-yt-player#changelog)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/quead/angular2-yt-player/master/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/network)
[![GitHub stars](https://img.shields.io/github/stars/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/stargazers)

This is a simple youtube player based on latest version of [angular-cli](https://github.com/angular/angular-cli "Angular Cli"), [ng2-youtube-player](https://github.com/orizens/ng2-youtube-player "ng2 youtube player") (used for youtube iFrame API), SCSS (CSS3), HTML5 and webkit functions.

This player is compatible only with Chrome/webkit browsers because in future I want to implement [NW.js](https://nwjs.io/ 'NWjs website') for compiling the code in Windows/Mac OS X/Linux desktop app.

*This is pre-alpha.*

## Usage

**For angular2/typescript development**
1. Install [NodeJS 6.10.2+](https://nodejs.org/en/download/ "Node JS Download")
2. Install latest version of [angular-cli](https://github.com/angular/angular-cli "Angular Cli")

`npm install -g @angular/cli`

3. Download/clone repository then install the player by

`npm install` in root folder

4. Run the player by

`npm start` in root folder

------

**For SASS development**

*You must go in **src** folder*
1. Install [Sass](http://sass-lang.com/install "Sass website")
2. Install [Gulp](https://github.com/gulpjs/gulp "Gulp download")

`npm install -g gulp`

3. In cloned folder in **src** folder

`npm install`

4. Start compiling the SCSS files by

`gulp`

## Changelog

Angular2 YT Player v1.0.2
- Change volume on your video
- Related videos

Angular2 YT Player v1.0.0
- Search and play video from youtube
- Play/pause video
- Change time of your video that you want to listen

## Future features
- Add your videos in playlist **(in v1.6)**
- Next/prev video from your playlist **(in v1.6)**
- Adding support for NW.js to export the app for desktop compatible: Windows/Mac OS X/Linux **(in v2.0)**
- Hotkeys for application in desktop (play/pause/next/prev) **(in v2.0)**
- **Settings**
- *Show/hide video **(possible v1.3)***
- *Show/hide debugging features **(in v1.1)***
- *Show/hide thumbnails in search **(in v1.1)***
- *Set how many results to show in search (0 to 50) **(in v1.3)***
- *Change/add YOUR_API Key **(in v1.3)***
- *Max related videos (0 to 50) **(in v1.3)***
- *Save your settings **(in v1.1)***

## Copyright and License
Copyright [quead](https://github.com/quead) under the [MIT license](LICENSE)
.
