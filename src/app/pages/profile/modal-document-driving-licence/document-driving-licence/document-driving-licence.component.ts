import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-document-driving-licence',
  templateUrl: './document-driving-licence.component.html',
  styleUrls: ['./document-driving-licence.component.scss'],
})
export class DocumentDrivingLicenceComponent implements OnInit {

  @Input()urlLicenceFrontal= String;
  @Input()urlLicenceBack = String;
  @Input()showModalDrivingLicence: false;

  @Output()
  closeModalLicence: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  closeModalDrivingLicence(){
    this.closeModalLicence.emit();
  }

}
