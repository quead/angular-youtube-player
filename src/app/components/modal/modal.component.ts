import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
    @Input() isActive: boolean = false;
    @Input() isActiveClass: boolean = false;
    @Output() openModal = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
    }

    close() {
        this.openModal.emit(false);
    }
}
