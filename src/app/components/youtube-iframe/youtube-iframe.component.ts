import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { SharedService } from 'src/app/services/shared.service';
import { YoutubeIframeService } from 'src/app/services/youtube-iframe.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'youtube-iframe',
  template: '<div id="yt-player-iframe"></div>',
  styleUrls: ['youtube-iframe.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class YoutubeIframeComponent implements OnInit {
  constructor(
    public ytIframeService: YoutubeIframeService,
    private renderer: Renderer2,
    private shared: SharedService,
    private globals: GlobalsService
  ) {}

  ngOnInit(): void {
    const playerID = this.shared.guid();
    const playerSize = { height: 640, width: 480 };
    const container = this.renderer.selectRootElement('#yt-player-iframe');
    this.renderer.setAttribute(container, 'id', playerID);
    this.ytIframeService.loadPlayerApi();
    this.ytIframeService.setupPlayer(
      playerID,
      playerSize,
      this.globals.currentVideo.id
    );
  }
}
