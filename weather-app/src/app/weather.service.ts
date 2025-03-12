import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number) {
    return this.http.get<any>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,surface_pressure`
    );
  }

  getCityCoordinates(city: string): Observable<any> {
    return this.http.get<any>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`
    );
  }
}
