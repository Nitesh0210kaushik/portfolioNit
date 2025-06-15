import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // fixed typo: should be "styleUrls"
})
export class HomeComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  words = ['MEAN Stack Developer', 'Freelancer', 'Tech Enthusiast'];
  currentWordIndex = 0;
  currentCharIndex = 0;
  isDeleting = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.typeEffect();
    }
  }

  typeEffect() {
    const typingTextElement = document.querySelector(
      '.typing-text'
    ) as HTMLElement;

    const currentWord = this.words[this.currentWordIndex];
    let displayText = '';

    if (this.isDeleting) {
      this.currentCharIndex--;
      displayText = currentWord.substring(0, this.currentCharIndex);
    } else {
      this.currentCharIndex++;
      displayText = currentWord.substring(0, this.currentCharIndex);
    }

    typingTextElement.innerText = displayText;

    let typingSpeed = this.isDeleting ? 100 : 150;

    if (!this.isDeleting && displayText === currentWord) {
      typingSpeed = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && displayText === '') {
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      typingSpeed = 500;
    }

    setTimeout(() => this.typeEffect(), typingSpeed);
  }
}
