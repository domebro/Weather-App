import { Routes } from '@angular/router'; // Router ist ein Typ von Angular, der ein Array mit Routen-Definitionen beschreibt

import { WeatherDetailComponent } from './weather-detail/weather-detail.component'; // Import der Komponente damit Sie über eine spezielle URL erreichbar sein soll
import { WeatherComponent } from './weather/weather.component'; // Import der Komponente damit Sie über eine spezielle URL erreichbar sein soll

export const routes: Routes = [
  { path: '', component: WeatherComponent }, // Standardroute z.B. beim Laden der Anwendung
  { path: 'weather', component: WeatherComponent }, // Alternativer Pfad z.B. für Navigation
  { path: 'weather-detail/:city', component: WeatherDetailComponent }, // Dynamische Route für Details um bspw. eine Stadt anzuzeigen und deren Wetterdaten
];
