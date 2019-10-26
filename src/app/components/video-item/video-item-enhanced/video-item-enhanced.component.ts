import { Component, OnInit, Input } from '@angular/core';
import { VideoModel } from '../../../models/video.model';
import { GlobalsService } from '../../../services/globals.service';

@Component({
	selector: 'app-video-item-enhanced',
	templateUrl: './video-item-enhanced.component.html',
	styleUrls: ['./video-item-enhanced.component.scss'],
})
export class VideoItemEnhancedComponent implements OnInit {
	@Input() videoItem: VideoModel;
	@Input() videoIndex: number;
	@Input() listID: number;

	constructor(public globals: GlobalsService) { }

	ngOnInit() {
	}

}
