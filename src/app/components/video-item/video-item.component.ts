import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoItemComponent implements OnInit {
  // TODO
  @Input()
  videoItem!: VideoModel;
  @Input()
  videoIndex!: number;
  @Input()
  listID!: number;
  @Input() callBack = () => {};
  @Input() isPlaylist = false;
  @Input() videoType = 'list';
  @Input() size = 'medium';
  @Input() additionalClass = '';

  constructor(public globals: GlobalsService) {}

  // List ID
  // 0 - feed
  // 1 - searched
  // 2 - related
  // 3 - playlists
  // 4 - history

  // Video Types - defaults to list
  // enhanced - usually used for feed
  // list
  // grid

  // Video sizes - only for list atm
  // small
  // medium
  // large
  ngOnInit(): void {}
}
