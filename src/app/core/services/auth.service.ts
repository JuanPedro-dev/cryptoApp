import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { User } from '@core/interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService: UserService = inject(UserService);

  isLogged(): boolean{
    return sessionStorage.getItem('tokenAuthCrypto') != null;
  }

  login(id_email: string): void{
    sessionStorage.setItem( 'tokenAuthCrypto', id_email );
  }

  logout() : void{
    sessionStorage.removeItem('tokenAuthCrypto');
  }

  getUserMail(): string{
    return sessionStorage.getItem('tokenAuthCrypto') ?? '';
  }

  getUser(): Observable<User>{
    return this.userService.getUserById(sessionStorage.getItem('tokenAuthCrypto') ?? '')
  }

  isAdmin(): boolean{
    return sessionStorage.getItem('tokenAuthCrypto') == 'admin@gmail.com';
  }


}
