import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../cars.model';
import { FormGroup, FormBuilder } from 'ngx-strongly-typed-forms';
import { Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  car: Car;
  carForm: FormGroup<Car>;
  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private carService: CarsService, 
    private router: Router,
    public toastr: ToastrService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.carForm = this.fb.group<Car>({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.fetchCar()
  }

  fetchCar() {
    this.carService.getCar(this.id).subscribe(car => {
      this.carForm = this.fb.group<Car>({
        first_name: [car['data'].first_name, Validators.required],
        last_name: [car['data'].last_name, Validators.required]
      })
    })
  }

  edit() {
    this.carService.editCar(this.id, this.carForm.value).subscribe(res => {
      this.router.navigate(['cars']);
      this.toastr.success("Success")
    })
  }

}
