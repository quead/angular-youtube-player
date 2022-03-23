import { Component, Input, OnInit } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-video-item-list',
  templateUrl: './video-item-list.component.html',
  styleUrls: ['./video-item-list.component.css'],
})
export class VideoItemListComponent implements OnInit {
  @Input()
  videoItem!: VideoModel;
  @Input()
  videoIndex!: number;
  @Input()
  listID!: number;
  @Input() isPlaylist = false;
  @Input() size = 'medium';
  @Input() callBack = () => {};

  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {}
}
