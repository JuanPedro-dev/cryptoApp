import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { MyErrorStateMatcher } from '@core/interface/auth';
import { User } from '@core/interface/user';
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
  deleteModal: boolean = false;

  minLength: number = 4;
  hide = true;
  user: User = {
    id: '',
    name: '',
    password: '',
    favoritesCryptosName: [],
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
  favoritesFormControl = new FormControl([]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    if (history.state.data) {
      this.user = history.state.data;
    } else {
      this.userSubscription.add(
        this.userService.getUserById(this.authService.getUserMail()).subscribe({
          next: (user: User) => {
            this.user = user;
            this.nameFormControl.setValue(user.name);
            this.passwordFormControl.setValue(user.password);
            this.favoritesFormControl.setValue(user.favoritesCryptosName as never[]);
          },
          error: (e) => console.error(e),
        })
      );
    }

    this.formLogin = this.formBuilder.group({
      id: this.authService.getUserMail(),
      name: this.nameFormControl,
      password: this.passwordFormControl,
      favoritesCryptosName: this.favoritesFormControl
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

    this.router.navigate(['/crypto']);
    this.formLogin.reset();
  }

  deleteMe() {
    if (this.authService.getUserMail() == 'admin@gmail.com') {
      this.launchError();
    } else {
      this.userSubscription.add(
        this.userService.deleteUser(this.authService.getUserMail()).subscribe({
          next: () => {
            this.router.navigate(['/']);
            this.authService.logout();
          },
          error: (err) => console.log('Error: deleteMe()' + err),
        })
      );
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
