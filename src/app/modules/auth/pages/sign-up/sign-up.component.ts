import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from '../../../../core/interface/auth';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interface/user';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private subs: Subscription = new Subscription();

  hide = true;
  minLength: number = 4;

  formLogin!: FormGroup;
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
  ]);
  passwordConfirmFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLength),
  ]);
  favoritesCryptosNameFormControl = new FormControl([]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      id: this.emailFormControl,
      name: this.nameFormControl,
      password: this.passwordFormControl,
      favoritesCryptosName: this.favoritesCryptosNameFormControl
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit(): void {
    // console.log(this.formLogin.value);
    try {
      this.subs.add(
        this.userService.addUser(this.formLogin.value).subscribe({
          next: (user: User) => {
            if (user != undefined) {
              this.authService.login(user.id);
              this.router.navigate(['/crypto']);
              this.formLogin.reset();
            } else {
              this.launchError()
            }
          },
          error: (err: Error) => console.error('Observer got an error: ' + err),
        })
      );
    } catch (err) { console.log("try error" + err);}
  }

  launchError(): void {
    this._snackBar.open('¡El Usuario ya existe!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000,
    });
  }

}

