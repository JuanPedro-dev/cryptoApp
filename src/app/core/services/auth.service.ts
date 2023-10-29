import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged(): boolean{
    return sessionStorage.getItem('tokenAuthCrypto') != null;
  }

  login(): void{
    sessionStorage.setItem( 'tokenAuthCrypto', "debería suministrar un token" );
  }

  logout() : void{
    sessionStorage.removeItem('tokenAuthCrypto');
  }
}
