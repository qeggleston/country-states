import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    DropdownComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
