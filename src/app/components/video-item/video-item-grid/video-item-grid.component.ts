import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { VideoModel } from '../../../models/video.model';
import { GlobalsService } from '../../../services/globals.service';

@Component({
	selector: 'app-video-item-grid',
	templateUrl: './video-item-grid.component.html',
	styleUrls: ['./video-item-grid.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class VideoItemGridComponent implements OnInit {
	@Input() videoItem: VideoModel;
	@Input() videoIndex: number;
	@Input() listID: number;

	constructor(public globals: GlobalsService) { }

	ngOnInit() {
	}

}
