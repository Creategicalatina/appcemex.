import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ForgotPasswordService } from '../../../../services/auth/forgot-password.service';
import { ErrorMessagesService } from '../../../../services/error-messages.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  form: FormGroup;

  statusInputEmail = 'regular';
  statusInputMessageEmail = '';

  email: string = null;
  errors: string[] = [];
  loading = false;
  alertSucces = false;
  constructor(
    private formBuilder: FormBuilder,
    private errorMessages: ErrorMessagesService,
    private forgotPasswordService: ForgotPasswordService,
  ) { }

  ngOnInit() {
    this.formBuilderInput();
  }
  async sendEmail(){
    this.loading = true;
    await this.forgotPasswordService.forgotPassword(this.form.value).subscribe(async resp =>{
      // eslint-disable-next-line @typescript-eslint/dot-notation
      if(resp['token']){
        this.loading = false;
        this.alertSucces = true;
        this.form.reset();
      }
    }, (error)=>{
      this.loading = false;
      this.errors = this.errorMessages.parsearErroresAPI(error);
    }
    );

  }

  /*=============================================
   FORMULARIOS REACTIVOS
  =============================================*/
  formBuilderInput(){
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
      ]],
    });

    this.form.valueChanges
    .pipe(
      debounceTime(350),
    )
    .subscribe(data => {
       this.validateInput();
    });
  }
  validateInput(){
    if(this.form.get('email').errors && this.form.get('email').dirty){
      this.statusInputEmail = 'error';
      this.statusInputMessageEmail = 'Este campo es requerido';
     }else{
      this.statusInputEmail = 'regular';
      this.statusInputMessageEmail = '';
     }
  }
}
