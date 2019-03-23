import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { DbCrudService } from './db-crud.service'
import * as io from 'socket.io-client';
const socket = io('http://localhost:8888');

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    public globals: GlobalsService,
    private dbcrud: DbCrudService
  ) { }

  join() {
    this.dbcrud.getSession().then((res) => {
      if (res === 'OK') {
        // If session exist we can bring him in the session
        socket.emit('join_session', this.globals.sessionValue);
      }
    });
  }
}
