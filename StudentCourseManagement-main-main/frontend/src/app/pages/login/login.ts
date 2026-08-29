import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {

    console.log('Login button clicked');

    console.log(
      'Form value:',
      this.loginForm.value
    );

    console.log(
      'Form valid:',
      this.loginForm.valid
    );

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe({

      next: (response) => {   

        console.log('LOGIN RESPONSE:', response);
        console.log('ROLE:', response.role);

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        // كل من الأدمن واليوزر بيروحوا لنفس صفحة الـ home بعد تسجيل الدخول
        this.router.navigate(['/home']);

      },

    });

  }

}