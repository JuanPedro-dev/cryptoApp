import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/Models';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //! Users

  public getToAuth(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseURL}/users?email=${email}&password=${password}`
    );
  }

  /* Ejemplo de como trasnformar la respuesta de la api */
  public getUserNameById(id: number): Observable<string | null> {
    return this.http.get<User>(`${this.baseURL}/users/${id}`).pipe(
      map((user) => user.userName),
      catchError((error) => of(null))
    );
  }
}
