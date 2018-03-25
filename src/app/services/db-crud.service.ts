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

}
