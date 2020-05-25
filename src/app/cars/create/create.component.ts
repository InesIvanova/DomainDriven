import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from 'ngx-strongly-typed-forms';
import { Car } from '../cars.model';
import { Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  carForm: FormGroup<Car>;
  constructor(private fb: FormBuilder, private carsService: CarsService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.carForm = this.fb.group<Car>({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    })
  }

  create() {
    this.carsService.createCar(this.carForm.value).subscribe(res => {
      this.toastr.success("Success")
    })
  }

}
