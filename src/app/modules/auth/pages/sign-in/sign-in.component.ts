import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../../../../core/interface/auth';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interface/user';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private userSubscription: Subscription = new Subscription();

  hide = true;
  minLength: number = 4;

  formLogin!: FormGroup;
  mailFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {

    // Verifico que no este logueado, para redirigir

    let token = sessionStorage.getItem( 'token' ); 
    if( token ) this.router.navigate( ['/crypto'] );

    this.formLogin = this.formBuilder.group({
      user: this.mailFormControl,
      password: this.passwordFormControl,
    });
  }

  onSubmit(): void {
    const subscription = this.validateAuth().subscribe({
      next: (res: boolean) => {

        if (res) {
          this.authService.login(this.mailFormControl.value!)
          this.router.navigate(['/crypto']); 
        }
        else {
          this.launchError();
          this.formLogin.reset();
        }
      },
    }); 

    this.userSubscription.add(subscription);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  validateAuth(): Observable<boolean> {
    // Valida el front pero por si llega undefined o null
    const userMail: string = this.mailFormControl.value ?? '';
    const userPassword: string = this.passwordFormControl.value ?? '';

    return this.userService.getUserById(userMail).pipe(
      map((user: User) => {
        return user?.password == userPassword;
      }),
      catchError((error: boolean) => {
        console.error('Error fetching user:', error);
        return of(false);
      })
    );
  }

  launchError(): void {
    this._snackBar.open('Invalid email or password!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
