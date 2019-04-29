import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { SessionManagerService } from './session-manager.service';
import { SharedService } from './shared.service';
import { Socket } from 'ngx-socket-io';
import { NotifyService } from './notify.service';

@Injectable({
	providedIn: 'root'
})
export class RoomService {
	constructor(
		public globals: GlobalsService,
		private session: SessionManagerService,
		private shared: SharedService,
		private notify: NotifyService,
		private socket: Socket
	) {}

	join() {
		this.session.getSession().then(res => {
			if (res === 'OK') {
				// If session exist we can bring him in the session
				this.socket.emit('join_session', {session: this.globals.sessionValue, name: localStorage.getItem('clientName')}, ({client, status}) => {
					switch(status) {
						case 'USERNAME_EXIST':
						console.log('you joined with used name');
						case 'USERNAME_EMPTY':
						console.log('you joined with empty name');
						case 'USERNAME_OK':
						this.shared.updateClientName(client.name);
						default:
						break;
					}
				});
				this.shared.findPlaylistItem();
			}
		});
	}

	leave() {
		this.socket.emit('leave_session', this.globals.sessionValue);
		this.shared.findPlaylistItem();
	}
}
