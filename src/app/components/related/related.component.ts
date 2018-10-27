import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { PlayerComponent } from '../player/player.component';
import { PlaylistComponent } from '../playlist/playlist.component';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
})
export class RelatedComponent implements OnInit {
  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public playerComp: PlayerComponent,
    public playlistComp: PlaylistComponent,
    public carouselOne: NguCarouselConfig
  ) { }


  ngOnInit() {
    this.carouselOne = {
      grid: {xs: 2, sm: 4, md: 8, lg: 8, all: 0},
      slide: 4,
      speed: 250,
      loop: true,
      velocity: 0,
      touch: false,
    };
  }

}
