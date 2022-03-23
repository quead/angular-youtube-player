import { Component, Input, OnInit } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-video-item-enhanced',
  templateUrl: './video-item-enhanced.component.html',
  styleUrls: ['./video-item-enhanced.component.css'],
})
export class VideoItemEnhancedComponent implements OnInit {
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
