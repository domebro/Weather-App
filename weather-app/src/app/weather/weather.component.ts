import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  private router = inject(Router);

  city: string = '';
  weatherData = signal<{ temp: number; description: string } | null>(null);
  errorMessage = signal<string | null>(null);

  // 🔹 Favoritenliste als Signal
  favorites = signal<string[]>(this.loadFavorites());

  fetchWeather(cityName?: string) {
    const cityToSearch = cityName || this.city;
    console.log('Wetter für Stadt:', cityToSearch);

    this.weatherService
      .getCityCoordinates(cityToSearch)
      .subscribe((response) => {
        if (response?.results?.length) {
          const { latitude, longitude } = response.results[0];

          this.weatherService
            .getWeather(latitude, longitude)
            .subscribe((data) => {
              this.weatherData.set({
                temp: data.current_weather.temperature,
                description: `Wind: ${data.current_weather.windspeed} km/h`,
              });

              this.errorMessage.set(null);
              this.router.navigate(['/weather-detail', cityToSearch]);
            });
        } else {
          this.errorMessage.set('Stadt nicht gefunden!');
        }
      });
  }

  // 🔹 Stadt zu Favoriten hinzufügen
  addToFavorites() {
    if (!this.city || this.favorites().includes(this.city)) return;

    const updatedFavorites = [...this.favorites(), this.city];
    this.favorites.set(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  // 🔹 Favoriten aus Local Storage laden
  private loadFavorites(): string[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  // 🔹 Favoriten entfernen
  removeFavorite(city: string) {
    const updatedFavorites = this.favorites().filter((fav) => fav !== city);
    this.favorites.set(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }
}
