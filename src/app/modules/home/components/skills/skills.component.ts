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
import { SKILL_GROUPS } from '../../../../core/data/portfolio.data';
import { findLogo } from '../../../../core/data/tech-logos';

interface SphereTag {
  label: string;
  hue: number;
  x: number;
  y: number;
  z: number;
}

const HUES = [258, 190, 320, 160, 30, 220, 12, 235];

/** Font Awesome icon per skill; skills without a free brand icon fall back to a monogram. */
const SKILL_ICONS: Record<string, string> = {
  Angular: 'fab fa-angular',
  'React.js': 'fab fa-react',
  'React Native': 'fab fa-react',
  HTML5: 'fab fa-html5',
  CSS3: 'fab fa-css3-alt',
  JavaScript: 'fab fa-js',
  Bootstrap: 'fab fa-bootstrap',
  'Node.js': 'fab fa-node-js',
  'RESTful APIs': 'fas fa-plug',
  MongoDB: 'fas fa-leaf',
  SQL: 'fas fa-database',
  WebRTC: 'fas fa-video',
  mediasoup: 'fas fa-tower-broadcast',
  WebSockets: 'fas fa-bolt',
  BullMQ: 'fas fa-list-check',
  Docker: 'fab fa-docker',
  'Docker Compose': 'fas fa-cubes-stacked',
  Git: 'fab fa-git-alt',
  GitHub: 'fab fa-github',
  Postman: 'fas fa-paper-plane',
  'Data Structures & Algorithms': 'fas fa-sitemap',
  'Software Engineering': 'fas fa-gears',
  Python: 'fab fa-python',
  'Frappe / ERPNext': 'fas fa-cube',
  OpenAI: 'fas fa-robot',
  Excel: 'fas fa-file-excel',
  'Web Scraping': 'fas fa-spider',
  'Tesseract OCR': 'fas fa-file-image',
};

const MONOGRAMS: Record<string, string> = {
  TypeScript: 'TS',
  'Tailwind CSS': 'TW',
  'Express.js': 'Ex',
  'Nest.js': 'Ne',
  Firebase: 'Fb',
  Supabase: 'Sb',
  PostgreSQL: 'Pg',
  Redis: 'Rd',
};
const IDLE_X = 0.0018;
const IDLE_Y = 0.0032;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sphere', { static: true }) sphere!: ElementRef<HTMLElement>;
  @ViewChildren('tag') tagEls!: QueryList<ElementRef<HTMLElement>>;

  groups = SKILL_GROUPS.map((g, gi) => ({
    ...g,
    hue: HUES[gi % HUES.length],
    tiles: g.items.map((label) => ({
      label,
      hasLogo: !!findLogo(label),
      icon: SKILL_ICONS[label] ?? '',
      mono: MONOGRAMS[label] ?? label.slice(0, 2),
    })),
  }));
  tags: SphereTag[] = this.buildTags();

  private frame = 0;
  private cleanup: Array<() => void> = [];

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  /** Spread every skill evenly over a unit sphere (Fibonacci lattice). */
  private buildTags(): SphereTag[] {
    const items = this.groups.flatMap((g, gi) => g.items.map((label) => ({ label, hue: HUES[gi % HUES.length] })));
    const n = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return items.map((item, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return { ...item, x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r };
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.zone.runOutsideAngular(() => this.animate(reduced));
  }

  private animate(reduced: boolean): void {
    const host = this.sphere.nativeElement;
    const els = this.tagEls.map((e) => e.nativeElement);
    const idleX = reduced ? 0 : IDLE_X;
    const idleY = reduced ? 0 : IDLE_Y;
    let radius = host.clientWidth / 2.4;
    let rotX = 0.3;
    let rotY = 0;
    let velX = idleX;
    let velY = idleY;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = false;

    const draw = () => {
      const sx = Math.sin(rotX);
      const cx = Math.cos(rotX);
      const sy = Math.sin(rotY);
      const cy = Math.cos(rotY);
      this.tags.forEach((t, i) => {
        // Rotate around Y, then X.
        const x1 = t.x * cy + t.z * sy;
        const z1 = -t.x * sy + t.z * cy;
        const y2 = t.y * cx - z1 * sx;
        const z2 = t.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 = back, 1 = front
        const el = els[i];
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${0.6 + depth * 0.55})`;
        el.style.opacity = String(0.2 + depth * 0.8);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.3 ? 'blur(1px)' : '';
      });
    };

    const loop = () => {
      if (!dragging) {
        rotX += velX;
        rotY += velY;
        // Ease back towards the idle spin after a flick.
        velX += (idleX - velX) * 0.02;
        velY += (idleY - velY) * 0.02;
      }
      draw();
      this.frame = visible ? requestAnimationFrame(loop) : 0;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      host.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velY = (e.clientX - lastX) * 0.004;
      velX = -(e.clientY - lastY) * 0.004;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += velY;
      rotX += velX;
      draw();
    };
    const onUp = () => (dragging = false);

    host.addEventListener('pointerdown', onDown);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerup', onUp);
    host.addEventListener('pointercancel', onUp);

    const resize = new ResizeObserver(() => {
      radius = host.clientWidth / 2.4;
      draw();
    });
    resize.observe(host);

    // Only spin while the sphere is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !this.frame) this.frame = requestAnimationFrame(loop);
    });
    io.observe(host);

    draw();

    this.cleanup.push(
      () => host.removeEventListener('pointerdown', onDown),
      () => host.removeEventListener('pointermove', onMove),
      () => host.removeEventListener('pointerup', onUp),
      () => host.removeEventListener('pointercancel', onUp),
      () => resize.disconnect(),
      () => io.disconnect()
    );
  }

  ngOnDestroy(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.cleanup.forEach((fn) => fn());
  }
}
