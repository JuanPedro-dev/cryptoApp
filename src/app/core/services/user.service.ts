import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interface/user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  private apiServerUrl = 'http://localhost:3000';
  private entity: string = 'users';

  /**
   * Add a new user.
   *
   * @param user The user object to be created.
   * @returns An Observable that emits the created user.
   */
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/${this.entity}`, user)
      .pipe(
        catchError(this.handleError<User>('addUser'))
      );
  }

  /**
   * Get a user by their ID.
   *
   * @param id The ID of the user to retrieve.
   * @returns An Observable that emits the user corresponding to the provided ID.
   */
  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/${this.entity}/${id}`)
      .pipe(
        catchError(this.handleError<User>('getUserById'))
      );
  }

  /**
   * Get all users.
   *
   * @returns An Observable that emits an array of users.
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/${this.entity}`)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /**
   * Update an existing user.
   *
   * @param user The user object with updated information.
   * @returns An Observable that emits the updated user.
   */
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/${this.entity}/${user.id}`, user)
      .pipe(
        catchError(this.handleError<User>('updateUser'))
      );
  }

  /**
   * Delete a user by their ID.
   *
   * @param userId The ID of the user to be deleted.
   * @returns An Observable for the result of the deletion operation.
   */
  public deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${this.entity}/${userId}`)
      .pipe(
        catchError(this.handleError<void>('deleteUser'))
      );
  }

  /**
   * Handle HTTP operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

}
