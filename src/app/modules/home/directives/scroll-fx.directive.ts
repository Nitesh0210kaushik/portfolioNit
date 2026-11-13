import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

type FxMode = 'enter' | 'track';

interface FxItem {
  el: HTMLElement;
  mode: FxMode;
  start: number;
  end: number;
  delay: number;
  visible: boolean;
  last: number;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * One shared, passive scroll loop for every [appScrollFx] element.
 * Only elements near the viewport are measured each frame.
 */
class ScrollFxEngine {
  private items = new Set<FxItem>();
  private io?: IntersectionObserver;
  private byEl = new Map<Element, FxItem>();
  private ticking = false;
  private reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const item = this.byEl.get(e.target);
          if (item) item.visible = e.isIntersecting;
        }
        this.request();
      },
      { rootMargin: '25% 0px 25% 0px' }
    );
    window.addEventListener('scroll', this.request, { passive: true });
    window.addEventListener('resize', this.request, { passive: true });
  }

  add(item: FxItem): void {
    this.items.add(item);
    this.byEl.set(item.el, item);
    this.io!.observe(item.el);
    this.update(item, window.innerHeight);
  }

  remove(item: FxItem): void {
    this.items.delete(item);
    this.byEl.delete(item.el);
    this.io?.unobserve(item.el);
  }

  private request = () => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      const vh = window.innerHeight;
      this.items.forEach((item) => item.visible && this.update(item, vh));
    });
  };

  private update(item: FxItem, vh: number): void {
    let p = 1;
    if (!this.reduced) {
      const rect = item.el.getBoundingClientRect();
      if (item.mode === 'track') {
        // How far the element has been scrolled through a line at `start` of the viewport.
        p = clamp((vh * item.start - rect.top) / Math.max(rect.height, 1));
      } else {
        // 0 when the top edge is at `start` of the viewport, 1 when it reaches `end`.
        const raw = clamp((vh * item.start - rect.top) / (vh * (item.start - item.end)));
        p = easeOut(clamp((raw - item.delay) / (1 - item.delay)));
      }
    }
    if (Math.abs(p - item.last) > 0.001) {
      item.last = p;
      item.el.style.setProperty('--p', p.toFixed(4));
    }
  }
}

let engine: ScrollFxEngine | undefined;

/**
 * Exposes scroll progress to CSS as `--p` (0 → 1) so cards can "open" while you scroll.
 * Styles should use `var(--p, 1)` so server-rendered HTML shows the finished state.
 */
@Directive({ selector: '[appScrollFx]' })
export class ScrollFxDirective implements OnInit, OnDestroy {
  @Input() fxMode: FxMode = 'enter';
  /** Viewport fraction (from top) where progress starts. */
  @Input() fxStart = 1;
  /** Viewport fraction where progress completes (enter mode). */
  @Input() fxEnd = 0.6;
  /** 0–0.6 — stagger siblings that share a row. */
  @Input() fxDelay = 0;

  private item?: FxItem;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) return;
    this.zone.runOutsideAngular(() => {
      engine ??= new ScrollFxEngine();
      this.item = {
        el: this.el.nativeElement,
        mode: this.fxMode,
        start: this.fxStart,
        end: this.fxEnd,
        delay: Math.min(this.fxDelay, 0.6),
        visible: true,
        last: -1,
      };
      engine.add(this.item);
    });
  }

  ngOnDestroy(): void {
    if (this.item) engine?.remove(this.item);
  }
}
