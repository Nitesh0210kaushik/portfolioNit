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

/**
 * Rotates an element in 3D towards the pointer and exposes --mx / --my
 * (pointer position in %) so styles can render a moving glare.
 * Disabled on touch devices and for users who prefer reduced motion.
 */
@Directive({ selector: '[appTilt]' })
export class TiltDirective implements OnInit, OnDestroy {
  @Input() tiltMax = 10;
  @Input() tiltScale = 1.02;

  private cleanup: Array<() => void> = [];
  private frame = 0;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const node = this.el.nativeElement;

    this.zone.runOutsideAngular(() => {
      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => {
          const rect = node.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const rx = (0.5 - py) * this.tiltMax * 2;
          const ry = (px - 0.5) * this.tiltMax * 2;
          node.style.transition = 'transform 0.12s ease-out';
          node.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${this.tiltScale}, ${this.tiltScale}, 1)`;
          node.style.setProperty('--mx', `${px * 100}%`);
          node.style.setProperty('--my', `${py * 100}%`);
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(this.frame);
        node.style.transition = '';
        node.style.transform = '';
      };
      node.addEventListener('pointermove', onMove);
      node.addEventListener('pointerleave', onLeave);
      this.cleanup.push(
        () => node.removeEventListener('pointermove', onMove),
        () => node.removeEventListener('pointerleave', onLeave)
      );
    });
  }

  ngOnDestroy(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.cleanup.forEach((fn) => fn());
  }
}
