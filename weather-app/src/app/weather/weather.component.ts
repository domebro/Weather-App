import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  private weatherService = inject(WeatherService);
  city: string = '';
  weatherData = signal<{ temp: number; description: string } | null>(null);

  fetchWeather() {
    console.log('Wetter für Stadt:', this.city);
    this.getCoordinates(this.city);
  }

  private getCoordinates(city: string) {
    const cities: Record<string, { lat: number; lon: number }> = {
      Berlin: { lat: 52.52, lon: 13.41 },
      München: { lat: 48.14, lon: 11.58 },
      Hamburg: { lat: 53.55, lon: 9.99 },
    };

    const location = cities[city];

    if (location) {
      this.weatherService
        .getWeather(location.lat, location.lon)
        .subscribe((data) => {
          this.weatherData.set({
            temp: data.current_weather.temperature,
            description: `Wind: ${data.current_weather.windspeed} km/h`,
          });
        });
    } else {
      console.log('Stadt nicht gefunden!');
    }
  }
}
