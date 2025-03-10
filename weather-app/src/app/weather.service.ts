import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(
      `${this.weatherUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
  }

  getCityCoordinates(city: string): Observable<any> {
    return this.http.get<any>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`
    );
  }
}
