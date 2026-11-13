import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { PROFILE } from '../../../../core/data/portfolio.data';
import type { HeroScene } from './hero-scene';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stage', { static: true }) stage!: ElementRef<HTMLElement>;
  @ViewChild('typed', { static: true }) typed!: ElementRef<HTMLElement>;

  profile = PROFILE;

  stacks = [
    { name: 'MERN', parts: this.parts(['MongoDB', 'Express.js', 'React.js', 'Node.js']) },
    { name: 'MEAN', parts: this.parts(['MongoDB', 'Express.js', 'Angular', 'Node.js']) },
  ];
  extras = ['Nest.js', 'Supabase', 'Firebase', 'PostgreSQL', 'Redis', 'Docker'];

  private parts(labels: string[]) {
    return labels.map((label) => ({ label, letter: label[0] }));
  }

  private scene?: HeroScene;
  private destroyed = false;
  private typingTimer?: ReturnType<typeof setTimeout>;
  private cleanup: Array<() => void> = [];

  constructor(private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.zone.runOutsideAngular(() => {
      if (!reduced) this.type(0, 0, false);
      this.initScene(reduced);
    });
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Typewriter cycling through roles — writes to the DOM directly to avoid change detection. */
  private type(word: number, char: number, deleting: boolean): void {
    if (this.destroyed) return;
    const roles = this.profile.roles;
    const current = roles[word];
    char += deleting ? -1 : 1;
    this.typed.nativeElement.textContent = current.slice(0, char);

    let delay = deleting ? 45 : 85;
    if (!deleting && char === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && char === 0) {
      deleting = false;
      word = (word + 1) % roles.length;
      delay = 350;
    }
    this.typingTimer = setTimeout(() => this.type(word, char, deleting), delay);
  }

  private async initScene(reduced: boolean): Promise<void> {
    if (!this.supportsWebGL()) return;
    const [THREE, { HeroScene }] = await Promise.all([import('three'), import('./hero-scene')]);
    await Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1500))]);
    if (this.destroyed) return;

    const host = this.stage.nativeElement;
    const scene = new HeroScene(THREE, host, reduced);
    this.scene = scene;
    host.classList.add('ready');

    const onPointer = (e: PointerEvent) =>
      scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    // Fade from the stage's own position: on phones it sits below the copy, so using window.scrollY
    // had already lifted the scene out of frame by the time it scrolled into view.
    const onScroll = () => scene.setScroll(-host.getBoundingClientRect().top / window.innerHeight);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => scene.resize());
    resizeObserver.observe(host);

    // Only animate while the hero is actually visible.
    const visibility = new IntersectionObserver(([entry]) =>
      entry.isIntersecting && !document.hidden ? scene.start() : scene.stop()
    );
    visibility.observe(host);
    const onVisibility = () => (document.hidden ? scene.stop() : scene.start());
    document.addEventListener('visibilitychange', onVisibility);

    this.cleanup.push(
      () => window.removeEventListener('pointermove', onPointer),
      () => window.removeEventListener('scroll', onScroll),
      () => document.removeEventListener('visibilitychange', onVisibility),
      () => resizeObserver.disconnect(),
      () => visibility.disconnect()
    );
  }

  private supportsWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    clearTimeout(this.typingTimer);
    this.cleanup.forEach((fn) => fn());
    this.scene?.dispose();
  }
}
