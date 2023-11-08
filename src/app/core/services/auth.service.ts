import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { User } from '@core/interface/user';
import { Observable } from 'rxjs';

/**
 * AuthService Service responsible for handling user authentication and authorization.
 * It provides methods for checking user login status, logging in, logging out, and accessing user-related information.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService: UserService = inject(UserService);

  /**
   * Checks whether the user is currently logged in.
   * 
   * @returns A boolean value indicating whether the user is logged in.
   */
  isLogged(): boolean {
    return sessionStorage.getItem('tokenAuthCrypto') != null;
  }

  /**
   * Logs a user in by storing their authentication token in the session storage.
   * 
   * @param id_email - The user's ID (email) to be stored as the authentication token.
   */
  login(id_email: string): void {
    sessionStorage.setItem('tokenAuthCrypto', id_email);
  }

  /**
   * Logs the user out by removing the authentication token from the session storage.
   */
  logout(): void {
    sessionStorage.removeItem('tokenAuthCrypto');
  }

  /**
   * Retrieves the "token" from the session storage.
   * 
   * @returns The user's ID(email) as a string or an empty string if not found.
   */
  getUserMail(): string {
    return sessionStorage.getItem('tokenAuthCrypto') ?? '';
  }

  /**
   * Retrieves user data by calling the method getUserById() from UserService .
   * 
   * @returns An Observable<User> that emits the logged user data.
   */
  getUser(): Observable<User> {
    return this.userService.getUserById(
      sessionStorage.getItem('tokenAuthCrypto') ?? ''
    );
  }

  /**
   * Checks whether the user logged is the admin email.
   * 
   * @returns A boolean value indicating whether the user has admin privileges.
  */
  // TODO: create a rol from User
  isAdmin(): boolean {
    return sessionStorage.getItem('tokenAuthCrypto') == 'admin@gmail.com';
  }

}
