import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { NotifyService } from './notify.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SessionManagerService {
  constructor(
    public globals: GlobalsService,
    private notify: NotifyService,
    private socket: Socket
  ) {}

  checkSession() {
    return new Promise((resolve) => {
      this.socket.emit(
        'get_session',
        { session: localStorage.getItem('session_key') },
        (dataGet: { status: string }) => {
          if (dataGet.status === 'SESSION_NOT_FOUND') {
            this.socket.emit(
              'get_session',
              '',
              (dataSet: { session: string }) => {
                localStorage.setItem('session_key', dataSet.session);
                this.globals.sessionValue = dataSet.session;
                resolve(true);
              }
            );
          } else {
            // TODO
            this.globals.sessionValue = localStorage.getItem('session_key')!;
            resolve(true);
          }
        }
      );
    });
  }

  updateSession(row: string, data: any) {
    // If is temporary session to don't update the cloud
    if (!this.globals.isTempSessionActive) {
      this.updateCurrentSession(row, data);
    }
  }

  updateCurrentSession(row: string, data: any) {
    this.socket.emit(
      'update_session',
      {
        session: this.globals.sessionValue,
        row: row,
        data: data,
      },
      (updatedData: { status: any }) => {
        switch (updatedData.status) {
          case 'SESSION_UPDATED':
            this.socket.emit(
              'update_playlist',
              this.globals.getCurrentSessionKeys().tempSession
            );
            this.notify.triggerNotify(5);
            break;
          case 'SESSION_NOT_UPDATED':
            this.notify.triggerNotify(6);
            break;
          default:
        }
      }
    );
  }

  getSession() {
    return new Promise((resolve) => {
      if (this.globals.isTempSessionActive) {
        this.getCurrentSession().then((res) => {
          resolve(res);
        });
      } else {
        this.checkSession().then(() => {
          this.getCurrentSession().then((res) => {
            resolve(res);
          });
        });
      }
    });
  }

  getCurrentSession() {
    return new Promise((resolve) => {
      this.socket.emit(
        'get_session',
        {
          session: this.globals.sessionValue,
        },
        (data: { session: { [x: string]: any }; status: any }) => {
          const sessionData = data.session[this.globals.sessionValue];
          if (typeof sessionData === 'object') {
            this.globals.playlistVideos = sessionData.playlist;
            this.globals.loadingState.playlist = false;
            this.notify.triggerNotify(7);
          }
          switch (data.status) {
            case 'SESSION_NOT_FOUND':
              this.notify.triggerNotify(8);
              resolve('ERROR');
              break;
            case 'SESSION_NEW':
              console.log('interesting case... let`s see what`s going on');
              break;
            case 'SESSION_OK':
              resolve('OK');
              break;
            default:
          }
        }
      );
    });
  }
}
