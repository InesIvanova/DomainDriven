import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStronglyTypedFormsModule } from 'ngx-strongly-typed-forms';
import { ModalModule } from 'angular-custom-modal';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './interceptor.service';
import { RouterExtService } from './rouer-ext.service';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorService } from './error-interceptor.service';


@NgModule({
  declarations: [PopUpComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxStronglyTypedFormsModule,
    ModalModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    RouterExtService,
  ],
  exports: [ReactiveFormsModule, ModalModule, PopUpComponent]
})
export class SharedModule { }
