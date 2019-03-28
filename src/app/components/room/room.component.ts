import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { GlobalsService } from '../../services/globals.service';
import { DbCrudService } from '../../services/db-crud.service';
import { SharedService } from '../../services/shared.service';
import { RoomService } from '../../services/room.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {


  modal = false;
  modalPlaylist = false;
  modalExportPlaylist = false;
  sessionKeyInput: any;

  constructor(
    private notify: NotifyService,
    private globals: GlobalsService,
    private dbcrud: DbCrudService,
    private shared: SharedService,
    private room: RoomService,
    private socket: Socket
  ) { }

  ngOnInit() {
      this.socket.on('download_playlist', (data) => {
        this.globals.playlistVideos = data[this.globals.getCurrentSession().tempSession].playlist;
        this.shared.findPlaylistItem();
      });

      this.socket.on('alert_notify', (id) => {
        // this.notify.triggerNotify(id);
        console.log(this.globals.isTempSessionActive);
        console.log(this.globals.getCurrentSession());
        switch (id) {
          case 30:
            if (this.globals.isTempSessionActive || !this.globals.isTempSessionActive && this.globals.getCurrentSession().session && this.globals.getCurrentSession().tempSession) {
              this.notify.triggerNotify(32);
            } else {
              this.notify.triggerNotify(30);
            }
          break;
          default:
        }
      });
    }

  closeModal() {
    this.modal = false;
    this.modalExportPlaylist = false;
  }

  showModal() {
    this.modal = true;
    this.modalExportPlaylist = true;
  }

  leave() {
    this.socket.emit('leave_session', this.globals.getCurrentSession().tempSession);
    this.globals.sessionValue = localStorage.getItem('session_key');
    this.sessionKeyInput = '';
    this.globals.isTempSessionActive = false;
    this.room.join();
  }

  updateKey() {
    const confirmBtn = confirm('You won`t have write rights to the session and you are not gonna lose the main session.');
    if (confirmBtn && this.sessionKeyInput) {
      this.sessionKeyInput = this.sessionKeyInput.trim();
      this.socket.emit('leave_session', this.globals.sessionValue);

      // If the session is not the same as the host
      if (this.sessionKeyInput === localStorage.getItem('session_key') || this.sessionKeyInput === '') {
        this.globals.isTempSessionActive = false;
      } else {
        this.globals.isTempSessionActive = true;
        this.globals.sessionValue = this.sessionKeyInput;
      }

      this.room.join();
      this.closeModal();
    }
  }

  updateSession() {
    this.dbcrud.updateSession('playlist', this.globals.playlistVideos);
    this.notify.triggerNotify(2);
  }
}
