import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from 'ngx-strongly-typed-forms';
import { Car } from '../cars.model';
import { Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../category.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  carForm: FormGroup<Car>;
  categories: Array<Category>
  constructor(private fb: FormBuilder, private carsService: CarsService, public toastr: ToastrService) {
    this.carsService.getCategories().subscribe(res => {
      this.categories = res;
    })
   }

  ngOnInit(): void {
    this.carForm = this.fb.group<Car>({
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      category: [1, Validators.required],
      imageUrl: ['', Validators.required],
      pricePerDay: [0, Validators.required],
      climateControl: [false, Validators.required],
      numberOfSeats: [0, Validators.required],
      transmissionType: [0, Validators.required],
    })
  }


  create() {
    this.carsService.createCar(this.carForm.value).subscribe(res => {
      this.toastr.success("Success")
    })
  }

}
