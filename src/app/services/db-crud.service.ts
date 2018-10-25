import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class DbCrudService {

  constructor(
    private db2: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) { }

  update(section: string, title: string, value: any) {
    const sessionKey = localStorage.getItem('session_key');
    this.afAuth.auth.onAuthStateChanged((user) => {
      switch (section) {
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
