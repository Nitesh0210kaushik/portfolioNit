import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { PROFILE } from '../../../../core/data/portfolio.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  profile = PROFILE;
  links = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'integrations', label: 'AI & Web3' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  active = '';
  scrolled = false;
  menuOpen = false;
  progress = 0;

  private observer?: IntersectionObserver;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Scroll-spy: highlight the nav link of the section in the middle of the viewport.
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.zone.run(() => (this.active = entry.target.id));
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['home', ...this.links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer!.observe(el);
    });
    // A reload mid-page restores the scroll position, so the bar may already need its scrolled state;
    // render it now rather than changing bindings after this view was checked.
    this.onScroll();
    this.cdr.detectChanges();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY > 24;
    const progress = max > 0 ? window.scrollY / max : 0;
    if (scrolled !== this.scrolled || Math.abs(progress - this.progress) > 0.002) {
      this.scrolled = scrolled;
      this.progress = progress;
      this.cdr.markForCheck();
    }
  }

  toggleMenu(): void {
    this.setMenu(!this.menuOpen);
  }

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    this.setMenu(false);
  }

  // Leaving phone/tablet width with the menu open would otherwise keep the page locked.
  @HostListener('window:resize')
  onResize(): void {
    if (this.menuOpen && window.innerWidth > 1100) this.closeMenu();
  }

  go(id: string, event?: Event): void {
    event?.preventDefault();
    this.closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Lock the page behind the full-screen mobile menu so it doesn't scroll underneath.
  private setMenu(open: boolean): void {
    this.menuOpen = open;
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = open ? 'hidden' : '';
  }

  ngOnDestroy(): void {
    this.closeMenu();
    this.observer?.disconnect();
  }
}
