import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, Observable, of, share, switchMap, tap, toArray, throwError, retry } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      feels_like: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private rootUrl = 'https://api.openweathermap.org/data/2.5/forecast'

  constructor(private http: HttpClient, private notificationsService: NotificationsService) { }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          observer.next(coords)
          observer.complete()
        },
        (err) => observer.error(err)
      )
    }).pipe(
      tap(() => this.notificationsService.addSuccess('Got your location!')),
      catchError((err) => {
        this.notificationsService.addError('Failed to get your location')
        return throwError(() => new Error(err.message))
      })
    )
  }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', '82fcee109e90e060c664ccb49cdfeff0')
        }),
        switchMap(params => this.http.get<OpenWeatherResponse>(this.rootUrl, { params }).pipe(
          tap(() => this.notificationsService.addSuccess('Got your forecast!')),
          catchError((err) => {
            this.notificationsService.addError('Failed to get your forecast')
            return throwError(() => new Error(err.message))
          })
        )),
        map(value => value?.list),
        mergeMap(value => of(...value)),
        filter((_, index) => index % 8 === 0),
        map(value => {
          return {
            dateString: value.dt_txt,
            main: {
              feels_like: value.main.feels_like,
              temp: value.main.feels_like,
              temp_max: value.main.temp_max,
              temp_min: value.main.temp_min
            }
          }
        }),
        toArray(),
        share()
      )
  }

}
