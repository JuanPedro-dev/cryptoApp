import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Crypto } from '../interface/ICrypto';

@Injectable({
  providedIn: 'root',
})
export class calculatorService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  private apiUrlBase = 'https://min-api.cryptocompare.com/data/pricemultifull';

  getCryptoList(): Observable<Crypto> {
    return this.http.get<Crypto>(this.apiUrl).pipe(
      tap((response) => {
        // console.log('Respuesta de la API:', response);
      }),
      catchError((error: any) => {
        console.error('Error on service: - getCryptoList():', error);
        throw error;
      })
    );
  }

  getResponseCrypto(
    cryptoCurrency: string,
    currency: string
  ): Observable<Crypto> {
    const apiUrlResponseCrypto = `${this.apiUrlBase}?fsyms=${cryptoCurrency}&tsyms=${currency}`;
    return this.http.get<Crypto>(apiUrlResponseCrypto).pipe(
      tap((response) => {
        // console.log('Respuesta de la API:', response);
      }),
      catchError((error: any) => {
        console.error('Error on service: getResponseCrypto():', error);
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
