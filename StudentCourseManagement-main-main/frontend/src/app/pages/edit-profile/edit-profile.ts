import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserService } from '../../services/user';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-edit-profile',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Navbar
  ],

  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfileComponent implements OnInit {

  formData = {
    name: '',
    email: '',
    age: 0,
    avatar: ''
  };

  // بريفيو الصورة اللي هتتعرض في الصفحة (base64)
  avatarPreview: string = '';

  msg = '';

  errorMsg = '';

  loading = true;

  saving = false;


  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.loadProfile();
  }


  loadProfile(): void {

    this.loading = true;

    this.userService.getProfile().subscribe({

      next: (res) => {

        const user = res.user || res;

        this.formData = {
          name: user.name || '',
          email: user.email || '',
          age: user.age || 0,
          avatar: user.avatar || ''
        };

        this.avatarPreview = user.avatar || '';

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(
          'Load profile error:',
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


  // بتتنفذ لما اليوزر يختار صورة من جهازه
  onAvatarSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // تحقق بسيط: لازم تكون صورة وحجمها معقول
    if (!file.type.startsWith('image/')) {

      this.errorMsg = 'Please select a valid image file.';

      return;
    }

    if (file.size > 2 * 1024 * 1024) {

      this.errorMsg = 'Image size must be less than 2MB.';

      return;
    }

    this.errorMsg = '';

    const reader = new FileReader();

    reader.onload = () => {

      const base64 = reader.result as string;

      this.avatarPreview = base64;

      this.formData.avatar = base64;
    };

    reader.readAsDataURL(file);
  }


  removeAvatar(): void {

    this.avatarPreview = '';

    this.formData.avatar = '';
  }


  onSubmit(): void {

    this.msg = '';

    this.errorMsg = '';

    this.saving = true;

    this.userService
      .updateProfile(this.formData)
      .subscribe({

        next: (res) => {

          this.msg =
            res.msg ||
            'Profile updated successfully';

          this.saving = false;
        },

        error: (err) => {

          console.error(
            'Update profile error:',
            err
          );

          this.errorMsg =
            err.error?.msg ||
            err.error?.message ||
            'Failed to update profile';

          this.saving = false;
        }

      });
  }
}