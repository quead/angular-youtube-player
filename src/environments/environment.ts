// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyCf1xO2EQcHySk2rDsQXtG2uXCjedveiy8',
    authDomain: 'angular-yt-player-quead.firebaseapp.com',
    databaseURL: 'https://angular-yt-player-quead.firebaseio.com',
    projectId: 'angular-yt-player-quead',
    storageBucket: 'angular-yt-player-quead.appspot.com',
    messagingSenderId: '407554727392'
  }
};
