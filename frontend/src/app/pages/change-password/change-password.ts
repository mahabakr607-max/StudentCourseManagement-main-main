import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterModule
} from '@angular/router';

import { UserService } from '../../services/user';
import { Navbar } from '../navbar/navbar';
@Component({
  selector: 'app-change-password',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Navbar
  ],

  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePasswordComponent {

  formData = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  msg = '';

  errorMsg = '';

  saving = false;


  constructor(
    private userService: UserService,
    private router: Router
  ) {}


  onSubmit(): void {

    this.msg = '';

    this.errorMsg = '';

    if (
      !this.formData.oldPassword ||
      !this.formData.newPassword ||
      !this.formData.confirmNewPassword
    ) {

      this.errorMsg =
        'Please fill all fields.';

      return;
    }


    if (
      this.formData.newPassword !==
      this.formData.confirmNewPassword
    ) {

      this.errorMsg =
        'New password and confirmation do not match.';

      return;
    }


    this.saving = true;


    this.userService
      .changePassword(this.formData)
      .subscribe({

        next: (res) => {

          this.msg =
            res.msg ||
            'Password changed successfully';

          this.saving = false;

          setTimeout(() => {

            this.router.navigate([
              '/profile'
            ]);

          }, 1000);

        },

        error: (err) => {

          console.error(
            'Change password error:',
            err
          );

          this.errorMsg =
            err.error?.msg ||
            err.error?.message ||
            'Failed to change password';

          this.saving = false;
        }

      });
  }
}