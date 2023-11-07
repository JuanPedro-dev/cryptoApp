import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'crypto-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  private authService: AuthService = inject(AuthService); 
  private router: Router = inject(Router);
  
  isAdmin:boolean = false;
  
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['']); 
  }
}
