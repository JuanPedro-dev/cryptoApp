import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)
  
  private apiServerUrl = 'http://localhost:3000';
  private entity: string = 'users'

  public getUsers(): Observable<User[]>{
    const allUsers = this.http.get<User[]>(`${this.apiServerUrl}/${this.entity}`)
    return allUsers;
  }

  public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/${this.entity}`, user)
  }

  // suponemos el mail como identificador
  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/${this.entity}/${user.email}`, user)
  }

  // Not 
  public deleteUser(userId: string): Observable<User>{
    return this.http.delete<any>(`${this.apiServerUrl}/${this.entity}/${userId}`)
  }



}
