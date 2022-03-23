import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-video-item-grid',
  templateUrl: './video-item-grid.component.html',
  styleUrls: ['./video-item-grid.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoItemGridComponent implements OnInit {
  @Input()
  videoItem!: VideoModel;
  @Input()
  videoIndex!: number;
  @Input()
  listID!: number;
  @Input() callBack = () => {};

  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {}
}
