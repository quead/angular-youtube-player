import { Injectable } from '@angular/core';
import { SharedService } from '../shared/lists.service';
// DB
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  itemsRef: AngularFireList<any>;

  constructor(
    private db2: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public shared: SharedService
  ) {
  }

  checkLogged() {
    this.afAuth.user.subscribe(data => {
      if (data) {
        this.shared.isLogged = true;
      } else {
        this.shared.isLogged = false;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
      localStorage.clear();
      this.shared.isLogged = false;
      // location.reload();
    }, (error) => {
      // An error happened.
      console.log('An error happened sign out');
    });
  }

  login(currentDetails: any) {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(authData => {
      console.log(authData.user.uid);
      this.itemsRef = this.db2.list('users/' + authData.user.uid);
      this.itemsRef.valueChanges().subscribe(data => {
        this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(userData => {
          if (userData.length === 0) {
            console.log('First time login');
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
          } else {
            // Get session and settings from logged user
            console.log('Normal login');
            localStorage.removeItem('session_key');
            localStorage.setItem('session_key', data['2']);
            this.shared.isAffected(true);
            // this.db2.list('sessions/' + data['2']).valueChanges().subscribe((sessionData) => {
            //   localStorage.removeItem('settings');
            //   localStorage.removeItem('playlist');
            //   this.shared.playlist = sessionData[3];
            //   this.shared.settings = data[3];
            //   this.shared.updateSettings();
            //   this.shared.updatePlaylist();
            // });
          }
          this.shared.isLogged = true;
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
        playlist: this.shared.playlist,
        details: currentDetails,
    };
    afList.set(localStorage.getItem('session_key'), defaultSession);
  }
}
