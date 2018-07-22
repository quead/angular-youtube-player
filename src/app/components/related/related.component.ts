import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
})
export class RelatedComponent implements OnInit {

  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public carouselOne: NguCarousel
  ) { }

  ngOnInit() {
    this.carouselOne = {
      grid: {xs: 2, sm: 4, md: 8, lg: 8, all: 0},
      slide: 8,
      speed: 500,
      interval: 4000,
      easing: 'ease',
      point: {
        visible: true
      },
      touch: true,
      loop: true,
    }
  }

}
