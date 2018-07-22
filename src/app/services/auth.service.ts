import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { GlobalsService } from '../services/globals.service';
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
  ) {
  }

  checkLogged() {
    this.afAuth.user.subscribe(data => {
      if (data) {
        this.globals.isLogged = true;
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

  login(currentDetails: any) {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(authData => {
      console.log(authData.user.uid);
      this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(data => {
        this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(userData => {
          if (userData.length === 0) {
            // First time login create user and session
            const profile = authData.additionalUserInfo.profile;
            const defaultUser = {
              name: profile.name,
              email: profile.email,
              settings: this.globals.settings,
              session: localStorage.getItem('session_key'),
            };

            const afList = this.db2.list('users/');

            afList.set(authData.user.uid, defaultUser);
            this.initSession(currentDetails);
            this.shared.updateData('first time login');
          } else {
            // Get session and settings from logged user
            localStorage.removeItem('session_key');
            localStorage.setItem('session_key', data['2']);

            this.db2.list('sessions/' + data['2']).valueChanges().subscribe((sessionData) => {
              localStorage.setItem('settings', JSON.parse(data['3']));
              this.shared.getSettings();
            });
            this.shared.updateData('normal login');
          }
          this.globals.isLogged = true;
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  initSession(currentDetails: any) {
    const afList = this.db2.list('sessions/');
    const defaultSession = {
        currentState: -1,
        currentSeek: 0,
        playlist: this.globals.playlistVideos,
        details: currentDetails,
    };
    afList.set(localStorage.getItem('session_key'), defaultSession);
  }
}
