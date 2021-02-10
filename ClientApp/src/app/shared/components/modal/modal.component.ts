import { Component, EventEmitter, Output, Input  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import  Modal from 'bootstrap/js/src/modal';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveModal: EventEmitter<any>  = new EventEmitter<any>();
  @Output() openModal: EventEmitter<any>  = new EventEmitter<any>();
  @Input() scheduleForm;

  public modalWindow: Modal;

  ngAfterViewInit(): void {
    this.modalWindow = new Modal(document.querySelector('#js-schedule__modal'));
  }

  public closeWindow(): void {
    this.openModal.emit()
    this.modalWindow.hide()
  }

  public showWindow (): void {
    this.openModal.emit();
    this.modalWindow.show();
  }

  public saveData(): void {
    console.log('test');
    this.saveModal.emit();
    this.modalWindow.hide()
  }
}
