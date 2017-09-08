<p align="center">
  <a href="https://quead.github.io/demo/" title="YouTube Player Demo">View Demo</a>
  <img alt="Angular YouTube Player Logo" src="http://i.imgur.com/YbcAno9.png" style="height: auto; max-width:100%;" />
</p>

# About Player
[![Version](https://img.shields.io/badge/Current%20version-v1.9-brightgreen.svg?style=flat)](https://github.com/quead/angular2-yt-player)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/quead/angular2-yt-player/master/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/network)
[![GitHub stars](https://img.shields.io/github/stars/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/stargazers)

This is a simple youtube player based on [angular-cli](https://github.com/angular/angular-cli "Angular Cli") 1.3, [ng2-youtube-player](https://github.com/orizens/ng2-youtube-player "ng2 youtube player") 0.0.3 (used for youtube iFrame API), SCSS (CSS3), HTML5 and webkit functions.

This player is compatible only with Chrome/webkit browsers because in future I want to implement [NW.js](https://nwjs.io/ 'NWjs website') for compiling the code in Windows/Mac OS X/Linux desktop app.

*The project status is alpha.*

## Usage

**For angular2/typescript development**
1. Install [NodeJS 6.11.0+](https://nodejs.org/en/download/ "Node JS Download")
2. Install [angular-cli 1.1.3+](https://github.com/angular/angular-cli "Angular Cli")

`npm install -g @angular/cli`

3. Download/clone repository then install the player by

`npm install` in root folder

4. Run the player by

`npm start` in root folder

------

**For SASS development**

1. Install [Sass](http://sass-lang.com/install "Sass website")
2. Install [Gulp](https://github.com/gulpjs/gulp "Gulp download")

`npm install -g gulp`

4. Start compiling the SCSS files by

`gulp`

**For personal use**

Just take files from ***dist*** folder

<a href="https://quead.github.io/demo/" title="YouTube Player Demo">View Demo</a>

## Changelog

Angular2 YT Player v1.9
- Add/remove items from playlist, first time when is initialized It is prepopulated with related videos
- Next/prev video from your playlist
- Moved history to separate page
- Adding toggle video, repeat mode and list & grid on trending to settings.json
- Small fixes

Angular2 YT Player v1.7
- Added featured video as first video from trending
- Notifications for important actions you do
- Removed debugging mode
- Preparing packages, code and files for v2.0
- Improved UI/UX for lists

Angular2 YT Player v1.6
- Video details for current video and trending videos like number of views, likes and dislikes
- Share link for current video
- Added new setting for hiding all thumbnails
- Custom player buttons shows now only when you hide video

Angular2 YT Player v1.4
- History of your watched videos
- Small fixes

Angular2 YT Player v1.3
 - Show/hide video player
 - Repeat video
 - Grid/list mode for trending videos
- **Settings (you can set default from "assets/settings.json", soon will be directly from settings)**
- *Change country for trending videos (currently only three countries, US, UK and RO)*
- *Max results show in search (0 to 50)*
- *YOUR_API Key*
- *Max related videos (0 to 50)*

Angular2 YT Player v1.2
- Introducing trending videos, currently default trending videos are from United States
- Refactoring the code
- Adding routes for future components which it will show in left navbar
- Default video will be first from trending videos
- Adding the video player
- Update the design to match the new features

Angular2 YT Player v1.1
- Adding mute/unmute functionality
- Improved user interface and user experience
- Adding settings functionality, the settings will get from ***assets/settings.json***
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
#### Backlog
- iOS 8+ / android 5+ app **(unversioned)**
- Change and create theme **(unversioned)**
- **Rooms**
- *Room chat **(unversioned)***

#### Roadmap to 2.0
- When first time load the app it will transfer settings from settings.json to localstorage **(in v1.9.1)**
- Save settings in localstorage **(in v1.9.1)**
- Save playlist in localstorage **(in v1.9.1)**
- Adding support for NW.js to export the app for desktop compatible: Windows/Mac OS X/Linux **(in v2.0)**
- Hotkeys for application in desktop (play/pause/next/prev) **(in v2.0)**

#### Roadmap to 3.0
- Import/Export playlist **(in v2.1)**
- Categories with videos like (music, gaming, autos, films, sports, much more) **(in v2.1)**
- Drag and drop videos to playlist **(in v2.2)**
- Arrange playlist by drag and drop **(in v2.2)**

- **Rooms**
- *Create room where you can watch videos with others in sync by sharing the room link **(in v3.0)***
- *Set private/public room **(in v3.0)***
- *List of public rooms **(in v3.0)***
- *Room moderators which can add videos, kick roommates, mute roommates, rename room title and description **(in v3.3)***

## Copyright and License
Copyright [quead](https://github.com/quead) under the [MIT license](LICENSE).
