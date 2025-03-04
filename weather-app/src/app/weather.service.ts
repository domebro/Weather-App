import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor() {}

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get(url);
  }
}
