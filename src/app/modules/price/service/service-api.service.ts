import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Price } from '../interface/price';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiCripto {
  private http: HttpClient;
  private apigetListCriptoPrice = 'https://api.coingecko.com/api/v3/coins/markets';

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getListCriptoPrice(): Observable<Price[]> {
    // Configura los parámetros para obtener el listado completo
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', '100')
      .set('page', '1')
      .set('sparkline', 'false')
      .set('locale', 'en');

    return this.http.get<Price[]>(this.apigetListCriptoPrice, { params })
      .pipe(
        catchError(this.handleError<Price[]>('getListCriptoPrice', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}




