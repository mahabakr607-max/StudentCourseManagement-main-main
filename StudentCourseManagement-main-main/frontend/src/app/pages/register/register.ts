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
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

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
      ],

      confirmpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      age: [
        '',
       
      ]

    });

  }

  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }

  toggleConfirmPassword(): void {

    this.showConfirmPassword =
      !this.showConfirmPassword;

  }

  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    const {
      name,
      email,
      password,
      confirmpassword,
      age
    } = this.registerForm.value;

    if (password !== confirmpassword) {

      alert('Passwords do not match');

      return;
    }

    const data = {
      name,
      email,
      password,
      age: Number(age)
    };

    this.authService.register(data).subscribe({

      next: (response) => {

        alert(response.message);

        this.router.navigate(['/login']);

      },

      error: (error) => {

        alert(
          error.error?.message ||
          'Registration failed'
        );

      }

    });

  }

}