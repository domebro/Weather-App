import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  city: string = '';
  weatherData = signal<{
    city: string;
    temp: number;
    description: string;
  } | null>(null);

  fetchWeather() {
    console.log('Wetter für Stadt:', this.city);

    this.weatherData.update(() => ({
      city: this.city,
      temp: 20,
      description: 'Sonnig',
    }));
  }
}
