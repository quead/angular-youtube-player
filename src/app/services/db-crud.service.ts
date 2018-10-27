import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { GlobalsService } from '../services/globals.service';
// DB
import { AngularFireDatabase } from '@angular/fire/database';
import { VideoModel } from '../models/video.model';

@Injectable()
export class DbCrudService {

    constructor(
        private db2: AngularFireDatabase,
        public shared: SharedService,
        public globals: GlobalsService,
    ) {
    }

    updateSession() {
        this.db2.object(`sessions/${localStorage.getItem('session_key')}`).update({playlist: this.globals.playlistVideos}).then(() => {
            this.shared.triggerNotify('Cloud playlist was updated.');
        }).catch(() => {
            this.shared.triggerNotify('Cloud playlist cannot be updated.');
        });
    }

    uploadSession() {
        const afList = this.db2.list('sessions/');
        const defaultSession = {
          currentState: -1,
          currentSeek: 0,
          playlist: this.globals.playlistVideos,
          details: this.globals.currentVideo,
        };
        afList.set(localStorage.getItem('session_key'), defaultSession).then(() => {
            this.shared.triggerNotify('Cloud playlist was updated');
        }).catch(() => {
            this.shared.triggerNotify('Uploading playlist error');
        });
    }

    getSession(sessionKey: string) {
        this.db2.list(`sessions/${sessionKey}/playlist`).valueChanges().subscribe((sessionData: Array<VideoModel>) => {
            if (sessionData.length > 0) {
                this.globals.playlistVideos = sessionData;
                this.shared.updatePlaylist();
                this.shared.checkPlaylist();
                this.shared.triggerNotify('We updated your playlist...');
            } else {
                this.shared.triggerNotify('Cloud playlist is empty, your local playlist won`t be affected...');
            }
        });
    }
}
