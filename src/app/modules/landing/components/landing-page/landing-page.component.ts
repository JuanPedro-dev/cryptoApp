import { Component, Input, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit{
  private authService: AuthService = inject(AuthService);
  
  @Input() isLoggedIn: Boolean = false;
  show: Boolean = false;
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  }

  contact = {
    fullName: '',
    city: '',
    email: '',
    comment: ''
  }
  model = {
    name: '',
    checkAdult: false,
    department: '',
    comment: ''
  }
  
  onSubmit(form: NgForm): void {
    console.log('Simulamos un envió de datos: ', form.value);

    this.show = true;
    form.reset(); 
  }

}
