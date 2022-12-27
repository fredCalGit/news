import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  constructor(private forecastService: ForecastService) {
    this.forecastService.getForecast().subscribe(val => console.log(val))
  }
}
