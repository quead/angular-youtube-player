import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { ButtonsComponent } from '../player/buttons/buttons.component';
import { VideoModel } from '../../models/video.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
	@ViewChild('playlistContainer', { static: true }) private myScrollContainer: ElementRef;

	tempPlaylist: Array<VideoModel> = [];

	modalActive = false;
	modalActiveClass = false;
	modalPlaylistItem: number;

	constructor(
		public shared: SharedService,
		public globals: GlobalsService,
		public buttons: ButtonsComponent,
		public playlistCTRL: PlaylistControlService
	) { }

	ngOnInit() {
		this.globals.myScrollContainer = this.myScrollContainer;
	}

	confirmClear() {
		if (confirm("Are you sure you want to clear the playlist?")) {
			this.shared.clearPlaylist();
		}
	}

	dropPlaylistItem(event: CdkDragDrop<string[]>) {
		moveItemInArray(
			this.globals.playlistVideos,
			event.previousIndex,
			event.currentIndex
		);
		this.shared.checkPlaylist();
	}

	showPlaylistModal(i: number) {
		this.modalPlaylistItem = i;
		this.shouldOpenModal(true);
	}

	confirmModal() {
		this.playlistCTRL.removePlaylistItem(this.modalPlaylistItem);
		this.shouldOpenModal(false);
	}

	shouldOpenModal(agreed: boolean) {
		if (agreed) {
			this.modalActive = true;
			setTimeout(() => {
				this.modalActiveClass = true;
			}, 100);
		} else {
			this.modalActiveClass = false;
			setTimeout(() => {
				this.modalActive = false;
			}, 100);
		}
	}
}
