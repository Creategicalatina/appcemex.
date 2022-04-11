import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { TypeConveyorService } from 'src/app/services/type-conveyor/type-conveyor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  typeConveyors: any = [];
  selectTypeConveyor: any;
  formTypeConveyor: FormGroup;
  showFormDriver = false;
  showFormManTruck = false;
  showFormAdminLogist = false;
  loading = false;
  showError = false;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() public monthSelected = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private typeConveyorService: TypeConveyorService
  ) { }

  ngOnInit() {
    this.formBuilderInput();
    this.getTypeConveyors();
  }
  /*=============================================
   OBTENER LOS TIPOS TRANSPORTADORES
  =============================================*/
  async getTypeConveyors(){
    this.loading = true;
    await this.typeConveyorService.getTypeConveyor().subscribe( async resp =>{
      this.typeConveyors = resp;
      setTimeout(() =>{
        this.loading = false;
      }, 1500);
    }, (error) =>{
      this.loading = false;
      this.showError = true;
    });
  }

  formBuilderInput(){
    this.formTypeConveyor = this.formBuilder.group({
      typeConveyorId: ['', [
        Validators.required,
      ]],
    });
    this.formTypeConveyor.valueChanges
    .pipe(
      debounceTime(100),
    )
    .subscribe(data => {

    });
  }

  cwcChange(data){
    if(data){
      this.selectTypeConveyor = data.detail;
      if(data.detail === '1'){
        this.showFormManTruck = false;
        this.showFormDriver = false;
        this.showFormAdminLogist = true;
      }else if(data.detail === '2'){
        this.showFormAdminLogist = false;
        this.showFormDriver = false;
        this.showFormManTruck = true;
      }else if(data.detail === '3'){
        this.loading = true;
        this.showFormManTruck = false;
        this.showFormAdminLogist = false;
        this.showFormDriver = true;
        setTimeout(() =>{
          this.loading = false;
        }, 1000);
      }
    }
  }

  showLoading(value) {
    this.loading = value;
  }
}
