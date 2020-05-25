import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Car } from './cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  carsPath: string = environment.apiUrl + 'users/';
  constructor(private http: HttpClient) { }

  getCars(): Observable<Array<Car>> {
    return this.http.get<Array<Car>>(this.carsPath);
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(this.carsPath + id);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsPath, car);
  }

  editCar(id: string, car: Car): Observable<Car> {
    return this.http.put<Car>(this.carsPath + id, car);
  }

  deleteCar(id: string) {
    return this.http.delete(this.carsPath + id);
  }
}
