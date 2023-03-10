import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    ForecastComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [ForecastComponent]
})
export class WeatherModule { }
