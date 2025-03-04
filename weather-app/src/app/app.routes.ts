import { Routes } from '@angular/router';

import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: '', component: WeatherComponent },
  { path: 'weather/:city', component: WeatherDetailComponent },
];
