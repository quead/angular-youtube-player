import { Injectable } from '@angular/core';
import { GlobalsService } from '../services/globals.service';
// DB
import { VideoModel } from '../models/video.model';
import * as io from 'socket.io-client';
const socket = io('http://localhost:8888');

@Injectable()
export class DbCrudService {

    constructor(
        public globals: GlobalsService,
    ) {
    }

    async checkSession() {
        if (localStorage.getItem('session_key')) {
            socket.emit('get_session', {session: localStorage.getItem('session_key')}, (dataGet) => {
                if (dataGet.status === 'SESSION_NOT_FOUND') {
                    socket.emit('get_session', '', (dataSet) => {
                        localStorage.setItem('session_key', dataSet.session);
                        this.globals.sessionValue = dataSet.session;
                        console.log(dataSet.status);
                    });
                } else {
                    this.globals.sessionValue = localStorage.getItem('session_key');
                    console.log(this.globals.sessionValue);
                }
                console.log(dataGet.status);
            });
        } else {
            socket.emit('get_session', '', (dataSet) => {
                localStorage.setItem('session_key', dataSet.session);
                this.globals.sessionValue = dataSet.session;
                console.log(dataSet.status);
            });
        }
    }

    updateSession(row: string, data: any) {
        this.checkSession().then(() => {
            socket.emit('update_session', {
                session: localStorage.getItem('session_key'),
                row: row,
                data: data
            }, (updatedData) => {
                console.log(updatedData.status);
            });
        });
        // socket.emit('update_session')
        // this.db2.object(`sessions/${localStorage.getItem('session_key')}`).update({playlist: this.globals.playlistVideos}).then(() => {
        //     this.shared.triggerNotify('Cloud playlist was updated.');
        // }).catch(() => {
        //     this.shared.triggerNotify('Cloud playlist cannot be updated.');
        // });
    }

    uploadSession() {
        console.log('upload session');
        // const afList = this.db2.list('sessions/');
        // const defaultSession = {
        //   currentState: -1,
        //   currentSeek: 0,
        //   playlist: this.globals.playlistVideos,
        //   details: this.globals.currentVideo,
        // };
        // afList.set(localStorage.getItem('session_key'), defaultSession).then(() => {
        //     this.shared.triggerNotify('Cloud playlist was updated');
        // }).catch(() => {
        //     this.shared.triggerNotify('Uploading playlist error');
        // });
    }

    downloadSession() {
        socket.emit('get_session', {
            session: this.globals.sessionValue
        }, (data) => {
            const sessionData = data.session[this.globals.sessionValue];
            this.globals.settings = sessionData.settings;
            this.globals.playlistVideos = sessionData.playlist;
        });

        // this.db2.list(`sessions/${sessionKey}/playlist`).valueChanges().subscribe((sessionData: Array<VideoModel>) => {
        //     if (sessionData.length > 0) {
        //         this.globals.playlistVideos = sessionData;
        //         this.shared.updatePlaylist();
        //         this.shared.checkPlaylist();
        //         this.shared.triggerNotify('We updated your playlist...');
        //     } else {
        //         this.shared.triggerNotify('Cloud playlist is empty, your local playlist won`t be affected...');
        //     }
        // });
    }
}
