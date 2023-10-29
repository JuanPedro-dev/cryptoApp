import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{
  
  private authService: AuthService = inject(AuthService);

  @Input() isLoggedIn: Boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  }
  
}