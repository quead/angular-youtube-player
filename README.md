<p align="center">
  <a href="https://quead.github.io/demo/" title="YouTube Player Demo">View Demo</a>
  <img alt="Angular YouTube Player Logo" src="http://i.imgur.com/5vx8KxG.png" style="height: auto; max-width:100%;" />
</p>

# About Player
[![Version](https://img.shields.io/badge/Current%20version-v1.1-brightgreen.svg?style=flat)](https://github.com/quead/angular2-yt-player)
[![Next version](https://img.shields.io/badge/Next%20version-v1.3-e52d27.svg)](https://github.com/quead/angular2-yt-player#changelog)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/quead/angular2-yt-player/master/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/network)
[![GitHub stars](https://img.shields.io/github/stars/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/stargazers)

This is a simple youtube player based on [angular-cli](https://github.com/angular/angular-cli "Angular Cli") 1.0, [ng2-youtube-player](https://github.com/orizens/ng2-youtube-player "ng2 youtube player") 0.0.3 (used for youtube iFrame API), SCSS (CSS3), HTML5 and webkit functions.

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

3. Then install all packages

`npm install`

4. Start compiling the SCSS files by

`gulp`

**For personal use**

Just take files from ***dist*** folder

<a href="https://quead.github.io/demo/" title="YouTube Player Demo">View Demo</a>

## Changelog

Angular2 YT Player v1.1
- Adding mute/unmute functionality
- Improved user interface and user experience
- **Settings**
- *Show/hide debugging features*
- *Show/hide thumbnails in search*


Angular2 YT Player v1.0.2
- Change volume on your video
- Related videos

Angular2 YT Player v1.0.0
- Search and play video from youtube
- Play/pause video
- Change time of your video that you want to listen

## Future features
- Copy link for current video and related videos **(in v1.6)** 
- Copy link for current video at your playing time **(in v1.6)**
- Video details for current video and related videos like number of views, likes and dislikes **(in v1.6)**
- Add your videos in playlist **(in v1.9)**
- Next/prev video from your playlist **(in v1.9)**
- Adding support for NW.js to export the app for desktop compatible: Windows/Mac OS X/Linux **(in v2.0)**
- Hotkeys for application in desktop (play/pause/next/prev) **(in v2.0)**
- **Settings**
- *Show/hide video **(possible in v1.3)***
- *Set how many results to show in search (0 to 50) **(in v1.3)***
- *Enable loop video **(in v1.3)***
- *Change/add YOUR_API Key **(in v1.3)***
- *Max related videos (0 to 50) **(in v1.3)***
- *Save your settings **(possible in v1.9)***

## Copyright and License
Copyright [quead](https://github.com/quead) under the [MIT license](LICENSE).
