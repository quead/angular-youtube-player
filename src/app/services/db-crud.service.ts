import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class DbCrudService {

  constructor(
    private db2: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) { }

  update(section: string, title: string, value: any) {
    const sessionKey = localStorage.getItem('session_key');
    this.afAuth.auth.onAuthStateChanged((user) => {
      switch(section) {
        case 'sessions': {
          this.db2.database.ref(`${section}/${sessionKey}/${title}`).set(value);
          break;
        }
        default: {
          console.log('ERROR DB CRUD');
          break;
        }
      }
    });
  }
}
