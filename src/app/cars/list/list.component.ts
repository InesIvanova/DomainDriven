import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { Car } from '../cars.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cars: Array<Car>;
  popUpOpen: boolean = false;
  id: string;
  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.popUpOpen = false
    this.fetchCars()
  }

  fetchCars() {
    this.carsService.getCars().subscribe(cars => {
      this.cars = cars['data'];
    })
  }

  openModal(id) {
    this.popUpOpen = true;
    this.id = id;
  }

  cancelModal() {
    this.popUpOpen = false;
    this.id = null;
  }

  deleteCar() {
    this.carsService.deleteCar(this.id).subscribe(res => {
      this.popUpOpen = false;
      this.fetchCars();
    })
  }

}
