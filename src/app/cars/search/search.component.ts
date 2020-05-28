import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from 'ngx-strongly-typed-forms';
import { Search } from './search.model';
import { Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { Category } from '../category.model';
import { EventEmitter } from '@angular/core';
import { Car } from '../cars.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup<Search>
  categories: Array<Category>;
  @Output('emitter') emitter = new EventEmitter<Array<Car>>();
  constructor(private fb: FormBuilder, private carService: CarsService) { }

  ngOnInit(): void {
    this.carService.getCategories().subscribe(res => {
      this.categories = res
    })
    this.searchForm = this.fb.group<Search>({
      manufacturer: ['', Validators.required],
      category: [null, Validators.required],
      minPricePerDay: [null, Validators.required],
      maxPricePerDay: [null, Validators.required],
    })
  }

  search() {
    var queryString = this.getQueryUrl();
    this.carService.search(queryString).subscribe(cars => {
        this.emitter.emit(cars)
    })
  }

  getQueryUrl() {
    const params = new URLSearchParams();
    const formValue = this.searchForm.value; // this.form should be a FormGroup
    console.log(this.searchForm.value)
    for (const key in formValue) {
      if (!formValue[key]) {
        continue;
      }
      params.append(key, formValue[key]);
    }

    return params;
  }

}
