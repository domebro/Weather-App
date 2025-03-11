// Import der notwendigen Module aus Angular
import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Router-Modul für Navigation

// Import des Wetter-Services, der für API-Anfragen zuständig ist
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather', // Definiert den HTML-Tag, unter dem die Komponente genutzt wird
  standalone: true, // Diese Komponente ist unabhängig und benötigt kein Modul
  imports: [CommonModule, FormsModule, RouterModule], // Notwendige Module für die Komponente
  templateUrl: './weather.component.html', // Verknüpfung zur HTML-Vorlage der Komponente
  styleUrl: './weather.component.css', // Verknüpfung zur CSS-Datei der Komponente
})
export class WeatherComponent {
  // Injektion des Wetter-Services zur Kommunikation mit der API
  private weatherService = inject(WeatherService);

  // Injektion des Routers, um Seitenwechsel zu ermöglichen
  private router = inject(Router);

  // Variable für den Namen der Stadt, die der Nutzer eingibt
  city: string = '';

  // Signal für Wetterdaten, speichert Temperatur und Beschreibung (initial null)
  weatherData = signal<{ temp: number; description: string } | null>(null);

  /**
   * Diese Methode wird aufgerufen, wenn der Nutzer auf "Suchen" klickt.
   * Sie ruft die Wetterdaten ab und navigiert zur Detailseite.
   */
  fetchWeather() {
    console.log('Wetter für Stadt:', this.city);

    // API-Anfrage für die Geokoordinaten der Stadt
    this.weatherService.getCityCoordinates(this.city).subscribe((response) => {
      if (response?.results?.length) {
        // Extrahiert die Geokoordinaten der Stadt
        const { latitude, longitude } = response.results[0];

        // API-Anfrage für das aktuelle Wetter basierend auf den Koordinaten
        this.weatherService
          .getWeather(latitude, longitude)
          .subscribe((data) => {
            // Wetterdaten werden im Signal gespeichert
            this.weatherData.set({
              temp: data.current_weather.temperature, // Temperatur in °C
              description: `Wind: ${data.current_weather.windspeed} km/h`, // Windgeschwindigkeit
            });

            // 🔹 Automatische Weiterleitung zur Detailseite mit dem Städtenamen in der URL
            this.router.navigate(['/weather-detail', this.city]);
          });
      } else {
        // Falls die Stadt nicht gefunden wurde, wird eine Fehlermeldung angezeigt
        alert('Stadt nicht gefunden!');
      }
    });
  }
}
