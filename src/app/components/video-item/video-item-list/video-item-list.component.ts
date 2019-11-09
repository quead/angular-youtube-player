import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../../../models/video.model';
import { GlobalsService } from '../../../services/globals.service';

@Component({
	selector: 'app-video-item-list',
	templateUrl: './video-item-list.component.html',
	styleUrls: ['./video-item-list.component.scss'],
})
export class VideoItemListComponent implements OnInit {
	@Input() videoItem: VideoModel;
	@Input() videoIndex: number;
	@Input() listID: number;
	@Input() isPlaylist = false;
	@Input() size = 'medium';
	@Input() callBack = () => {};

	constructor(public globals: GlobalsService) { }

	ngOnInit() {
	}

}
