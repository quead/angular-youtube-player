import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
    public modalActive: boolean = false;
    public modalActiveClass: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
