import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, Form } from '@angular/forms';


import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


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