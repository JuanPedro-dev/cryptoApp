import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'crypto-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private authService: AuthService = inject(AuthService); 
  private router: Router = inject(Router);

  logout() {
    this.authService.logout()
    this.router.navigate(['']); 
  }
}
