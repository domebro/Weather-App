import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.css',
})
export class WeatherDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private weatherService = inject(WeatherService);

  city: string = '';
  weatherData = signal<{
    temp: number;
    windspeed: number;
    humidity: number;
    pressure: number;
  } | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    // 🔹 Stadt aus der URL auslesen
    this.route.paramMap.subscribe((params) => {
      const cityName = params.get('city');
      if (cityName) {
        this.city = cityName;
        this.fetchWeather(cityName);
      } else {
        this.errorMessage.set('Keine Stadt angegeben!');
      }
    });
  }

  fetchWeather(city: string) {
    this.weatherService.getCityCoordinates(city).subscribe({
      next: (response) => {
        if (response?.results?.length) {
          const { latitude, longitude } = response.results[0];

          this.weatherService.getWeather(latitude, longitude).subscribe({
            next: (data) => {
              if (data?.current_weather && data?.hourly) {
                // 🔹 Index 0, weil die API eine Liste mit stündlichen Werten liefert
                this.weatherData.set({
                  temp: data.current_weather.temperature,
                  windspeed: data.current_weather.windspeed,
                  humidity: data.hourly.relative_humidity_2m[0], // Luftfeuchtigkeit aus "hourly"
                  pressure: data.hourly.surface_pressure[0], // Luftdruck aus "hourly"
                });
              } else {
                this.errorMessage.set('Keine Wetterdaten verfügbar.');
              }
            },
            error: (err) => {
              this.errorMessage.set('Fehler beim Abrufen der Wetterdaten.');
              console.error('API Fehler:', err);
            },
          });
        } else {
          this.errorMessage.set('Stadt nicht gefunden.');
        }
      },
      error: (err) => {
        this.errorMessage.set('Fehler bei der Standortsuche.');
        console.error('API Fehler:', err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/weather']);
  }
}
