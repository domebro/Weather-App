import { Observable } from 'rxjs'; // Wird verwendet, um die Antwort des HTTP-Requests zu verarbeiten

import { HttpClient } from '@angular/common/http'; // HttpClient wird verwendet, um HTTP-Requests zu machen
import { Injectable } from '@angular/core'; // Injectable wird verwendet, um den Service als injizierbar zu markieren

@Injectable({
  // Der @Injectable({ providedIn: 'root' })-Decorator sagt Angular, dass dieser Service global zur Verfügung steht. Er wird automatisch beim Start der App instanziiert.
  providedIn: 'root',
})
export class WeatherService {
  // Name des Services der Wetterdaten und Koordinaten abruft
  private weatherUrl = 'https://api.open-meteo.com/v1/forecast'; // URL für die Wetter-API

  constructor(private http: HttpClient) {} // Angular injiziert automatisch eine Instanz von HttpClient. Dadurch können in dieser Klasse HTTP-Anfragen gesendet werden.

  /**
   * Holt aktuelle Wetterdaten für eine gegebene Position.
   *
   * @param lat - Breitengrad (Latitude) des gewünschten Orts
   * @param lon - Längengrad (Longitude) des gewünschten Orts
   * @returns Ein Observable mit den aktuellen Wetterdaten und stündlichen Werten (z. B. Luftfeuchtigkeit, Druck)
   */
  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(
      `${this.weatherUrl}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,surface_pressure`
    );
  }

  /**
   * Ruft die geografischen Koordinaten (Latitude, Longitude) einer Stadt ab.
   *
   * @param city - Name der Stadt
   * @returns Ein Observable mit den gefundenen Koordinaten der Stadt (normalerweise nur ein Ergebnis)
   */
  getCityCoordinates(city: string): Observable<any> {
    return this.http.get<any>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`
    );
  }
}
