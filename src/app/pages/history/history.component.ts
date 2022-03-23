import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {}
}
