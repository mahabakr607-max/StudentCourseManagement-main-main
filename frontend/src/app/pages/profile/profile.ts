import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserService } from '../../services/user';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Navbar
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  user: any = null;

  loading = true;

  errorMsg = '';

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {

    this.loading = true;

    this.errorMsg = '';

    this.userService.getProfile().subscribe({

      next: (res) => {

        console.log(
          'Profile response:',
          res
        );

        this.user = res.user || res;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(
          'Profile error:',
          err
        );

        this.errorMsg =
          err.error?.msg ||
          err.error?.message ||
          'Failed to load profile';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }
}