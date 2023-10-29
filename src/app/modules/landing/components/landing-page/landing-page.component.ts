import { Component, Input, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit{
  show: Boolean = false;
  
  private authService: AuthService = inject(AuthService);

  @Input() isLoggedIn: Boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  }

  model = {
    name: '',
    checkAdult: false,
    department: '',
    comment: ''
  }
  
  onSubmit(form: NgForm): void {
    
    console.log('Form values', form);

  }
}
