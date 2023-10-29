import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  
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
