import { Component, ElementRef, ViewChild, OnInit, HostListener } from '@angular/core';
import { YoutubeGetVideo } from '../../services/youtube.service';

import { GlobalsService } from '../../services/globals.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-component-player',
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit {
  @ViewChild('playlistContainer') private myScrollContainer: ElementRef;
  @ViewChild('videoItemIDvalue') private videoItemIDvalue: ElementRef;

  player: YT.Player;

  videoCurRange = 0;
  videoMaxRange = 0;

  videoRangePercent = 0;
  videoRangeMouseActive = false;
  volumeRangeMouseActive = false;
  videoRangeTimer: any;

  currentMuteState = false;
  playlistPrefill = true;  

  currentState = -1;
  videoCurVolume = -1;

  videoCurFull = '00:00:00';
  videoMaxFull = '00:00:00';

  shareLink = '';  

  constructor(
    public globals: GlobalsService,
    public shared: SharedService,
    private youtube: YoutubeGetVideo
  ) { }

  ngOnInit() {
    this.setDefaultPlayer();    
  }

  // ---------------- Init player ----------------  

  savePlayer(player) {
    this.player = player;
  }

  playerVars() {
    const playerVars = {
      'enablejsapi': 1,
      'controls': 1,
      'disablekb': 0,
      'showinfo': 0,
      'playsinline': 1,
      'autoplay': 0,
      'loop': 0,
      'origin': 'http://google.com',
      'rel': 0
    };
    return playerVars;
  }

  setDefaultPlayer() {
    this.shared.getSettings().then(() => {
      this.shared.initFeed().then(() => {
        this.initPlayer();
      });
    });
  }

  initPlayer() {
    this.globals.currentVideo = this.globals.feedVideos[0];
    this.globals.isLoadingPlayer = false;    
    this.globals.shareLink = 'https://youtu.be/' + this.globals.currentVideo['id'];
    this.getRelatedVideos();
    this.shared.findPlaylistItem();
  }

  onStateChange(event: any) {
    this.currentState = event.data;
    this.videoMaxRange = this.player.getDuration();
    this.videoCurVolume = this.player.getVolume();

    if (this.currentState === 1) {
      this.videoMaxFull = this.timeFormat(this.videoMaxRange);
      this.currentMuteState = this.player.isMuted();
      this.startRange();
    } else {
      this.stopRange();
    }

    if (this.currentState === 0) {
      this.stopRange();
      if (this.globals.repeatMode) {
        if (this.globals.playlistVideos.length) {
          this.shared.findPlaylistItem();
          if (this.globals.currentPlaylistItem < 0) {
            this.playPlaylistItem('next', this.globals.currentPlaylistItem);
          } else {
            this.playPlaylistItem('next', this.globals.currentPlaylistItem);
          }
          if (this.globals.playlistVideos.length === 1) {
            this.player.playVideo();
          }
        } else {
          this.player.playVideo();
        }
      }
    }
  }

  startRange() {
    this.stopRange();
    if (this.currentState) {
      this.videoRangeTimer = setInterval(() => {
        this.videoCurRange = this.player.getCurrentTime();
        this.videoCurFull = this.timeFormat(this.videoCurRange);
        this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
      }, 1000);
    }
  }

  stopRange() {
     clearInterval(this.videoRangeTimer);
  }

  toggleHeadSettings(int: number) {
    if (int === 2) {
      if (this.currentMuteState) {
        this.player.unMute();
        this.currentMuteState = false;
      } else {
        this.player.mute();
        this.currentMuteState = true;
      }
    }
  }

  playPlaylistItem(direction: string, i: number) {
    if (direction === 'next') {
      if (i < this.globals.playlistVideos.length) {
        i += 1;
      }
      if (i === this.globals.playlistVideos.length) {
        i = 0;
      }
    }
    if (direction === 'prev') {
      if (i === 0 || i < 0) {
        i = this.globals.playlistVideos.length - 1;
      } else {
        i -= 1;
      }
    }
    if (this.globals.playlistVideos.length > 0) {
      this.getVideo(this.globals.playlistVideos[i]);
    } else {
      this.shared.triggerNotify('Playlist is empty');
    }
  }

  playVideo(data: any) {
    if (data.id !== this.globals.currentVideo['id'] || this.currentState === -1) {
      this.globals.currentVideo = data;
      console.log(this.player);
      this.player.loadVideoById(this.globals.currentVideo.id)
      this.shared.addHistoryVideo(this.globals.currentVideo);
      this.getRelatedVideos();
      this.shared.findPlaylistItem();
    }
  }

  onClickRelated(event: Event, i: number) {
    this.getVideo(this.globals.relatedVideos[i]);
  }

  onClickPlaylist(event: Event, i: number) {
    if (i === this.globals.currentPlaylistItem) {
      this.playPauseVideo();
    } else {
      this.getVideo(this.globals.playlistVideos[i]);
    }
  }


  removePlaylistItem(i: number) {
    this.shared.triggerNotify('Video removed');
    setTimeout(() => {
      if (i === this.globals.currentPlaylistItem) {
        this.globals.currentPlaylistItem = -1;
      }
      this.globals.playlistVideos.splice(i, 1);
      this.shared.checkPlaylist();
    }, 200);
}

addPlaylistItem(i: number, list: number) {
    let listType;
    if (list === 0) {
      listType = this.globals.feedVideos[i];
    }
    if (list === 1) {
      listType = this.globals.lastSearchedVideos[i];
    }
    if (list === 2) {
      listType = this.globals.relatedVideos[i];
    }
    if (list === 3) {
      listType = this.globals.currentVideo;
    }
    if (list === 4) {
      listType = this.globals.historyVideos[i];
    }

    const playlistItem = this.globals.playlistVideos.find(item => item.id === listType.id);

    if (typeof playlistItem === 'undefined') {
      this.globals.playlistVideos.push(listType);
      this.shared.checkPlaylist();

      this.shared.triggerNotify('Added to playlist');
      this.scrollToBottom();
    } else {
      this.shared.triggerNotify('Video is already in playlist');
    }
  }

  getVideo(data: any) {
    this.shared.getStatsVideos(data.id).then(() => {
      this.playVideo(data);
    });
  }

  // ---------------- Videos ----------------

  async getRelatedVideos() {
    const res = await this.youtube.relatedVideos(this.globals.currentVideo['id']);
    this.shared.convertVideoObject(res['items'], 'relatedVideos');
    if (this.playlistPrefill) {
      this.playlistInit();
      this.playlistPrefill = false;
    }
  }

  playlistInit() {
    if (localStorage.getItem('playlist') === null || localStorage.getItem('playlist').length === 2) {
      this.globals.playlistVideos = this.globals.relatedVideos;
      this.shared.updatePlaylist();
    } else {
      this.shared.getPlaylist();
    }
    this.shared.findPlaylistItem();
  }

  checkPlaylist() {
    this.shared.findPlaylistItem();
    this.shared.updatePlaylist();
  }

  // ---------------- Player controls ----------------

  copyShareLink() {
    document.execCommand('Copy');
    this.shared.triggerNotify('Copied');
  }

  playPauseVideo() {
    if (this.currentState === 1) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }

  rangeNouseDown() {
    this.videoRangeMouseActive = true;
    this.stopRange();
  }

  rangeMouseMove(value: number) {
      if (this.videoRangeMouseActive) {
        this.videoCurRange = value;
        this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
        this.videoCurFull = this.timeFormat(this.videoCurRange);
      }
  }

  rangeMouseUp(value: number) {
    if (this.currentState !== -1 && this.currentState !== 1) {
      this.player.playVideo();
    }
    if (this.currentState === 1) {
      this.startRange();
    } else {
      this.stopRange();
    }

    this.videoCurRange = value;
    this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
    this.videoCurFull = this.timeFormat(this.videoCurRange);

    this.player.seekTo(this.videoCurRange, true);
    this.videoRangeMouseActive = false;
    // this.dbcrud.update('sessions', 'currentSeek', this.videoCurRange);
  }

  volumeRangeMouseMove(value: number) {
    if (this.volumeRangeMouseActive) {
      if (this.currentMuteState) {
        this.player.unMute();
        this.currentMuteState = false;
      }
    }
  }

  volumeRangeMouseUp(value: number) {
    if (this.currentMuteState) {
      this.player.unMute();
      this.currentMuteState = false;
    }
    this.player.setVolume(value);
  }

  checkVolumeRange() {
    if (this.currentState !== -1) {
      this.currentMuteState = this.player.isMuted();
      this.videoCurVolume = this.player.getVolume();
    }
  }

  timeFormat(time: number) {
    const hours: any = Math.floor(time / 3600);
    const minutes: any = Math.floor(time % 3600 / 60);
    const seconds: any = Math.floor(time % 3600 % 60);
    const value = (parseInt(hours, 10) < 10 ? '0' : '' ) + parseInt(hours, 10) + ':'
              + (parseInt(minutes, 10) < 10 ? '0' : '' ) + parseInt(minutes, 10) + ':'
              + (parseInt(seconds, 10) < 10 ? '0' : '' ) + parseInt(seconds, 10);
    return value;
  }


  onCopyVideoItemLink(i: number, list: number) {
    let listType;
    const youtubeLink = 'https://youtu.be/';
    if (list === 0) {
      listType = this.globals.feedVideos[i];
    }
    if (list === 1) {
      listType = this.globals.lastSearchedVideos[i];
    }
    if (list === 2) {
      listType = this.globals.relatedVideos[i];
    }
    if (list === 3) {
      listType = this.globals.playlistVideos[i];
    }
    if (list === 4) {
      listType = this.globals.historyVideos[i];
    }

    if (typeof listType.id.videoId !== 'undefined') {
      this.videoItemIDvalue.nativeElement.value = youtubeLink + listType.id.videoId;
    } else {
      this.videoItemIDvalue.nativeElement.value = youtubeLink + listType.id;
    }
    this.videoItemIDvalue.nativeElement.select();
    this.videoItemIDvalue.nativeElement.focus();
    document.execCommand('copy');
    this.videoItemIDvalue.nativeElement.blur();
    this.copyShareLink();
  }

  scrollToBottom() {
      try {
        setTimeout( () => {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }, 200);
      } catch (err) {
        console.log(err);
        console.log('scroll issue');
      }
  }

}
