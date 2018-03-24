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
  isLogged = false;
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
    });
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    this.afAuth.auth.signInWithPopup(provider).then(authData => {
      this.db2.list('users/' + authData.user.uid).valueChanges().subscribe(data => {
        if (data.length === 0) {
          const profile = authData.additionalUserInfo.profile;
          const defaultUser = [{
            name: profile.name,
            email: profile.email,
            playlist: this.shared.playlist,
            settings: this.shared.settings,
          }];

          const afList = this.db2.list('users/');

          afList.set(authData.user.uid, defaultUser[0]);
        }
        location.reload();
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
