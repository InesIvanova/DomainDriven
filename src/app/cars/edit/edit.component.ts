import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../cars.model';
import { FormGroup, FormBuilder } from 'ngx-strongly-typed-forms';
import { Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../category.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  car: Car;
  carForm: FormGroup<Car>;
  categories: Array<Category>;
  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private carService: CarsService, 
    private router: Router,
    public toastr: ToastrService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.carForm = this.fb.group<Car>({
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      category: [0, Validators.required],
      imageUrl: ['', Validators.required],
      pricePerDay: [0, Validators.required],
      climateControl: [false, Validators.required],
      numberOfSeats: [0, Validators.required],
      transmissionType: [0, Validators.required],
    })
  }

  ngOnInit(): void {
    this.fetchCar()
  }

  fetchCar() {
    this.carService.getCar(this.id).subscribe(car => {
      this.carForm = this.fb.group<Car>({
        manufacturer: [car.manufacturer, Validators.required],
        model: ['', Validators.required],
        category: [car.category, Validators.required],
        imageUrl: [car.imageUrl, Validators.required],
        pricePerDay: [car.pricePerDay, Validators.required],
        climateControl: [car.climateControl, Validators.required],
        numberOfSeats: [car.numberOfSeats, Validators.required],
        transmissionType: [car.transmissionType, Validators.required],
      })
    })
  }

  edit() {
    this.carService.editCar(this.id, this.carForm.value).subscribe(res => {
      this.carService.getCategories().subscribe(res => {
        this.categories = res;
      })
      this.router.navigate(['cars']);
      this.toastr.success("Success")
    })
  }

}
