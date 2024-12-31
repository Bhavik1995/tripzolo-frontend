import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://tripzolo-backend.vercel.app/api/packages';

  constructor(private http: HttpClient) { }

  getCities(query: string): Observable<string[]> {
    return this.http
      .get<{ cities: string[] }>(`${this.apiUrl}?q=${query}`)
      .pipe(map((response) => response.cities));
  }

  getPackagesByCity(city: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?city=${encodeURIComponent(city)}`);
}
}
