import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  @Input()
  id!: string;
  element: any;
  modalActive = false;
  modalActiveClass = false;

  constructor(private modal: ModalService, el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    if (!this.id) {
      return;
    }
    this.modal.add(this);
  }

  open() {
    this.modalActive = true;
    setTimeout(() => {
      this.modalActiveClass = true;
    }, 100);
  }

  close() {
    this.modalActiveClass = false;
    setTimeout(() => {
      this.modalActive = false;
    }, 100);
  }
}
