import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.scss'],
})
export class AlertSuccessComponent{

  @Input() title: string;
  @Input() message: string;
  @Input() urlButton: string;
  @Input() textButton: string;
  @Input() alertShow: false;

  constructor(
    private navCtrl: NavController
  ) { }

  go(){
    this.navCtrl.navigateRoot(this.urlButton, {animated:true});
  }
}
