import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../../interface/auth';


@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  private formBuilder: FormBuilder = inject(FormBuilder); 
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);

  hide = true;
  minLength: number = 4; 

  formLogin!: FormGroup;
  userFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group ({
      user: this.userFormControl,
      password: this.passwordFormControl,
    })
  }

  onSubmit():void{
    // TODO: verificación

    let valid:boolean = true; 
    this.validateAuth();

    if(valid){
      this.router.navigate(['/crypto'])
    } else {
      this.launchError(); 
      this.formLogin.reset();
    }
  }
  
  validateAuth() {
    throw new Error('Method not implemented.');
  }

  launchError(): void{
    this._snackBar.open('Invalid user or password!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    })
  }
  
}

