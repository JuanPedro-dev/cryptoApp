import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { ApiService } from '@core/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient = inject(HttpClient)
  
  private apiServerUrl = 'http://localhost:3000';
  private entity: string = 'users'

  public getUser(mailId:string): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/${this.entity}/${mailId}`);
  }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/${this.entity}`);
  }

  public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/${this.entity}`, user)
  }

  // suponemos el mail como identificador
  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/${this.entity}/${user.id}`, user)
  }

  public deleteUser(userId: string): Observable<User>{
    return this.http.delete<any>(`${this.apiServerUrl}/${this.entity}/${userId}`)
  }


}
