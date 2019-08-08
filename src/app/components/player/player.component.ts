import { Component, OnInit } from '@angular/core';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { GlobalsService } from '../../services/globals.service';
import { SharedService } from '../../services/shared.service';
import { NotifyService } from '../../services/notify.service';
import { RoomService } from '../../services/room.service';
import { ButtonsComponent } from './buttons/buttons.component';
import { Socket } from 'ngx-socket-io';

@Component({
	selector: 'app-component-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
	videoCurRange = 0;
	videoMaxRange = 0;

	videoRangePercent = 0;
	videoRangeMouseActive = false;
	volumeRangeMouseActive = false;
	videoRangeTimer: any;

	currentMuteState = false;
	isFullscreen = false;

	videoCurVolume = -1;

	videoCurFull = '00:00';
	videoMaxFull = '00:00';

	loading = true;

	constructor(
		public globals: GlobalsService,
		public shared: SharedService,
		public playlistCTRL: PlaylistControlService,
		private notify: NotifyService,
		private room: RoomService,
		private playerCTA: ButtonsComponent,
		private socket: Socket
	) { }

	ngOnInit() {
		// Where app is loaded
		this.shared.preventOldSettings();
		this.shared.getSettings();
		this.room.join();
		this.setDefaultPlayer();

		this.socket.on('event_trigger', data => {
			switch (data.eventName) {
				case 'playVideo':
					this.playerCTA.triggerPlayPauseVideo();
					break;
				case 'updateState':
					this.changeState({ data: data.playerData.currentState });
					break;
				case 'playNewVideo':
					this.playerCTA.triggerGetVideo(data.playerData.currentVideo);
					break;
				case 'seekTo':
					this.triggerSeekTo(data.playerData.currentSeek);
					break;
				case 'isBuffering':
					// Need a solution when is buffering for one to keep in sync
					break;
				default:
			}
		});
	}

	changeState(event: any) {
		this.globals.currentState = event.data;

		this.videoMaxRange = this.globals.player.getDuration();
		this.videoCurVolume = this.globals.player.getVolume();

		// https://developers.google.com/youtube/iframe_api_reference#Events
		switch (this.globals.currentState) {
			// Playing
			case 1:
				this.videoMaxFull = this.timeFormat(this.videoMaxRange);
				this.currentMuteState = this.globals.player.isMuted();
				this.startRange();
				break;
			// Paused
			case 2:
				this.stopRange();
				break;
			// Buffering
			case 3:
				this.socket.emit('update_player', {
					eventName: 'isBuffering',
					roomName: this.globals.sessionValue,
					playerData: {
						currentVideo: this.globals.currentVideo,
						currentState: this.globals.currentState
					}
				});
				break;
			// Ended
			case 0:
				this.stopRange();
				if (this.globals.repeatMode) {
					if (this.globals.playlistVideos.length) {
						this.shared.findPlaylistItem();
						if (this.globals.currentPlaylistItem < 0) {
							this.playPlaylistItem('next', this.globals.currentPlaylistItem);
						} else {
							this.playPlaylistItem('next', this.globals.currentPlaylistItem);
						}
						if (this.globals.playlistVideos.length === 1) {
							this.globals.player.playVideo();
						}
					} else {
						this.globals.player.playVideo();
					}
				}
				break;
			default:
		}
	}

	onStateChange(event: any) {
		if (this.globals.isTempSessionActive) {
			this.changeState(event.data);
		} else {
			this.socket.emit('update_player', {
				eventName: 'updateState',
				roomName: this.globals.sessionValue,
				playerData: {
					currentVideo: this.globals.currentVideo,
					currentState: event.data
				}
			});
		}
	}

	// Load the video when region is changed
	cueVideoWhenRegionChanged() {
		if (this.globals.player) {
			this.globals.player.cueVideoById(this.globals.currentVideo.id);
			this.videoRangePercent = 0;
		}
	}

	// Init app
	setDefaultPlayer() {
		this.shared.initFeed().then(() => {
			this.globals.currentVideo = this.globals.feedVideos[0];
			this.globals.shareLink =
				'https://youtu.be/' + this.globals.currentVideo['id'];
			this.globals.isFeedLoading = false;
			this.shared.getRelatedVideos().then(() => {
				this.loading = false;
				this.globals.isLoading = false;
			});
			this.shared.findPlaylistItem();
			this.cueVideoWhenRegionChanged();
		});
		this.shared.setLocalVersion();
	}

	// ---------------- Player controls ----------------

	rangeNouseDown() {
		this.videoRangeMouseActive = true;
		this.stopRange();
	}

	rangeMouseMove(value: number) {
		if (this.videoRangeMouseActive) {
			this.videoCurRange = value;
			this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
			this.videoCurFull = this.timeFormat(this.videoCurRange);
		}
	}

	rangeMouseUp(value: number) {
		if (this.globals.isTempSessionActive) {
			this.triggerSeekTo(value);
		} else {
			this.socket.emit('update_player', {
				eventName: 'seekTo',
				roomName: this.globals.sessionValue,
				playerData: {
					currentVideo: this.globals.currentVideo,
					currentState: this.globals.currentState,
					currentSeek: value
				}
			});
		}
	}

	triggerSeekTo(value: number) {
		if (this.globals.currentState !== -1 && this.globals.currentState !== 1) {
			this.globals.player.playVideo();
		}
		if (this.globals.currentState === 1) {
			this.startRange();
		} else {
			this.stopRange();
		}

		this.videoCurRange = value;
		this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
		this.videoCurFull = this.timeFormat(this.videoCurRange);

		this.globals.player.seekTo(this.videoCurRange, true);
		this.videoRangeMouseActive = false;
	}

	volumeRangeMouseMove() {
		if (this.volumeRangeMouseActive) {
			if (this.currentMuteState) {
				this.globals.player.unMute();
				this.currentMuteState = false;
			}
		}
	}

	volumeRangeMouseUp(value: number) {
		if (this.currentMuteState) {
			this.globals.player.unMute();
			this.currentMuteState = false;
		}
		this.globals.player.setVolume(value);
	}

	checkVolumeRange() {
		if (this.globals.currentState !== -1) {
			this.currentMuteState = this.globals.player.isMuted();
			this.videoCurVolume = this.globals.player.getVolume();
		}
	}

	startRange() {
		this.stopRange();
		if (this.globals.currentState) {
			this.videoRangeTimer = setInterval(() => {
				this.videoCurRange = this.globals.player.getCurrentTime();
				this.videoCurFull = this.timeFormat(this.videoCurRange);
				this.videoRangePercent =
					(this.videoCurRange / this.videoMaxRange) * 100;
			}, 1000);
		}
	}

	stopRange() {
		clearInterval(this.videoRangeTimer);
	}

	playPlaylistItem(direction: string, i: number) {
		if (direction === 'next') {
			if (i < this.globals.playlistVideos.length) {
				i += 1;
			}
			if (i === this.globals.playlistVideos.length) {
				i = 0;
			}
		}
		if (direction === 'prev') {
			if (i === 0 || i < 0) {
				i = this.globals.playlistVideos.length - 1;
			} else {
				i -= 1;
			}
		}
		if (this.globals.playlistVideos.length > 0) {
			this.playerCTA.getVideo(this.globals.playlistVideos[i]);
		} else {
			this.notify.triggerNotify(0);
		}
	}

	timeFormat(time: number) {
		const hours: number = Math.floor(time / 3600);
		const minutes: number = Math.round((time % 3600) / 60);
		const seconds: number = Math.round((time % 3600) % 60);
		const value = `${
			hours > 0 ? (hours < 10 ? '0' : '') + hours + ':' : ''
			}${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') +
			seconds}`;
		return value;
	}

	toggleMute() {
		if (this.currentMuteState) {
			this.globals.player.unMute();
			this.currentMuteState = false;
		} else {
			this.globals.player.mute();
			this.currentMuteState = true;
		}
	}

	toggleFullscreen() {
		this.isFullscreen = !this.isFullscreen;
	}
}
