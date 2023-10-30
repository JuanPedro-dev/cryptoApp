import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { MyErrorStateMatcher } from '@modules/auth/interface/auth';
import { User } from '@modules/auth/interface/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private userSubscription: Subscription = new Subscription;
  user!: User; 
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
    
    this.userService.getUserById(this.authService.getUser()).subscribe({
      next: (user: User) => this.user = user,
      error: (e) => console.error(e),
      complete: () => {}
  })

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
    // console.log(this.formLogin.value);
    
    const subscription = this.userService.updateUser(this.formLogin.value).subscribe({
      next: (user: User) => {
        // console.log(`Usuario agregado: {${user.id}, ${user.name}, ${user.password}}`);
      },
      error: (err: Error) => {
        console.error('Observer got an error: ' + err);
      }
    })

    this.userSubscription.add(subscription);

    this.router.navigate(['/users/dashboard']);
    this.formLogin.reset();
  }
}
