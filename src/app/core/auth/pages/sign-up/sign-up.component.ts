import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from '../../interface/auth';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  private formBuilder: FormBuilder = inject(FormBuilder); 
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  hide = true;
  minLength: number = 4; 

  formLogin!: FormGroup;
  userFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);
  passwordConfirmFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group ({
      user: this.userFormControl,
      password: this.passwordFormControl,
    })
  }

  onSubmit():void{
    // TODO: verificación
    if(true){

      this.router.navigate(['/auth/dashboard'])
    } else {
      this.launchError(); 
      this.formLogin.reset();
    }

  }

  launchError(): void{
    this._snackBar.open('Invalid user or password!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    })
  }
  }