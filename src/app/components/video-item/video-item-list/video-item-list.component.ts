import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { VideoModel } from '../../../models/video.model';
import { GlobalsService } from '../../../services/globals.service';

@Component({
  selector: 'app-video-item-list',
  templateUrl: './video-item-list.component.html',
  styleUrls: ['./video-item-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoItemListComponent implements OnInit {
	@Input() videoItem: VideoModel;
	@Input() videoIndex: number;
  @Input() listID: number;
  @Input() isPlaylist?: boolean = false;
  
  constructor(public globals: GlobalsService) { }

  ngOnInit() {
  }

}
