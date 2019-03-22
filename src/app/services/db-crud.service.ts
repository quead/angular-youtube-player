import { Injectable } from '@angular/core';
import { GlobalsService } from '../services/globals.service';
import { NotifyService } from '../services/notify.service';
// DB
import { VideoModel } from '../models/video.model';
import * as io from 'socket.io-client';
const socket = io('http://localhost:8888');

@Injectable()
export class DbCrudService {

    constructor(
        public globals: GlobalsService,
        private notify: NotifyService
    ) {
    }

    checkSession() {
        return new Promise(resolve => {
            socket.emit('get_session', {session: localStorage.getItem('session_key')}, (dataGet) => {
                if (dataGet.status === 'SESSION_NOT_FOUND') {
                    socket.emit('get_session', '', (dataSet) => {
                        localStorage.setItem('session_key', dataSet.session);
                        this.globals.sessionValue = dataSet.session;
                        resolve();
                    });
                } else {
                    this.globals.sessionValue = localStorage.getItem('session_key');
                    resolve();
                }
            });
        });
    }

    updateSession(row: string, data: any) {
        // If is temporary session to don't update the cloud
        if (!this.globals.isTempSessionActive) {
            this.checkSession().then(() => {
                this.updateCurrentSession(row, data);
            });
        }
    }

    updateCurrentSession(row: string, data: any) {
        this.checkSession().then(() => {
            socket.emit('update_session', {
                session: this.globals.sessionValue,
                row: row,
                data: data
            }, (updatedData) => {
                switch (updatedData.status) {
                    case 'SESSION_UPDATED':
                        this.notify.triggerNotify(5);
                    break;
                    case 'SESSION_NOT_UPDATED':
                        this.notify.triggerNotify(6);
                    break;
                    default:
                }
            });
        });
    }


    getSession() {
        if (this.globals.isTempSessionActive) {
            this.getCurrentSession();
        } else {
            this.checkSession().then(() => {
                this.getCurrentSession();
            });
        }
    }
    
    getCurrentSession() {
        socket.emit('get_session', {
            session: this.globals.sessionValue
        }, (data) => {
            const sessionData = data.session[this.globals.sessionValue];
            if (typeof sessionData == 'object') {
                this.globals.playlistVideos = sessionData.playlist;
            }
            switch (data.status) {
                case 'SESSION_NOT_FOUND':
                    this.notify.triggerNotify(8);
                break;
                default:
            }
        });
    }
}
