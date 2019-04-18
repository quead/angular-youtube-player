import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  constructor(
    public globals: GlobalsService,
  ) {
  }

  ngOnInit() {
    console.log('history');
  }
}
