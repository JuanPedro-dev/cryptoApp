import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Trending } from '../interface/trendingCrypto';

@Injectable({
  providedIn: 'root',
})
export class ServiceTrending {
  private http: HttpClient;
  private apiUrl = 'https://api.coingecko.com/api/v3/search/trending';

  constructor(http: HttpClient) {
    this.http = http;
  }

  getTrending(): Observable<Trending> {
    return this.http.get<Trending>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error in ${operation}: ${error}`);
      return of(result as T);
    };
  }
}



