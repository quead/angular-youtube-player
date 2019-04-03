import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-history',
  templateUrl: 'youtube-history.component.html'
})

export class HistoryComponent implements OnInit {

  constructor(
    public globals: GlobalsService,
    public shared: SharedService,
  ) {
  }

  ngOnInit() {
    console.log('history');
  }
}
