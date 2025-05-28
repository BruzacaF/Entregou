import { DOCUMENT } from '@angular/common';
import { inject, Injectable, model, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly document = inject(DOCUMENT)
  private readonly currentTheme = signal<Theme>('light');
  readonly isDarkMode = signal<boolean>(false); 
  // This signal indicates whether the current theme is dark mode or not it is readonly and can only be set through the toggleTheme method.


 

  constructor() { }

  toggleTheme() {
    if (this.currentTheme() === 'light'){
      this.setTheme('dark');
      this.isDarkMode.set(true); 
    } else {
      this.setTheme('light');
      this.isDarkMode.set(false);
    }
  }

  setTheme(theme: Theme) {
     this.currentTheme.set(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark-mode');
    }
    else {
      this.document.documentElement.classList.remove('dark-mode');
    } 
  }

  getTheme() {
    return this.currentTheme;
  }

  isDarkModeEnabled() {
    return this.isDarkMode();
  }
  
}
