import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { SessionManagerService } from './session-manager.service';
import { SharedService } from './shared.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
	providedIn: 'root'
})
export class RoomService {
	constructor(
		public globals: GlobalsService,
		private session: SessionManagerService,
		private shared: SharedService,
		private socket: Socket
	) {}

	join() {
		this.session.getSession().then(res => {
			if (res === 'OK') {
				// If session exist we can bring him in the session
				this.socket.emit('join_session', this.globals.sessionValue);
				this.shared.findPlaylistItem();
			}
		});
	}

	leave() {
		this.socket.emit('leave_session', this.globals.sessionValue);
		this.shared.findPlaylistItem();
	}
}
