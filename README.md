<p align="center">
  <img alt="Angular YouTube Player Logo" src="http://i.imgur.com/IQmoEIA.png" width="auto" height="100%" />
</p>

# Angular2 YT Player
This is a simple youtube player based on latest version of [angular-cli](https://github.com/angular/angular-cli "Angular Cli"), [ng2-youtube-player](https://github.com/orizens/ng2-youtube-player "ng2 youtube player") (used for youtube iFrame API), SCSS (CSS3), HTML5 and webkit functions.

This player is compatible only with Chrome/webkit browsers because in future I want to implement [NW.js](https://nwjs.io/ 'NWjs website') for compiling the code in Windows/Mac OS X/Linux desktop app.

## Usage
For typescript/angular2 development
1. Install [NodeJS 6.10.2+](https://nodejs.org/en/download/ "Node JS Download")
2. Install latest version of [angular-cli](https://github.com/angular/angular-cli "Angular Cli")

`npm install -g @angular/cli`

3. Download/clone repository then install the player by

`npm install` in root folder

4. Run the player by

`npm start` in root folder

For SCSS development (after you downloaded/cloned the project)
1. Install [Sass](http://sass-lang.com/install "Sass website")
2. Install [Gulp](https://github.com/gulpjs/gulp "Gulp download")

`npm install -g gulp`

3. In cloned folder in **src** folder

`npm install`

4. Start compiling the SCSS files by

`gulp`

## Changelog
*Current version*
**Angular2 YT Player v1.0.2**
- Change volume on your video
- Related videos

Angular2 YT Player v1.0.0
- Search and play video from youtube
- Play/pause video
- Change time of your video that you want to listen

## Future features for 2.0
- Add your videos in playlist
- Next/prev video from your playlist
- Adding support for NW.js to export the app for desktop compatible: Windows/Mac OS X/Linux
- Hotkeys for application in desktop (play/pause/next/prev)
- **Settings**
- *Show/hide video*
- *Show/hide debugging features (in next update)*
- *Show/hide thumbnails in search (in next update)*
- *Set how many results to show in search (max 50)*
- *Change/add YOUR_API Key*
- *Max related videos*
- *Save your settings (in next update)*

## License
MIT
