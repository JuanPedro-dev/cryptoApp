import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { 
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from '../../interface/auth';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../interface/user';
import { Subscription } from 'rxjs';

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
  private userSubscription: Subscription = new Subscription

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

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    console.log(this.formLogin.value);
    
    const subscription = this.userService.addUser(this.formLogin.value).subscribe({
      next: (user: User) => {
        // console.log(`Usuario agregado: {${user.id}, ${user.name}, ${user.password}}`);
      },
      error: (err: Error) => {
        console.error('Observer got an error: ' + err);
      }
    })

    this.userSubscription.add(subscription);

    this.router.navigate(['/crypto']);
    this.formLogin.reset();
  }
}
