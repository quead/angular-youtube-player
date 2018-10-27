<p align="center">
  <a href="https://quead.github.io/demo/" target="_blank" title="YouTube Player Demo"> 
    Demo
  </a>
  <a href="https://quead.github.io/demo/" target="_blank" title="YouTube Player"> 
    <img alt="Angular YouTube Player Logo" src="https://i.imgur.com/THnmBnz.png" style="height: auto; max-width:100%;" />
  </a>
</p>

# About Player
[![Version](https://img.shields.io/badge/Current%20version-v2.3.3-brightgreen.svg?style=flat)](https://github.com/quead/angular2-yt-player)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/quead/angular2-yt-player/master/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/network)
[![GitHub stars](https://img.shields.io/github/stars/quead/angular2-yt-player.svg)](https://github.com/quead/angular2-yt-player/stargazers)

This is a simple youtube web player and desktop player based on [angular-cli](https://github.com/angular/angular-cli "Angular Cli") 7.0.3, [@angular/fire](https://github.com/angular/angularfire2), [ngx-youtube-player](https://github.com/orizens/ng2-youtube-player "ngx youtube player") 6.0.0 (used for youtube iFrame API), SCSS (CSS3), HTML5.

This player is compatible only with Chrome/webkit browsers.

*The project status is beta.*

## Usage

**For Angular and Typescript Development**
1. Install [NodeJS 8.11.3+](https://nodejs.org/en/download/ "Node JS Download")
2. Install [angular-cli 1.7.3+](https://github.com/angular/angular-cli "Angular Cli")

`npm install -g @angular/cli`

3. Download/clone repository then install the player by

`npm install` in root folder

4. Run the player by

`npm start` in root folder

5. Add your youtube api key in settings.json or in the app

6. To make available firebase (for session feature upload/download) update `environments.prod.ts` and `environments.ts`

**For SASS development**

1. Install [Sass](http://sass-lang.com/install "Sass website")

2. Do steps from above

3. Start project by

`npm start`

4. Edit files from src/assets/scss

## Changelog
Angular YouTube Player 2.3.3
- Fixed bugs after refactoring
- Added session key for playlist which you can upload to cloud and download from cloud (integrated with firebase)
- Layout update
- Updated from angular 5.2.0 to 7.0.1
- Carousel added for related videos (used [ngu-carousel](https://github.com/sheikalthaf/ngu-carousel))

Angular YouTube Player 2.3
- Updating to LTS angular
- Refactoring entire app services and components
- Improved speed performance and fixed major bugs
- New way to loading the app

Angular YouTube Player 2.2
- Sort playlist by drag and drop (used [ng2-dragula](https://valor-software.com/ng2-dragula/ "NG2 Dragula"))

Angular YouTube Player 2.1
- Categories with videos like (music, gaming, autos, films, sports, etc.)
- Refactoring code
- Search on specific region
- Fixing copy link for featured video
- UX improvements

Angular YouTube Player 2.0.1
- Import & export youtube playlist as .JSON file

Angular YouTube Player 2.0
- Global hotkeys for application in desktop (play/pause/next/prev, for keyboards with media buttons)
- Adding support for NW.js to export the app for desktop compatible: Windows x64, Linux x64
- Auto updating the app (desktop version)

Angular YouTube Player 1.9.2
- UX improvements and fixes
- Preparing files for 2.0

Angular YouTube Player 1.9.1
- Get settings.json for localstorage if your localstorage is empty
- The playlist automatically saving, if is empty it will be populated with related videos
- Toggle light/dark theme mode
- Share link button for all videos
- Reorganised settings page
- Auto saving for internal settings (check settings)
- Manual saving for external settings (check settings)
- Performance, UI and UX improvements and fixes

Angular YouTube Player 1.9
- Add/remove items from playlist, first time when is initialized It is prepopulated with related videos
- Next/prev video from your playlist
- Moved history to separate page
- Adding toggle video, repeat mode and list & grid on trending to settings.json
- Small fixes

Angular YouTube Player 1.7
- Added featured video as first video from trending
- Notifications for important actions you do
- Removed debugging mode
- Preparing packages, code and files for v2.0
- Improved UI/UX for lists

Angular YouTube Player 1.6
- Video details for current video and trending videos like number of views, likes and dislikes
- Share link for current video
- Added new setting for hiding all thumbnails
- Custom player buttons shows now only when you hide video

Angular YouTube Player 1.4
- History of your watched videos
- Small fixes

Angular YouTube Player 1.3
 - Show/hide video player
 - Repeat video
 - Grid/list mode for trending videos
- **Settings (you can set default from "assets/settings.json", soon will be directly from settings)**
- *Change country for trending videos (currently only three countries, US, UK and RO)*
- *Max results show in search (0 to 50)*
- *YOUR_API Key*
- *Max related videos (0 to 50)*

Angular YouTube Player 1.2
- Introducing trending videos, currently default trending videos are from United States
- Refactoring the code
- Adding routes for future components which it will show in left navbar
- Default video will be first from trending videos
- Adding the video player
- Update the design to match the new features

Angular YouTube Player 1.1
- Adding mute/unmute functionality
- Improved user interface and user experience
- Adding settings functionality, the settings will get from ***assets/settings.json***

**Settings**
- *Show/hide debugging features*
- *Show/hide thumbnails in search*


Angular YouTube Player 1.0.2
- Change volume on your video
- Related videos

Angular YouTube Player 1.0.0
- Search and play video from youtube
- Play/pause video
- Change time of your video that you want to listen

## Future features
#### Backlog
- iOS 8+ / android 5+ app **(unversioned)**

**Rooms**
- *Room chat **(unversioned)***

#### Roadmap to 3.0
- Responsive layout **(in v2.4)**
- Sync player between session **(in v2.4)**
- Keep your settings in cloud **(in v2.8)**
- Integrating YouTube subscriptions/playlist **(in v2.9)**

**Rooms**
- *Create room where you can watch videos with others in sync by sharing the room link **(in v2.7)***
- *Set private/public room **(in v2.7)***
- *List of public rooms **(in v2.8)***
- *Room moderators which can add videos, kick roommates, mute roommates, rename room title and description **(in v2.9)***


#### Removed features
- Global hotkeys for application in desktop (play/pause/next/prev, for keyboards with media buttons)
- Adding support for NW.js to export the app for desktop compatible: Windows x64, Linux x64
- Auto updating the app (desktop version)
- Temporary removed theme function

## Copyright and License
Copyright [quead](https://github.com/quead) under the [MIT license](LICENSE).
