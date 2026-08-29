import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  role: string = 'user';

  menuOpen = false;

  userName: string = '';
  userEmail: string = '';
  avatarUrl: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private themeService: ThemeService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'user';
    this.loadCurrentUser();
  }

  // بنجيب بيانات اليوزر (الاسم والإيميل والصورة) عشان
  // نوريها في زرار البروفايل والمينيو بار
  loadCurrentUser(): void {

    this.userService.getProfile().subscribe({

      next: (res) => {

        const user = res.user || res;

        this.userName = user.name || '';
        this.userEmail = user.email || '';
        this.avatarUrl = user.avatar || '';

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(
          'Navbar: failed to load user',
          err
        );

        this.cdr.detectChanges();
      }

    });
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  // ================= THEME ================= //

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get homeLink(): string {
    return '/home';
  }

  // أول حرف من الاسم، بيتعرض بدل الصورة لو مفيش صورة مرفوعة
  get initials(): string {
    return this.userName
      ? this.userName.charAt(0).toUpperCase()
      : 'U';
  }

  goBack(): void {
    this.location.back();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  // يقفل الدروب داون لو دست في أي حتة برا الأيقونة
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    const target = event.target as HTMLElement;

    if (!target.closest('.profile-menu-wrapper')) {
      this.menuOpen = false;
    }
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}