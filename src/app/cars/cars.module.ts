import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { CarsRoutingModule } from './cars-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    CarsRoutingModule,
  ],
  exports: [ListComponent, CreateComponent, EditComponent, ViewComponent]
})
export class CarsModule { }
