import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../../../services/globals.service';

@Component({
    selector: 'app-category-badge',
    templateUrl: './category-badge.component.html',
    styleUrls: ['./category-badge.component.scss'],
})
export class CategoryBadgeComponent implements OnInit {
    @Input() categoryID: number;

    constructor(
        public globals: GlobalsService
    ) { }

    ngOnInit() {
    }

}
