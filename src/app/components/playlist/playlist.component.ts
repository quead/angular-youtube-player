import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GlobalsService } from 'src/app/services/globals.service';
import { ModalService } from 'src/app/services/modal.service';
import { PlaylistControlService } from 'src/app/services/playlist-control.service';
import { SharedService } from 'src/app/services/shared.service';
import { ButtonsComponent } from '../player/buttons/buttons.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  @ViewChild('playlistContainer', { static: true })
  private myScrollContainer!: ElementRef;

  modalID = 'playlist-modal';

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public buttons: ButtonsComponent,
    public playlistCTRL: PlaylistControlService,
    public modal: ModalService
  ) {}

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
