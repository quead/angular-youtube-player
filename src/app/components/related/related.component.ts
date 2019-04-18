import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RelatedComponent implements OnInit {
  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
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
