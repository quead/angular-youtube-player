import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { AuthService } from '../../services/auth.service';
import { PlayerComponent } from '../../components/player/player.component';
import { VideoModel } from '../../models/video.model';
import { Event } from '@angular/router/src/events';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  providers: [ AuthService ]
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

  sessionValue: any;
  sessionInput: any;

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public playlistCTRL: PlaylistControlService,
    public playerComp: PlayerComponent,
    private authService: AuthService,    
    private dragula: DragulaService,    
  ) { }

  ngOnInit() {
    this.globals.myScrollContainer = this.myScrollContainer;    
    this.initDragula();
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
    // localStorage.removeItem('settings');
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

  importPlaylist(input: any) {
    this.globals.playlistVideos = this.tempPlaylist;
    this.tempPlaylist = null;
    this.shared.updatePlaylist();
    this.closeModal();
  }

  // ---------------- Init settings ----------------

  initDragula() {
    this.dragula.setOptions('globals.playlist', {
      moves: (handle) => {
        return handle.className === 'video-item-settings';
      }
    });
    this.dragula.over.subscribe((value) => {
      const [el, container] = value.slice(1);
      this.addClass(container, 'ex-over');
    });
    this.dragula.out.subscribe((value) => {
      const [el, container] = value.slice(1);
      this.removeClass(container, 'ex-over');
      this.shared.checkPlaylist();
    });
    this.dragula.drop.subscribe((value) => {
      const [el, container] = value.slice(1);
      this.removeClass(container, 'ex-over');
      this.shared.checkPlaylist();
    });
  }


  onClickPlaylist(i: number) {
    if (i === this.globals.currentPlaylistItem) {
      this.playerComp.playPauseVideo();
    } else {
      this.playerComp.getVideo(this.globals.playlistVideos[i]);
    }
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


  // ---------------- Video fetching ----------------

  onClickRelated(i: number) {
    this.playerComp.getVideo(this.globals.relatedVideos[i]);
  }

  // ---------------- Session ----------------
  initSession() {
    // To fix update in realtime
    this.shared.getSettings().then(() => {
        this.sessionValue = localStorage.getItem('session_key');
    });
  }

  getSession() {
      this.authService.getSession(this.sessionValue);
      this.shared.triggerNotify('Downloaded playlist');
  }
    
  updateKey(value: string) {
      this.sessionValue = value;
      localStorage.setItem('session_key', this.sessionValue);
  }
  
  updateSession() {
      this.authService.updateSession();
      this.shared.triggerNotify('Uploaded playlist');
  }

}
