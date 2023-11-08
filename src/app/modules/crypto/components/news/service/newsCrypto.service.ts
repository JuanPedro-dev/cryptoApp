import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { News } from '../interface/new';

/**
 * The `noticesCryptoService` is a service responsible for news from an external API.
 */
@Injectable({
  providedIn: 'root',
})
export class NewsCryptoService {
  private http: HttpClient = inject(HttpClient)
  private apiNoticesUrl = 'https://min-api.cryptocompare.com/data/v2/news/?lang=ES';

  /**
   * Retrieves cryptocurrency news from the external API.
   * @returns An Observable<News> containing cryptocurrency news data.
   */
  getNoticesApi(): Observable<News> {
    return this.http.get<News>(this.apiNoticesUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

}
