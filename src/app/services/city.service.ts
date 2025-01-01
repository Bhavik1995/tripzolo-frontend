import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://tripzolo-backend.vercel.app/api/packages';

  constructor(private http: HttpClient) { }

  getCities(query: string): Observable<string[]> {
    return this.http
      .get<string[]>(`https://tripzolo-backend.vercel.app/api/cities?q=${query}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  
  getPackagesByCity(cityName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?city=${cityName}`).pipe(
      catchError((err) => {
        console.error("Error in getPackagesByCity:", err);
        return of([]);
      })
    );
  }
}
