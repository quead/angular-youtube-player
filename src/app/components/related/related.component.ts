import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { GlobalsService } from 'src/app/services/globals.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RelatedComponent implements OnInit {
  constructor(
    public shared: SharedService,
    public globals: GlobalsService,
    public carouselOne: NguCarouselConfig
  ) {}

  ngOnInit() {
    this.carouselOne = {
      grid: { xs: 2, sm: 4, md: 4, lg: 4, all: 0 },
      slide: 4,
      speed: 250,
      loop: true,
      velocity: 0,
      touch: false,
      point: {
        visible: true,
        hideOnSingleSlide: true,
      },
    };
  }
}
