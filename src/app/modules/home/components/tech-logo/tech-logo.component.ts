import { Component, Input, OnChanges } from '@angular/core';
import { FALLBACK_ICONS, findLogo, TechLogo } from '../../../../core/data/tech-logos';

/** Renders a technology's official logo as inline SVG in its brand colour, or a stand-in icon when no official mark exists. */
@Component({
  selector: 'app-tech-logo',
  template: `
    <svg *ngIf="logo" viewBox="0 0 24 24" [attr.width]="size" [attr.height]="size" role="img" [attr.aria-label]="logo.title">
      <path [attr.d]="logo.path" [attr.fill]="mono ? 'currentColor' : logo.color" />
    </svg>
    <i *ngIf="!logo && fallback" [class]="fallback" [style.font-size.px]="size * 0.9" aria-hidden="true"></i>
  `,
  styles: [':host{display:inline-flex;align-items:center;justify-content:center;flex:none} svg{display:block}'],
})
export class TechLogoComponent implements OnChanges {
  @Input({ required: true }) name!: string;
  @Input() size = 14;
  @Input() mono = false;

  logo?: TechLogo;
  fallback?: string;

  ngOnChanges(): void {
    this.logo = findLogo(this.name);
    this.fallback = this.logo ? undefined : FALLBACK_ICONS[this.name.toLowerCase().trim()];
  }
}
