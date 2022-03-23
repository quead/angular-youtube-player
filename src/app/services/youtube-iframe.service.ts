import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { PlayerComponent } from '../components/player/player.component';
import { GlobalsService } from './globals.service';

const win: any = window;
export const YTPlayer = () => {
  return win['YT'];
};

@Injectable({
  providedIn: 'root',
})
export class YoutubeIframeService {
  api: ReplaySubject<any>;

  apiLoaded = false;

  constructor(
    private playerComp: PlayerComponent,
    public globals: GlobalsService
  ) {
    this.api = new ReplaySubject(1);
    this.createApi();
  }

  loadPlayerApi() {
    if (!this.apiLoaded) {
      this.apiLoaded = true;
      const playerApiScript = win.document.createElement('script');
      playerApiScript.type = 'text/javascript';
      playerApiScript.src = `https://www.youtube.com/iframe_api`;
      win.document.body.appendChild(playerApiScript);
    }
  }

  setupPlayer(playerID: string, sizes: any, videoId: string) {
    const options = {
      enablejsapi: 1,
      playsinline: 1,
      autoplay: 0,
      loop: 0,
      modestbranding: 1,
      rel: 0,
    };
    const createPlayer = () => {
      if (YTPlayer().Player) {
        this.createPlayer(playerID, sizes, videoId, options);
      }
    };
    this.api.subscribe(createPlayer);
  }

  createPlayer(
    playerID: string,
    sizes: any,
    videoId: string,
    options: any = {}
  ) {
    const playerSize = {
      height: sizes.height,
      width: sizes.width,
    };
    const player = YTPlayer().Player;
    return new player(playerID, {
      ...playerSize,
      events: {
        onReady: (event: any) => {
          this.globals.player = event.target;
        },
        onStateChange: (event: any) => {
          this.playerComp.onStateChange(event);
        },
      },
      options,
      videoId,
    });
  }

  createApi() {
    const onYouTubeIframeAPIReady = () => {
      if (win) {
        this.api.next(YTPlayer());
      }
    };
    win['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;
  }
}
