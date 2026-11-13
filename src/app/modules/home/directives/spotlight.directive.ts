import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

/** Tracks the pointer inside a card as --mx / --my so `.fx-card` can draw a glow that follows it. */
@Directive({ selector: '[appSpotlight]' })
export class SpotlightDirective implements OnInit, OnDestroy {
  private off?: () => void;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    const node = this.el.nativeElement;
    this.zone.runOutsideAngular(() => {
      const onMove = (e: PointerEvent) => {
        const r = node.getBoundingClientRect();
        node.style.setProperty('--mx', `${e.clientX - r.left}px`);
        node.style.setProperty('--my', `${e.clientY - r.top}px`);
      };
      node.addEventListener('pointermove', onMove, { passive: true });
      this.off = () => node.removeEventListener('pointermove', onMove);
    });
  }

  ngOnDestroy(): void {
    this.off?.();
  }
}
