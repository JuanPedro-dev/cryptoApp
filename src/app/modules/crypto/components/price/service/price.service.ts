import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Price } from '../interface/price';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Configura los parámetros para obtener el listado completo
const params = new HttpParams()
  .set('vs_currency', 'usd')
  .set('order', 'market_cap_desc')
  .set('per_page', '100')
  .set('page', '1')
  .set('sparkline', 'false')
  .set('locale', 'en');

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private http: HttpClient;
  private cryptoURL = 'https://api.coingecko.com/api/v3/coins/markets';
  
  // Mock
  private jsonUrl = 'http://localhost:3000';

  constructor(http: HttpClient) {
    this.http = http;
  }

   /**
   * Get a List of cryptocurrencies.
   *
   * @returns An Observable that emits an array of cryptocurrencies.
   */
   public getListCriptoPrice(): Observable<Price[]> {
    // Configura los parámetros para obtener el listado completo
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', '100')
      .set('page', '1')
      .set('sparkline', 'false')
      .set('locale', 'en');

    return this.http.get<Price[]>(this.cryptoURL, { params })
      .pipe(
        catchError(this.handleError<Price[]>('getListCriptoPrice', []))
      );
  }

    /**
   * Get a List of cryptocurrencies.
   * this is a mock with json-server
   * @returns An Observable that emits an array of cryptocurrencies.
   */
     public getCryptocurrencies(): Observable<Price[]> {
      return this.http
        .get<Price[]>(`${this.jsonUrl}/prices`)
        .pipe(catchError(this.handleError<Price[]>('getCryptocurrencies', [])));
    }
  
  /**
   * Save a List of cryptocurrencies.
     * this is a mock with json-server
   * @returns An Observable that emits an array of cryptocurrencies.
   */
    public addCryptocurrencies(prices: Price[]): Observable<Price[]> {
      return this.http
        .post<Price[]>(`${this.jsonUrl}/prices`, prices)
        .pipe(catchError(this.handleError<Price[]>('addCryptocurrencies', [])));
    }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  
}
