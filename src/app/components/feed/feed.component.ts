import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(
    public globals: GlobalsService
  ) { }

  ngOnInit() {
  }

}
