import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { VideoModel } from '../../../models/video.model';
import { GlobalsService } from '../../../services/globals.service';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoItemComponent implements OnInit {
  @Input('videoItem') videoItem: VideoModel;
  @Input('videoIndex') videoIndex: number;
  @Input('listID') listID: number;

  constructor(
    public globals: GlobalsService
  ) { }

  ngOnInit() {
  }

}
