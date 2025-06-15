import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() close = new EventEmitter<void>();

  closeMenu() {
    this.close.emit();
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.closeMenu();
  }

  openSocial(platform: string): void {
    let url = '';

    switch (platform) {
      case 'x':
        url = 'https://x.com/';
        break;
      case 'facebook':
        url = 'https://www.facebook.com';
        break;
      case 'instagram':
        url = 'https://www.instagram.com';
        break;
      case 'linkedin':
        url = 'https://www.linkedin.com/in/nitesh-kaushik-06a236234/';
        break;
      default:
        console.warn('Unknown platform:', platform);
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
