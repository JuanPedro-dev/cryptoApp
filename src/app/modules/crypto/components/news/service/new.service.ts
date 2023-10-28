import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { News } from '../interface/new';


@Injectable({
  providedIn: 'root',
})
export class noticesCriptoService {
  private http: HttpClient;
  private apiNoticesUrl ='https://min-api.cryptocompare.com/data/v2/news/?lang=ES';

  constructor(http: HttpClient) {
    this.http = http;
  }

  getNoticesApi(): Observable<News> {
    return this.http.get<News>(this.apiNoticesUrl).pipe(
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
