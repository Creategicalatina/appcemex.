import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-document-identity-card',
  templateUrl: './document-identity-card.component.html',
  styleUrls: ['./document-identity-card.component.scss'],
})
export class DocumentIdentityCardComponent implements OnInit {

  @Input()urlIdentityCardFrontal= String;
  @Input()urlIdentityCardBack = String;
  @Input()showModalIdentityCard: false;

  @Output()
  closeModalIdentity: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  closeModalIdentityCard(){
    this.closeModalIdentity.emit();
  }
}
