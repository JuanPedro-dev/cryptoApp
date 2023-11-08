import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Trending } from '../interface/trendingCrypto';


/**
 * The `ServiceTrending` is a service for cryptocurrency trending data from an external API.
 */
@Injectable({
  providedIn: 'root',
})
export class ServiceTrending {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'https://api.coingecko.com/api/v3/search/trending';

  /**
   * Retrieves trending cryptocurrency data from the external API.
   * @returns An Observable<Trending> containing trending cryptocurrency data.
   */
  getTrending(): Observable<Trending> {
    return this.http.get<Trending>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }
}



