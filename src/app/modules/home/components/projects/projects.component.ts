import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { PROJECTS, Project, SIDE_PROJECTS } from '../../../../core/data/portfolio.data';

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stack', { static: true }) stack!: ElementRef<HTMLElement>;
  @ViewChildren('card') cardEls!: QueryList<ElementRef<HTMLElement>>;

  projects = PROJECTS;
  sideProjects = SIDE_PROJECTS;

  private cleanup: Array<() => void> = [];

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  host(p: Project): string {
    if (!p.link) return 'private build';
    return p.link.replace(/^https?:\/\//, '').replace(/[/?].*$/, '');
  }

  statusClass(p: Project): string {
    return p.status.toLowerCase().replace(/\s+/g, '-');
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.zone.runOutsideAngular(() => this.initStack());
  }

  /**
   * Scroll choreography for the project cards:
   *  - each card "opens" (tilts up from flat) as it rises into place → --enter
   *  - on large screens cards stick and stack; the card underneath shrinks and dims → --cover
   * Stacking switches off automatically when a card is taller than the viewport (small laptops, phones).
   */
  private initStack(): void {
    const stackEl = this.stack.nativeElement;
    const cards = this.cardEls.map((c) => c.nativeElement);
    const navH = 76;
    let stacked = false;
    let ticking = false;

    const layout = () => {
      const vh = window.innerHeight;
      const wide = window.innerWidth >= 1024;
      const fits = cards.every((c, i) => c.offsetHeight <= vh - (navH + 20 + i * 16) - 16);
      stacked = wide && fits;
      stackEl.classList.toggle('stacked', stacked);
      update();
    };

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const enter: number[] = cards.map((c, i) => {
        const top = c.getBoundingClientRect().top;
        const target = stacked ? navH + 20 + i * 16 : vh * 0.3;
        return clamp((vh - top) / Math.max(vh - target, 1));
      });
      cards.forEach((c, i) => {
        c.style.setProperty('--enter', easeOut(enter[i]).toFixed(4));
        const cover = stacked && i < cards.length - 1 ? enter[i + 1] : 0;
        c.style.setProperty('--cover', cover.toFixed(4));
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(layout);
    ro.observe(stackEl);
    window.addEventListener('resize', layout, { passive: true });
    layout();

    this.cleanup.push(
      () => window.removeEventListener('scroll', onScroll),
      () => window.removeEventListener('resize', layout),
      () => ro.disconnect()
    );
  }

  ngOnDestroy(): void {
    this.cleanup.forEach((fn) => fn());
  }
}
