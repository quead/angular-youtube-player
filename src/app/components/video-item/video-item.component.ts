import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { VideoModel } from '../../models/video.model';
import { GlobalsService } from '../../services/globals.service';

@Component({
	selector: 'app-video-item',
	templateUrl: './video-item.component.html',
	styleUrls: ['./video-item.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class VideoItemComponent implements OnInit {
	@Input() videoItem: VideoModel;
	@Input() videoIndex: number;
	@Input() videoType?: string = "list";
	@Input() listID: number;
	@Input() additionalClass?: string = "";

	constructor(public globals: GlobalsService) { }

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
	ngOnInit() {}
}
