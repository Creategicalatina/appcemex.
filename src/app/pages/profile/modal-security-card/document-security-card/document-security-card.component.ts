import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-document-security-card',
  templateUrl: './document-security-card.component.html',
  styleUrls: ['./document-security-card.component.scss'],
})
export class DocumentSecurityCardComponent implements OnInit {

  @Input()urlSecurityCardFrontal = String;
  @Input()showModalArchiveSecurityCard: true;

  @Output()
  closeModalSecurityCard: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  closeModalDocumentModalApp(){
    this.closeModalSecurityCard.emit();
  }

}
