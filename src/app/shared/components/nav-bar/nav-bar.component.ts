import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  @Input() isLoggedIn: Boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  }
  
  public goToLogin(){
    this.router.navigate(["/auth/login"]);
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['']); 
  }
  
}
