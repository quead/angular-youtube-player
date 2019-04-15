import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { PlayerComponent } from '../../components/player/player.component';
import { NotifyService } from '../../services/notify.service';
import { ButtonsComponent } from '../player/buttons/buttons.component';
import { VideoModel } from '../../models/video.model';
import { Subscription } from 'rxjs/Subscription';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
  }

  @ViewChild('playlistContainer') private myScrollContainer: ElementRef;

  tempPlaylist: Array<VideoModel> = [];

  modal = false;
  modalPlaylist = false;
  modalPlaylistItem: number;

  BAG = 'playlistDrag';
  subs = new Subscription();

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public playlistCTRL: PlaylistControlService,
    public playerComp: PlayerComponent,
    public buttons: ButtonsComponent,
    private notify: NotifyService
  ) {
    if (!this.shared.dragulaService['groups'].playlistDrag) {
      this.initDragula();
    }
  }

  ngOnInit() {
    this.globals.myScrollContainer = this.myScrollContainer;
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

  // ---------------- Init settings ----------------

  initDragula() {
    this.shared.dragulaService.createGroup('playlistDrag', {});
    this.subs.add(this.shared.dragulaService.drag(this.BAG)
        .subscribe(({ el }) => {
            this.removeClass(el, 'ex-moved');
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
        })
    );
  }

  // ---------------- Modal functions ----------------

  closeModal() {
    this.modal = false;
    this.modalPlaylist = false;
  }

  showPlaylistModal(i: number) {
    this.modal = true;
    this.modalPlaylist = true;
    this.modalPlaylistItem = i;
  }

  confirmModal() {
    this.playlistCTRL.removePlaylistItem(this.modalPlaylistItem);
    this.modal = false;
  }

}
