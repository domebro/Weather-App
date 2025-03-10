import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Router importiert

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  private weatherService = inject(WeatherService);
  private router = inject(Router); // Router für Navigation

  city: string = '';
  weatherData = signal<{ temp: number; description: string } | null>(null);

  fetchWeather() {
    console.log('Wetter für Stadt:', this.city);

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

            // 🔹 Nach erfolgreicher Wetterdatenabfrage navigieren wir direkt zur Detailseite!
            this.router.navigate(['/weather-detail', this.city]);
          });
      } else {
        alert('Stadt nicht gefunden!');
      }
    });
  }
}
