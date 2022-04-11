import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeConveyorListDTO } from 'src/app/interfaces/conveyor/conveyor';
import { environment } from 'src/environments/environment';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class TypeConveyorService {

  constructor(
    private http: HttpClient,
  ) { }

  public getTypeConveyor() {
    return this.http.get<TypeConveyorListDTO>(`${URL}/api/type-conveyor/list-type-conveyors`);
  }
}
