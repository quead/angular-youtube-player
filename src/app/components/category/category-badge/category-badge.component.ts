import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-category-badge',
  templateUrl: './category-badge.component.html',
  styleUrls: ['./category-badge.component.css'],
})
export class CategoryBadgeComponent implements OnInit {
  @Input()
  categoryID!: string;

  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {}
}
