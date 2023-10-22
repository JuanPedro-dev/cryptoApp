import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from '../../interface/auth';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@modules/auth/services/user.service';
import { User } from '@modules/auth/interface/user';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  
  hide = true;
  minLength: number = 4;

  formLogin!: FormGroup;
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
  ]);
  passwordConfirmFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      id: this.emailFormControl,
      name: this.nameFormControl,
      password: this.passwordFormControl,
    });
  }

  onSubmit(): void {
    console.log(this.formLogin.value);
    
    this.userService.addUser(this.formLogin.value).subscribe({
      next: (user: User) => {
        // console.log(`Usuario agregado: {${user.id}, ${user.name}, ${user.password}}`);
      },
      error: (err: Error) => {
        console.error('Observer got an error: ' + err);
      }
    })

    // TODO: redirigir a la sección de criptomonedas
    this.router.navigate(['']);
    this.formLogin.reset();
  }
}
