import { CommonModule } from '@angular/common'; // Importiere CommonModule für grundlegende Angular-Funktionalitäten
import { Component, inject, Signal, signal } from '@angular/core'; // Importiere die benötigten Module und Funktionen aus Angular
import { FormsModule } from '@angular/forms'; // Importiere FormsModule für die Verwendung von Formularen
import { Router, RouterModule } from '@angular/router'; // Importiere RouterModule für das Routing in der Anwendung

import { WeatherService } from '../weather.service';

@Component({ // Definiert die Komponente
  selector: 'app-weather',
  standalone: true, // Macht die Komponente eigenständig und ermöglicht die Verwendung in anderen Modulen
  imports: [CommonModule, FormsModule, RouterModule], // Importiere die benötigten Module für die Komponente
  templateUrl: './weather.component.html', // Verweist auf die HTML-Vorlage der Komponente
  styleUrl: './weather.component.css', // Verweist auf die CSS-Datei der Komponente
})
export class WeatherComponent {
  private weatherService = inject(WeatherService); // Injiziert den WeatherService, um Wetterdaten abzurufen
  private router = inject(Router); // wird verwendet, um den Router zu injizieren und Navigation durchzuführen

  city: string = ''; // Initialisiert die Stadtvariable
  weatherData = signal<{ temp: number; description: string } | null>(null); // Initialisiert die Wetterdaten als Signal
  errorMessage = signal<string | null>(null); // Initialisiert die Fehlermeldung als Signal

  // 🔹 Favoritenliste als Signal
  favorites = signal<string[]>(this.loadFavorites()); // Initialisiert die Favoritenliste mit den Werten aus dem Local Storage

  fetchWeather(cityName?: string) { // Funktion zum Abrufen der Wetterdaten für eine Stadt
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
