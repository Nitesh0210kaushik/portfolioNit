import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { SERVICES } from '../../../../core/data/portfolio.data';

const TYPE_MS = 26;
const LINE_MS = 380;
const RESULT_MS = 500;
const HOLD_MS = 2600;
const START_MS = 300;

/**
 * "What I build": capability tabs + a terminal that "builds" the selected capability live.
 * Auto-cycles while on screen until the visitor picks a tab. Animation runs outside Angular's
 * zone and only re-renders this component.
 */
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stage', { static: true }) stage!: ElementRef<HTMLElement>;

  services = SERVICES;
  aiTools = ['Claude Code', 'Codex', 'OpenAI', 'Claude API'];

  active = 0;
  autoplay = true;
  // Server render shows the finished terminal; the browser replays it when scrolled into view.
  typed = SERVICES[0].prompt.length;
  shown = SERVICES[0].lines.length;
  done = true;

  private timers: ReturnType<typeof setTimeout>[] = [];
  private observer?: IntersectionObserver;
  private visible = false;
  private reduced = false;
  private browser: boolean;

  constructor(
    private host: ElementRef<HTMLElement>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.browser = isPlatformBrowser(platformId);
  }

  get current() {
    return this.services[this.active];
  }

  /** Logo shown in the terminal badge for the current tool. */
  get toolLogo(): string {
    return ({ 'claude-code': 'Claude Code', codex: 'Codex' } as Record<string, string>)[this.current.tool] ?? 'zsh';
  }

  get typedPrompt(): string {
    return this.current.prompt.slice(0, this.typed);
  }

  /** Total length of one service's animation — drives the tab's progress bar. */
  get duration(): number {
    const s = this.current;
    return START_MS + s.prompt.length * TYPE_MS + s.lines.length * LINE_MS + RESULT_MS + HOLD_MS;
  }

  ngAfterViewInit(): void {
    if (!this.browser) return;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduced) {
      this.autoplay = false;
      this.cdr.detectChanges();
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          const wasVisible = this.visible;
          this.visible = entry.isIntersecting;
          if (this.visible && !wasVisible) this.play(this.active);
          if (!this.visible) this.clear();
        },
        { threshold: 0.3 }
      );
      this.observer.observe(this.host.nativeElement);
    });
  }

  select(i: number): void {
    this.autoplay = false;
    // Stacked layout (phones/tablets): bring the terminal back into view so the change is visible.
    if (this.browser && window.innerWidth < 1024) {
      const rect = this.stage.nativeElement.getBoundingClientRect();
      if (rect.bottom < 120 || rect.top > window.innerHeight) {
        this.stage.nativeElement.scrollIntoView({ behavior: this.reduced ? 'auto' : 'smooth', block: 'center' });
      }
    }
    if (this.reduced || !this.browser) {
      this.active = i;
      this.finish();
      return;
    }
    this.zone.runOutsideAngular(() => this.play(i));
  }

  private play(i: number): void {
    this.clear();
    this.active = i;
    this.typed = 0;
    this.shown = 0;
    this.done = false;
    this.render();

    const s = this.current;
    let t = START_MS;
    for (let c = 1; c <= s.prompt.length; c++) {
      this.later(t, () => (this.typed = c));
      t += TYPE_MS;
    }
    s.lines.forEach((_, k) => {
      t += LINE_MS;
      this.later(t, () => (this.shown = k + 1));
    });
    t += RESULT_MS;
    this.later(t, () => (this.done = true));

    if (this.autoplay) {
      this.timers.push(setTimeout(() => this.play((i + 1) % this.services.length), t + HOLD_MS));
    }
  }

  private finish(): void {
    this.clear();
    this.typed = this.current.prompt.length;
    this.shown = this.current.lines.length;
    this.done = true;
  }

  private later(ms: number, fn: () => void): void {
    this.timers.push(
      setTimeout(() => {
        fn();
        this.render();
      }, ms)
    );
  }

  private render(): void {
    this.cdr.detectChanges();
  }

  private clear(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  ngOnDestroy(): void {
    this.clear();
    this.observer?.disconnect();
  }
}
