import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { DbCrudService } from '../../services/db-crud.service';
import { PlayerComponent } from '../../components/player/player.component';
import { VideoModel } from '../../models/video.model';
import { Event } from '@angular/router/src/events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent implements OnInit {
  @ViewChild('playlistContainer') private myScrollContainer: ElementRef;

  tempPlaylist: Array<VideoModel> = [];

  menuActive = false;

  modal = false;
  modalPlaylist = false;
  modalExportPlaylist = false;
  modalPlaylistItem: number;

  importPlaylistInput: any;
  BAG = 'playlistDrag';
  subs = new Subscription();

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public playlistCTRL: PlaylistControlService,
    public playerComp: PlayerComponent,
    private dbcrud: DbCrudService,
  ) {
    if (!this.shared.dragulaService['groups'].playlistDrag) {
      this.initDragula();
    }
  }

  ngOnInit() {
    this.globals.myScrollContainer = this.myScrollContainer;
    this.initSession();
  }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  // ---------------- Playlist settings ----------------

  initPlaylist() {
    this.playlistCTRL.fillPlaylist();
  }

  uploadPlaylist(event: Event) {
    const files = event['target'].files[0];
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();
    fr.onload = (e) => {
      this.tempPlaylist = JSON.parse(e.target['result']);
    };

    fr.readAsText(files);
  }

  removePlaylistItem(i: number) {
      this.shared.triggerNotify('Video removed');
      setTimeout(() => {
        if (i === this.globals.currentPlaylistItem) {
          this.globals.currentPlaylistItem = -1;
        }
        this.globals.playlistVideos.splice(i, 1);
        this.shared.checkPlaylist();
      }, 200);
  }

  addPlaylistItem(i: number, list: number) {
    this.playlistCTRL.addPlaylistItem(i, list);
  }

  clearSession() {
    this.globals.currentPlaylistItem = -1;
    this.globals.currentVideo = null;
    this.globals.playlistVideos = [];
    this.globals.relatedVideos = [];
    localStorage.removeItem('playlist');
  }

  exportPlaylist() {
      this.showExportPlaylistModal();
  }

  exportFilePlaylist() {
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(this.globals.playlistVideos)], {type: 'data:text/json;charset=utf8'});
      a.href = URL.createObjectURL(file);
      a.download = 'playlist.json';
      a.click();
  }

  importPlaylist() {
    this.globals.playlistVideos = this.tempPlaylist;
    this.tempPlaylist = null;
    this.shared.updatePlaylist();
    this.closeModal();
  }

  // ---------------- Init settings ----------------

  initDragula() {
    this.shared.dragulaService.createGroup('playlistDrag', {});
    this.subs.add(this.shared.dragulaService.drag(this.BAG)
        .subscribe(({ el }) => {
            this.removeClass(el, 'ex-moved');
            this.shared.checkPlaylist();
        })
    );
    this.subs.add(this.shared.dragulaService.drop(this.BAG)
        .subscribe(({ el }) => {
            this.addClass(el, 'ex-moved');
            this.shared.checkPlaylist();
        })
    );
    this.subs.add(this.shared.dragulaService.over(this.BAG)
        .subscribe(({ container }) => {
            this.addClass(container, 'ex-over');
        })
    );
    this.subs.add(this.shared.dragulaService.out(this.BAG)
        .subscribe(({ container }) => {
            this.removeClass(container, 'ex-over');
            this.shared.checkPlaylist();
        })
    );
  }


  onClickPlaylist(i: number) {
    if (i === this.globals.currentPlaylistItem) {
      this.playerComp.playPauseVideo();
    } else {
      this.playerComp.getVideo(this.globals.playlistVideos[i]);
    }
  }


  onCopyVideoItemLink(i: number, list: number) {
    this.shared.onCopyVideoItemLink(i, list);
  }

  // ---------------- Modal functions ----------------

  closeModal() {
    this.modal = false;
    this.modalPlaylist = false;
    this.modalExportPlaylist = false;
  }

  showPlaylistModal(i: number) {
    this.modal = true;
    this.modalPlaylist = true;
    this.modalPlaylistItem = i;
  }

  showExportPlaylistModal() {
    this.modal = true;
    this.modalExportPlaylist = true;
  }

  confirmModal() {
    this.removePlaylistItem(this.modalPlaylistItem);
    this.modal = false;
  }

  // ---------------- Session ----------------
  initSession() {
    this.shared.getSettings().then(() => {
        this.globals.sessionValue = localStorage.getItem('session_key');
    });
  }

  updateKey(value: string) {
      this.globals.sessionValue = value;
      localStorage.setItem('session_key', this.globals.sessionValue);
  }

  getSession() {
      this.dbcrud.getSession(this.globals.sessionValue);
      this.shared.triggerNotify('Downloading playlist from cloud...');
  }

  uploadSession() {
    const confirmBtn = confirm('Are you sure? It will overwrite the cloud session.');
    if (confirmBtn) {
        this.dbcrud.uploadSession();
        this.shared.triggerNotify('Uploading playlist to cloud...');
    }
  }

  updateSession() {
        this.dbcrud.updateSession();
        this.shared.triggerNotify('Updating playlist to cloud...');
  }

}
