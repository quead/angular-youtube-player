import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { ModalService } from '../../services/modal.service';
import { ButtonsComponent } from '../player/buttons/buttons.component';
import { VideoModel } from '../../models/video.model';

@Component({
	selector: 'app-playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
	@ViewChild('playlistContainer', { static: true }) private myScrollContainer: ElementRef;

	modalID = 'playlist-modal';

	constructor(
		public shared: SharedService,
		public globals: GlobalsService,
		public buttons: ButtonsComponent,
		public playlistCTRL: PlaylistControlService,
		public modal: ModalService
	) { }

	ngOnInit() {
		this.globals.myScrollContainer = this.myScrollContainer;
	}

	confirmClear() {
		if (confirm('Are you sure you want to clear the playlist?')) {
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

	confirmModal() {
		this.playlistCTRL.removePlaylistItem(this.globals.modalPlaylistItem);
		this.modal.close(this.modalID);
	}
}
