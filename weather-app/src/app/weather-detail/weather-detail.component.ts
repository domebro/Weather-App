import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.css',
})
export class WeatherDetailComponent {
  private route = inject(ActivatedRoute);
  private weatherService = inject(WeatherService);

  city: string = '';
  weatherData: WritableSignal<{ temp: number; description: string } | null> =
    signal(null);

  constructor() {
    this.city = this.route.snapshot.paramMap.get('city') || 'Unbekannt';
    this.fetchWeatherData();
  }

  private fetchWeatherData() {
    this.weatherService.getCityCoordinates(this.city).subscribe((response) => {
      if (response?.results?.length) {
        const { latitude, longitude } = response.results[0];

        this.weatherService
          .getWeather(latitude, longitude)
          .subscribe((data) => {
            this.weatherData.set({
              temp: data.current_weather.temperature,
              description: `Wind: ${data.current_weather.windspeed} km/h`,
            });
          });
      } else {
        alert('Stadt nicht gefunden!');
      }
    });
  }
}
