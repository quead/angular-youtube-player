import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { GlobalsService } from '../../services/globals.service';
import { SessionManagerService } from '../../services/session-manager.service';
import { SharedService } from '../../services/shared.service';
import { RoomService } from '../../services/room.service';
import { Socket } from 'ngx-socket-io';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RoomComponent implements OnInit {
	modal = false;
	modalRoom = false;
	sessionKeyInput: any;
	clientNameInput: any;

	constructor(
		private notify: NotifyService,
		public globals: GlobalsService,
		private session: SessionManagerService,
		private shared: SharedService,
		public room: RoomService,
		private socket: Socket
	) {}

	ngOnInit() {
		this.socket.on('download_playlist', data => {
			this.globals.playlistVideos =
				data[this.globals.getCurrentSessionKeys().tempSession].playlist;
			this.shared.findPlaylistItem();
		});

		this.socket.on('alert_notify', id => {
			console.log('Join / leave notify not working atm');
		});
	}

	closeModal() {
		this.modal = false;
		this.modalRoom = false;
	}

	showModal() {
		this.modal = true;
		this.modalRoom = true;
	}

	leave() {
		this.socket.emit(
			'leave_session',
			this.globals.getCurrentSessionKeys().tempSession
		);
		this.globals.sessionValue = localStorage.getItem('session_key');
		this.sessionKeyInput = '';
		this.globals.isTempSessionActive = false;
		this.room.join();
	}

	updateKey() {
		if (this.sessionKeyInput) {
			this.sessionKeyInput = this.sessionKeyInput.trim();
			this.room.leave();

			// If the session is not the same as the host
			if (
				this.sessionKeyInput === localStorage.getItem('session_key') ||
				this.sessionKeyInput === ''
			) {
				this.globals.isTempSessionActive = false;
			} else {
				this.globals.isTempSessionActive = true;
				this.globals.sessionValue = this.sessionKeyInput;
			}

			this.room.join();
			this.closeModal();
			this.notify.triggerNotify(34);
		}
		if (this.clientNameInput) {
			this.clientNameInput = this.clientNameInput.trim();
			this.socket.emit('change_username', {name: this.clientNameInput}, ({data, status}) => {
				if (status === 'USERNAME_OK') {
					this.shared.updateClientName(data.name);
					this.notify.triggerNotify(37);
				} else {
					this.notify.triggerNotify(38);
				}
				this.clientNameInput = '';
				this.closeModal();
			});
			
		}
	}

	updateSession() {
		this.session.updateSession('playlist', this.globals.playlistVideos);
		this.notify.triggerNotify(2);
	}
}
