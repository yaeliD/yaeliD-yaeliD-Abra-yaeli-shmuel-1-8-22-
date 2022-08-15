import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  URL = 'http://dataservice.accuweather.com';
  API_KEY = 'mZubytyHL1AkRgmuAPiDF5hFDjy0Il3Y';
  // SbelAxqVDWiQVCN0AnbU8mJWCWQZt539

  constructor(private http: HttpClient) { }

  getRequest(url: string, q?: any) {
    const query = [
      `apikey=${this.API_KEY}`,
      q !== undefined ? `q=${q}` : null,
    ].filter(item => item !== null).join('&');
    return this.http.get(`${url}?${query}`);
  }

  getAutoComplete(name: string): Observable<any> {
    return this.getRequest(`${this.URL}/locations/v1/cities/autocomplete`, name);
  }

  getCurrentWeatherByKeyCity(key: string): Observable<any> {
    return this.getRequest(`${this.URL}/currentconditions/v1/${key}`);
  }

  get5DaysOfForecasts(key: string): Observable<any> {
    return this.getRequest(`${this.URL}/forecasts/v1/daily/5day/${key}`);
  }

  getGeoPosition(lat: number, lng: number): Observable<any> {
    return this.http.get(`${this.URL}/locations/v1/cities/geoposition/search/?apikey=mZubytyHL1AkRgmuAPiDF5hFDjy0Il3Y&q=${lat},${lng}`);
  }

}
