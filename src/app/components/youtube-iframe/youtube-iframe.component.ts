import { AfterContentInit, ChangeDetectionStrategy, Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { YoutubeIframeService } from '../../services/youtube-iframe.service';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'youtube-iframe',
  template: '<div id="yt-player-iframe"></div>',
  styleUrls: ['youtube-iframe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YoutubeIframeComponent implements AfterContentInit {

  constructor(
    public ytIframeService: YoutubeIframeService,
    private renderer: Renderer2,
    private shared: SharedService,
    private globals: GlobalsService
  ) {}

  ngAfterContentInit() {
    const playerID = this.shared.guid();
    const playerSize = { height: 640, width: 480 };
    const container = this.renderer.selectRootElement('#yt-player-iframe');
    this.renderer.setAttribute(container, 'id', playerID);
    this.ytIframeService.loadPlayerApi();
    this.ytIframeService.setupPlayer(
      playerID,
      playerSize,
      this.globals.currentVideo.id,
    );
  }
}
