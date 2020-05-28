import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Car } from './cars.model';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  carsPath: string = environment.apiUrl + 'carads/';
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

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.apiUrl + 'categories')
  }

  search(queryString): Observable<Array<Car>> {
    var path  = this.carsPath.slice(0, -1)
    return this.http.get<Array<Car>>(this.carsPath + "?" + queryString)
  }

}
