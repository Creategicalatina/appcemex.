import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-document-company',
  templateUrl: './document-company.component.html',
  styleUrls: ['./document-company.component.scss'],
})
export class DocumentCompanyComponent implements OnInit {

  @Input()urlDocumentCompanyFrontal= String;
  @Input()showModalArchiveDocumentCompany: true;

  @Output()
  closeModalDocumentCompany: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  closeModalDocumentModalApp(){
    this.closeModalDocumentCompany.emit();
  }
}
