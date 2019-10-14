import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable()
export class ModalService {
    modalActive: boolean = false;
    modalActiveClass: boolean = false;

    constructor(private modalComp: ModalComponent) { }

    shouldOpenModal(agreed: boolean) {
        if (agreed) {
            this.modalComp.modalActive = true;
            setTimeout(() => {
                this.modalComp.modalActiveClass = true;
            }, 100);
        } else {
            this.modalComp.modalActiveClass = false;
            setTimeout(() => {
                this.modalComp.modalActive = false;
            }, 100);
        }
        console.log(this.modalComp.modalActive);
    }
}