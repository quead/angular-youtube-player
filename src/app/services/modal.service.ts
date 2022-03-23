import { Injectable } from '@angular/core';

// https://jasonwatmore.com/post/2019/07/12/angular-8-custom-modal-window-dialog-box
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: any[] = [];
  constructor() {}

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  close(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
