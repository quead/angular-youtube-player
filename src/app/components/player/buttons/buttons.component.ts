import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { SharedService } from '../../../services/shared.service';
import { PlaylistControlService } from '../../../services/playlist-control.service';
import { Socket } from 'ngx-socket-io';
import { VideoModel } from '../../../models/video.model';

@Component({
	selector: 'app-buttons',
	templateUrl: './buttons.component.html'
})
export class ButtonsComponent implements OnInit {
	@Input() listID: number;
	@Input() videoIndex: number;

	constructor(
		public globals: GlobalsService,
		public shared: SharedService,
		private playlistCTRL: PlaylistControlService,
		private socket: Socket
	) {}

	ngOnInit() {}

	triggerPlayPauseVideo() {
		if (this.globals.currentState === 1) {
			this.globals.player.pauseVideo();
		} else {
			this.globals.player.playVideo();
		}
	}

	playPauseVideo() {
		if (this.globals.isTempSessionActive) {
			this.triggerPlayPauseVideo();
		} else {
			this.socket.emit('update_player', {
				eventName: 'playVideo',
				roomName: this.globals.sessionValue,
				playerData: {
					currentVideo: this.globals.currentVideo,
					currentState: this.globals.currentState
				}
			});
		}
		this.globals.searchOverlay = false;
	}

	onClickVideo(i: number, list: number) {
		if (
			this.globals.currentVideo.id === this.shared.getVideoFromList(i, list).id
		) {
			this.playPauseVideo();
		} else {
			this.getVideo(this.shared.getVideoFromList(i, list));
		}
		this.globals.searchOverlay = false;
	}

	getVideo(data: VideoModel) {
		if (this.globals.isTempSessionActive) {
			this.triggerGetVideo(data);
		} else {
			this.socket.emit('update_player', {
				eventName: 'playNewVideo',
				roomName: this.globals.sessionValue,
				playerData: {
					currentVideo: data,
					currentState: this.globals.currentState
				}
			});
		}
	}

	triggerGetVideo(data: VideoModel) {
		this.shared.getStatsVideos(data.id).then(() => {
			this.playVideo(data);
			this.shared.getRelatedVideos();
		});
	}

	playVideo(data: VideoModel) {
		this.shared.addHistoryVideo(data);
		this.globals.player.loadVideoById(data.id);
		this.shared.findPlaylistItem();
	}
}
