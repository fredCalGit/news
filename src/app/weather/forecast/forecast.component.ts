import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastService } from '../forecast.service';

interface ForecastData {
  dateString: string;
  main: {
    feels_like: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  forecast$: Observable<ForecastData[]>
  collapse = true

  constructor(private forecastService: ForecastService) {
    this.forecast$ = this.forecastService.getForecast()
  }
}
