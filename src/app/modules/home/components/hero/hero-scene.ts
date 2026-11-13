import type * as THREE_NS from 'three';
import { LOGOS, TechLogo } from '../../../../core/data/tech-logos';

type Three = typeof THREE_NS;

interface Layer {
  label: string;
  y: number;
  color: string;
  logos: TechLogo[];
  speed: number;
}

// The full stack, literally: three architecture layers with the official logos orbiting on each.
const LAYERS: Layer[] = [
  {
    label: 'FRONTEND · MOBILE',
    y: 1.7,
    color: '#22d3ee',
    logos: [LOGOS.angular, LOGOS.react, LOGOS.typescript, LOGOS.tailwind, LOGOS.android, LOGOS.ios],
    speed: 0.22,
  },
  {
    label: 'BACKEND · REAL-TIME',
    y: 0,
    color: '#34d399',
    logos: [LOGOS.node, LOGOS.express, LOGOS.nest, LOGOS.supabase, LOGOS.firebase, LOGOS.socketio],
    speed: -0.16,
  },
  {
    label: 'DATA · INFRA',
    y: -1.7,
    color: '#a78bfa',
    logos: [LOGOS.mongodb, LOGOS.postgres, LOGOS.redis, LOGOS.docker, LOGOS.webrtc],
    speed: 0.12,
  },
];

const HEX_RADIUS = 2.25;
const LOGO_RADIUS = 1.55;
const PACKETS = 46;

/**
 * Interactive 3D hero: a hexagonal full-stack architecture. Each layer carries a ring of
 * official tech logos, pillars connect the layers and data packets flow between them.
 * Framework-agnostic — HeroComponent creates it in the browser only.
 */
export class HeroScene {
  private renderer: THREE_NS.WebGLRenderer;
  private scene: THREE_NS.Scene;
  private camera: THREE_NS.PerspectiveCamera;
  private clock: THREE_NS.Clock;
  private root: THREE_NS.Group;
  private labels: THREE_NS.Group;
  private rings: { group: THREE_NS.Group; speed: number }[] = [];
  private cores: THREE_NS.Mesh[] = [];
  private packets!: THREE_NS.Points;
  private packetState: { x: number; z: number; y: number; dir: number; speed: number }[] = [];
  private stars: THREE_NS.Points;

  private frame = 0;
  private running = false;
  private pointer = { x: 0, y: 0 };
  private eased = { x: 0, y: 0 };
  private scrollFade = 0;
  private disposables: Array<{ dispose(): void }> = [];

  constructor(private T: Three, private host: HTMLElement, private reducedMotion: boolean) {
    this.renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    host.appendChild(this.renderer.domElement);

    this.scene = new T.Scene();
    this.camera = new T.PerspectiveCamera(40, 1, 0.1, 100);
    this.clock = new T.Clock();

    this.root = new T.Group();
    this.root.rotation.x = 0.42;
    this.scene.add(this.root);

    // Labels follow the tilt but not the spin, so they always face the viewer in front of their layer.
    this.labels = new T.Group();
    this.scene.add(this.labels);

    LAYERS.forEach((layer) => this.createLayer(layer));
    this.createPillars();
    this.createPackets();
    this.stars = this.createStars();

    this.resize();
  }

  // ---------- Textures ----------

  /** Logo tile: dark rounded badge with a brand-coloured glow and the official mark. */
  private logoTexture(logo: TechLogo): THREE_NS.CanvasTexture {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d')!;
    const pad = 44;
    const box = size - pad * 2;

    ctx.shadowColor = logo.color;
    ctx.shadowBlur = 34;
    this.roundRect(ctx, pad, pad, box, box, 38);
    ctx.fillStyle = 'rgba(12, 14, 24, 0.94)';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = logo.color + 'aa';
    ctx.stroke();

    const iconSize = box * 0.56;
    ctx.save();
    ctx.translate(size / 2 - iconSize / 2, size / 2 - iconSize / 2);
    ctx.scale(iconSize / 24, iconSize / 24);
    ctx.fillStyle = logo.color;
    ctx.fill(new Path2D(logo.path));
    ctx.restore();

    return this.toTexture(c);
  }

  private labelTexture(text: string, color: string): { tex: THREE_NS.CanvasTexture; aspect: number } {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d')!;
    const font = '600 30px "JetBrains Mono", ui-monospace, monospace';
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width) + 48;
    c.width = w;
    c.height = 56;
    ctx.font = font;
    this.roundRect(ctx, 2, 2, w - 4, 52, 26);
    ctx.fillStyle = 'rgba(8, 10, 18, 0.85)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color + '88';
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 24, 29);
    return { tex: this.toTexture(c), aspect: w / 56 };
  }

  private toTexture(canvas: HTMLCanvasElement): THREE_NS.CanvasTexture {
    const tex = new this.T.CanvasTexture(canvas);
    tex.colorSpace = this.T.SRGBColorSpace;
    tex.anisotropy = 4;
    this.disposables.push(tex);
    return tex;
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ---------- Construction ----------

  private createLayer(layer: Layer): void {
    const T = this.T;
    const color = new T.Color(layer.color);
    const plate = new T.Group();
    plate.position.y = layer.y;
    this.root.add(plate);

    // Hexagon plate: faint fill + glowing outline + inner dashed ring
    const hexGeo = new T.CircleGeometry(HEX_RADIUS, 6);
    hexGeo.rotateX(-Math.PI / 2);
    const fillMat = new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.06, side: T.DoubleSide, depthWrite: false });
    plate.add(new T.Mesh(hexGeo, fillMat));

    const edgeGeo = new T.EdgesGeometry(hexGeo, 1);
    const edgeMat = new T.LineBasicMaterial({ color, transparent: true, opacity: 0.75 });
    plate.add(new T.LineSegments(edgeGeo, edgeMat));

    const ringGeo = new T.RingGeometry(LOGO_RADIUS - 0.006, LOGO_RADIUS + 0.006, 128);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, side: T.DoubleSide, depthWrite: false });
    plate.add(new T.Mesh(ringGeo, ringMat));
    this.disposables.push(hexGeo, fillMat, edgeGeo, edgeMat, ringGeo, ringMat);

    // Glowing core at the centre of each layer
    const coreGeo = new T.SphereGeometry(0.11, 24, 24);
    const coreMat = new T.MeshBasicMaterial({ color });
    const core = new T.Mesh(coreGeo, coreMat);
    plate.add(core);
    this.cores.push(core);
    this.disposables.push(coreGeo, coreMat);

    // Layer label centred just in front of the plate, always drawn on top
    const { tex, aspect } = this.labelTexture(layer.label, layer.color);
    const labelMat = new T.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false });
    const label = new T.Sprite(labelMat);
    label.scale.set(0.17 * aspect, 0.17, 1);
    label.position.set(0, layer.y - 0.05, HEX_RADIUS * 0.87 + 0.25);
    label.renderOrder = 10;
    this.labels.add(label);
    this.disposables.push(labelMat);

    // Spinning ring of logos with spokes to the core
    const ring = new T.Group();
    plate.add(ring);
    const spokePts: number[] = [];
    layer.logos.forEach((logo, i) => {
      const a = (i / layer.logos.length) * Math.PI * 2;
      const x = Math.cos(a) * LOGO_RADIUS;
      const z = Math.sin(a) * LOGO_RADIUS;
      const mat = new T.SpriteMaterial({ map: this.logoTexture(logo), transparent: true, depthWrite: false });
      const sprite = new T.Sprite(mat);
      sprite.scale.set(0.78, 0.78, 1);
      sprite.position.set(x, 0.36, z);
      ring.add(sprite);
      this.disposables.push(mat);
      spokePts.push(0, 0, 0, x, 0, z, x, 0, z, x, 0.2, z);
    });
    const spokeGeo = new T.BufferGeometry();
    spokeGeo.setAttribute('position', new T.Float32BufferAttribute(spokePts, 3));
    const spokeMat = new T.LineBasicMaterial({ color, transparent: true, opacity: 0.22 });
    ring.add(new T.LineSegments(spokeGeo, spokeMat));
    this.disposables.push(spokeGeo, spokeMat);

    this.rings.push({ group: ring, speed: layer.speed });
  }

  /** Vertical pillars at the hexagon corners plus the central API spine. */
  private createPillars(): void {
    const T = this.T;
    const top = LAYERS[0].y;
    const bottom = LAYERS[LAYERS.length - 1].y;
    const pts: number[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const x = Math.cos(a) * HEX_RADIUS;
      const z = Math.sin(a) * HEX_RADIUS;
      pts.push(x, bottom, z, x, top, z);
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute(pts, 3));
    const mat = new T.LineBasicMaterial({ color: 0x8b9cff, transparent: true, opacity: 0.16 });
    this.root.add(new T.LineSegments(geo, mat));

    const spineGeo = new T.CylinderGeometry(0.018, 0.018, top - bottom, 8);
    const spineMat = new T.MeshBasicMaterial({ color: 0x7c5cff, transparent: true, opacity: 0.8 });
    this.root.add(new T.Mesh(spineGeo, spineMat));
    this.disposables.push(geo, mat, spineGeo, spineMat);
  }

  /** Glowing data packets travelling up and down the pillars and the spine. */
  private createPackets(): void {
    const T = this.T;
    const top = LAYERS[0].y;
    const bottom = LAYERS[LAYERS.length - 1].y;
    const positions = new Float32Array(PACKETS * 3);
    const colors = new Float32Array(PACKETS * 3);
    const palette = [new T.Color('#22d3ee'), new T.Color('#34d399'), new T.Color('#a78bfa'), new T.Color('#f472b6')];

    for (let i = 0; i < PACKETS; i++) {
      const lane = i % 7; // 6 corner pillars + the spine
      const a = (lane / 6) * Math.PI * 2;
      const r = lane === 6 ? 0 : HEX_RADIUS;
      this.packetState.push({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        y: bottom + Math.random() * (top - bottom),
        dir: Math.random() > 0.5 ? 1 : -1,
        speed: 0.5 + Math.random() * 0.9,
      });
      palette[i % palette.length].toArray(colors, i * 3);
    }

    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(positions, 3));
    geo.setAttribute('color', new T.BufferAttribute(colors, 3));
    const mat = new T.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: T.AdditiveBlending,
      depthWrite: false,
      map: this.dotTexture(),
    });
    this.packets = new T.Points(geo, mat);
    this.root.add(this.packets);
    this.disposables.push(geo, mat);
    this.updatePackets(0);
  }

  private dotTexture(): THREE_NS.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return this.toTexture(c);
  }

  private createStars(): THREE_NS.Points {
    const T = this.T;
    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 8;
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(positions, 3));
    const mat = new T.PointsMaterial({ color: 0xb9c2ff, size: 0.045, transparent: true, opacity: 0.6, depthWrite: false });
    this.disposables.push(geo, mat);
    const stars = new T.Points(geo, mat);
    this.scene.add(stars);
    return stars;
  }

  // ---------- Runtime ----------

  setPointer(x: number, y: number): void {
    this.pointer.x = x;
    this.pointer.y = y;
  }

  /** 0 = hero fully on screen, 1 = scrolled away. */
  setScroll(progress: number): void {
    this.scrollFade = Math.min(Math.max(progress, 0), 1);
  }

  resize(): void {
    const w = this.host.clientWidth || 1;
    const h = this.host.clientHeight || 1;
    const aspect = w / h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = aspect;
    // Keep the whole structure in frame for tall/narrow stages.
    this.camera.position.set(0, 0.3, aspect < 0.9 ? 12 : aspect < 1.3 ? 10 : 9.2);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
    if (this.reducedMotion) this.render(0, 0);
  }

  start(): void {
    if (this.running) return;
    if (this.reducedMotion) {
      this.render(1.2, 0);
      return;
    }
    this.running = true;
    this.clock.start();
    let last = 0;
    const loop = () => {
      if (!this.running) return;
      const t = this.clock.getElapsedTime();
      this.render(t, Math.min(t - last, 0.05));
      last = t;
      this.frame = requestAnimationFrame(loop);
    };
    this.frame = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frame);
    this.clock.stop();
  }

  private updatePackets(dt: number): void {
    const top = LAYERS[0].y;
    const bottom = LAYERS[LAYERS.length - 1].y;
    const pos = this.packets.geometry.getAttribute('position') as THREE_NS.BufferAttribute;
    this.packetState.forEach((p, i) => {
      p.y += p.dir * p.speed * dt;
      if (p.y > top) {
        p.y = top;
        p.dir = -1;
      } else if (p.y < bottom) {
        p.y = bottom;
        p.dir = 1;
      }
      pos.setXYZ(i, p.x, p.y, p.z);
    });
    pos.needsUpdate = true;
  }

  private render(t: number, dt: number): void {
    this.eased.x += (this.pointer.x - this.eased.x) * 0.05;
    this.eased.y += (this.pointer.y - this.eased.y) * 0.05;

    this.root.rotation.y = t * 0.1 + this.eased.x * 0.55;
    this.root.rotation.x = 0.42 - this.eased.y * 0.18;
    this.root.position.y = Math.sin(t * 0.6) * 0.08 + this.scrollFade * 1.4;
    this.root.scale.setScalar(1 - this.scrollFade * 0.2);
    this.labels.rotation.x = this.root.rotation.x;
    this.labels.position.y = this.root.position.y;
    this.labels.scale.copy(this.root.scale);

    this.rings.forEach((r) => (r.group.rotation.y = t * r.speed));
    this.cores.forEach((c, i) => c.scale.setScalar(1 + Math.sin(t * 2.4 + i * 1.3) * 0.25));
    this.updatePackets(dt);

    this.stars.rotation.y = t * 0.01 + this.eased.x * 0.06;

    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.stop();
    this.disposables.forEach((d) => d.dispose());
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
