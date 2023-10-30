import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged(): boolean{
    return sessionStorage.getItem('tokenAuthCrypto') != null;
  }

  login(id_email: string): void{
    sessionStorage.setItem( 'tokenAuthCrypto', id_email );
  }

  logout() : void{
    sessionStorage.removeItem('tokenAuthCrypto');
  }

  getUser(): string{
    return sessionStorage.getItem('tokenAuthCrypto') ?? '';
  }

  isAdmin(): boolean{
    return sessionStorage.getItem('tokenAuthCrypto') == 'admin@gmail.com';
  }


}
