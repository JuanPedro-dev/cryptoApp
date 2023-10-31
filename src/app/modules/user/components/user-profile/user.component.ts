import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { MyErrorStateMatcher } from '@modules/auth/interface/auth';
import { User } from '@modules/auth/interface/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private userSubscription: Subscription = new Subscription();

  minLength: number = 4;
  hide = true;
  user: User = {
    id: '',
    name: '',
    password: '',
  };

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
    if (history.state.data) {
      this.user = history.state.data;
    } else {
      this.userSubscription.add(
        this.userService.getUserById(this.authService.getUser()).subscribe({
          next: (user: User) => (this.user = user),
          error: (e) => console.error(e),
        })
      );
    }

    this.formLogin = this.formBuilder.group({
      id: this.authService.getUser(),
      name: this.nameFormControl,
      password: this.passwordFormControl,
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.userSubscription.add(
      this.userService.updateUser(this.formLogin.value).subscribe({
        next: (user: User) => {},
        error: (err: Error) => console.error('Observer got an error: ' + err),
      })
    );

    this.router.navigate(['/users/dashboard']);
    this.formLogin.reset();
  }

  deleteMe() {
    if (this.authService.getUser() == 'admin@gmail.com') {
      this.launchError();
    } else {
      this.userSubscription.add(
        this.userService.deleteUser(this.authService.getUser()).subscribe({
          next: () => {},
          error: (err) => console.log('Error: deleteMe()' + err),
        })
      );
      this.router.navigate(['/']);
      this.authService.logout();
    }
  }

  launchError(): void {
    this._snackBar.open('No puedes eliminar al admin!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
  

}
