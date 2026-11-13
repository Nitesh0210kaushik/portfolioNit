import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { PROFILE } from '../../../../core/data/portfolio.data';
import { HomeService } from '../../services/home.service';

type SendState = 'idle' | 'sending' | 'sent' | 'mailto';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  profile = PROFILE;
  contactForm!: FormGroup;
  state: SendState = 'idle';

  channels = [
    { icon: 'fas fa-envelope', label: 'Email', value: PROFILE.email, href: 'mailto:' + PROFILE.email },
    { icon: 'fas fa-phone', label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref },
    {
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn',
      value: 'nitesh-kaushik',
      href: 'https://www.linkedin.com/in/nitesh-kaushik-06a236234/',
    },
    { icon: 'fas fa-location-dot', label: 'Based in', value: PROFILE.location },
  ];

  constructor(private fb: FormBuilder, private homeService: HomeService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  invalid(name: string): boolean {
    const c = this.contactForm.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.state = 'sending';
    this.homeService
      .contactMe(this.contactForm.value)
      .pipe(timeout(12000))
      .subscribe({
        next: () => {
          this.state = 'sent';
          this.contactForm.reset();
        },
        // The API is unreachable — fall back to the visitor's email client so the message is never lost.
        error: () => {
          this.openMailClient();
          this.state = 'mailto';
        },
      });
  }

  reset(): void {
    this.state = 'idle';
  }

  private openMailClient(): void {
    const { name, email, subject, message } = this.contactForm.value;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
