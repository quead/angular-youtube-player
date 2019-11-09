import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';
import { SharedService } from '../../../services/shared.service';
import { ModalService } from '../../../services/modal.service';
import { PlaylistControlService } from '../../../services/playlist-control.service';
import { Socket } from 'ngx-socket-io';
import { VideoModel } from '../../../models/video.model';

@Component({
	selector: 'app-buttons',
	templateUrl: './buttons.component.html',
	styleUrls: ['./buttons.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ButtonsComponent implements OnInit {
	@Input() listID: number;
	@Input() videoIndex: number;
	@Input() isPlaylist = false;
	@Input() callBack = () => {};

	constructor(
		public globals: GlobalsService,
		public shared: SharedService,
		public modal: ModalService,
		private playlistCTRL: PlaylistControlService,
		private socket: Socket
	) { }

	ngOnInit() { }

	isThisVideoCurrent(videoIndex: number, listID: number) {
		if (this.globals.currentVideo) {
			return (this.globals.currentVideo.id === this.shared.getVideoFromList(videoIndex, listID)['id']);
		} else {
			return false;
		}
	}

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
	}

	onClickVideo(i: number, list: number) {
		if (
			this.globals.currentVideo.id === this.shared.getVideoFromList(i, list).id
		) {
			this.playPauseVideo();
		} else {
			this.getVideo(this.shared.getVideoFromList(i, list));
		}
		this.callBack();
	}

	onAddToPlaylist(videoIndex: number, listID: number) {
		this.playlistCTRL.addPlaylistItem(videoIndex, listID);
		this.callBack();
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

	showPlaylistModal(videoIndex: number) {
		this.globals.modalPlaylistItem = videoIndex;
		this.modal.open('playlist-modal');
	}

	playVideo(data: VideoModel) {
		this.shared.addHistoryVideo(data);
		this.globals.player.loadVideoById(data.id);
		this.shared.findPlaylistItem();
	}
}
