import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { GlobalsService } from '../services/globals.service';
import { PlaylistControlService } from '../services/playlist-control.service';
// DB
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Injectable()
export class AuthService {

    constructor(
        private db2: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        public shared: SharedService,
        public globals: GlobalsService,
        public playlistControl: PlaylistControlService,
    ) {
    }

    checkLogged() {
        this.afAuth.user.subscribe(authData => {
            if (authData) {
            this.globals.isLogged = true;
            // this.db2.list('users/' + authData.uid).valueChanges().subscribe(data => {
            //     console.log(data);
            //     this.shared.updateSettings(data['3']);
            //     // Get session key and check in db for it and update the playlist
            //     if (localStorage.getItem('session_key') !== data['2']) {
            //         localStorage.setItem('session_key', data['2']);
            //     }
            //     this.db2.list('sessions/' + localStorage.getItem('session_key')).valueChanges().subscribe((data) => {
            //         this.shared.convertVideoObject(data['3'], 'playlistVideos');
            //         this.globals.currentVideo = data['2'];
            //         this.shared.updatePlaylist();
            //         this.playlistControl.fillPlaylist();
            //     });
            // });
        } else {
            this.globals.isLogged = false;
            }
        });
    }

    logout() {
        this.afAuth.auth.signOut().then(() => {
            // Sign-out successful.
            console.log('Sign-out successful');
            localStorage.clear();
            this.shared.updateData('logout');
            this.globals.isLogged = false;
        }, (error) => {
            // An error happened.
            console.log('An error happened sign out');
        });
    }

    checkFirebaseData(authData: any) {
        this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(data => {
            this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(userData => {
            if (userData.length === 0) {
                // First time login create user and session
                this.createProfile(authData);
                this.updateSession();
                this.shared.updateData('first time login');
            } else {
                // Get session and settings from logged user
                this.checkFirebaseSession(authData, data);
                this.shared.updateData('normal login');
            }
            this.globals.isLogged = true;
            });
        });
    }

    createProfile(authData: any) {
        const profile = authData.additionalUserInfo.profile;
        const defaultUser = {
            name: profile.name,
            email: profile.email,
            settings: this.globals.settings,
            session: localStorage.getItem('session_key'),
        };

        const afList = this.db2.list('users/');
        afList.set(authData.user.uid, defaultUser);
    }

    checkFirebaseSession(authData, newData) {
        this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(data => {
            localStorage.removeItem('session_key');
            localStorage.setItem('session_key', newData['2']);

            this.db2.list('sessions/' + newData['2']).valueChanges().subscribe((sessionData) => {
                localStorage.setItem('settings', JSON.parse(newData['3']));
                this.shared.convertVideoObject(sessionData, 'playlist');
                this.shared.getSettings();
            });
            this.shared.updateData('normal check');
        });
    }

    login() {
        const provider = new auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(provider).then(authData => {
            this.checkFirebaseData(authData);
        }).catch((error) => {
            console.log(error);
        });
    }

    updateSession() {
        const afList = this.db2.list('sessions/');
        const defaultSession = {
            currentState: -1,
            currentSeek: 0,
            playlist: this.globals.playlistVideos,
            details: this.globals.currentVideo,
        };
        afList.set(localStorage.getItem('session_key'), defaultSession);
    }

    getSession(sessionKey: string) {
        this.db2.list('sessions/' + sessionKey).valueChanges().subscribe((sessionData) => {
            this.globals.playlistVideos = sessionData['3'];
            this.shared.updatePlaylist();
        });
    }
}
