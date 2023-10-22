import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../../interface/auth';
import { UserService } from '@modules/auth/services/user.service';
import { User } from '@modules/auth/interface/user';


@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  private formBuilder: FormBuilder = inject(FormBuilder); 
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);

  hide = true;
  minLength: number = 4; 

  formLogin!: FormGroup;
  mailFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group ({
      user: this.mailFormControl,
      password: this.passwordFormControl,
    })

  }

  onSubmit():void{
    debugger
    let valid:boolean = this.validateAuth();    

    if(valid){
      // TODO: terminar validación
      // TODO: redirigir a algún lado cuando se autoriza 
      // this.router.navigate(['/crypto'])
      console.log("éxito");
    } else {
      console.log("error");
      this.launchError(); 
      this.formLogin.reset();
    }
  }
  
  validateAuth(): boolean {
   
    this.userService.getUser(this.mailFormControl.value!!).subscribe({
      next: (user: User) => {
        if (user.id == this.mailFormControl.value && user.password == this.passwordFormControl.value) return true
        return false
      },
      error: (err: Error) => {
        // console.error('Observer got an error: ' + err);
      }
    })

 
    return false
  }

  launchError(): void{
    this._snackBar.open('Invalid email or password!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    })
  }
  
}

