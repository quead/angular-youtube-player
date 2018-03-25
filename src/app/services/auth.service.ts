import { Injectable } from '@angular/core';
import { SharedService } from '../shared/lists.service';
// DB
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  perm: boolean;

  constructor(
    private db2: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public shared: SharedService
  ) {
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
      localStorage.clear();
      location.reload();
    }, (error) => {
      // An error happened.
      console.log('An error happened sign out');
      localStorage.removeItem('session_key');
    });
  }

  login(currentDetails: any) {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(authData => {
      this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(data => {
        if (data.length === 0) {
          // First time login create user and session
          const profile = authData.additionalUserInfo.profile;
          const defaultUser = {
            name: profile.name,
            email: profile.email,
            settings: this.shared.settings,
            session: localStorage.getItem('session_key'),
          };

          const afList = this.db2.list('users/');

          afList.set(authData.user.uid, defaultUser);
          this.initSession(currentDetails);
          location.reload();
        } else {
          // Get session and settings from logged user
          localStorage.removeItem('session_key');
          localStorage.setItem('session_key', data['2']);
          this.db2.list('sessions/' + data['2']).valueChanges().subscribe((sessionData) => {
            localStorage.removeItem('settings');
            localStorage.removeItem('playlist');
            this.shared.playlist = sessionData[3];
            this.shared.settings = data[3];
            this.shared.updateSettings();
            this.shared.updatePlaylist();
            location.reload();
          });
        }
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
        playlist: this.shared.playlist,
        details: currentDetails,
    };
    afList.set(localStorage.getItem('session_key'), defaultSession);
  }
}
