import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storageKey = 'theme';

  private darkMode = false;

  constructor() {

    this.darkMode =
      localStorage.getItem(this.storageKey) === 'dark';

    this.applyTheme();
  }


  isDarkMode(): boolean {

    return this.darkMode;
  }


  // بيبدل بين الدارك واللايت وبيحفظ الاختيار
  // عشان يفضل ثابت حتى لو اليوزر عمل refresh أو رجع تاني
  toggleTheme(): void {

    this.darkMode = !this.darkMode;

    localStorage.setItem(
      this.storageKey,
      this.darkMode ? 'dark' : 'light'
    );

    this.applyTheme();
  }


  private applyTheme(): void {

    if (this.darkMode) {

      document.body.classList.add('dark-theme');

    } else {

      document.body.classList.remove('dark-theme');
    }
  }

}