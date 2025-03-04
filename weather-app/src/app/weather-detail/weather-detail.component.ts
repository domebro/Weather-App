import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.css',
})
export class WeatherDetailComponent {
  private route = inject(ActivatedRoute);
  city: string = '';
  weatherData: WritableSignal<{ temp: number; description: string } | null> =
    signal(null);

  constructor() {
    this.city = this.route.snapshot.paramMap.get('city') || 'Unbekannt';
    // Wetterdaten setzen
    this.weatherData.set({ temp: 20, description: 'Sonnig' });
  }
}
