import { Component } from '@angular/core';
import { EDUCATION } from '../../../../core/data/portfolio.data';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  /** Circumference of the score ring (r = 34). */
  readonly ring = 2 * Math.PI * 34;

  education = EDUCATION.map((e) => ({ ...e, pct: this.toFraction(e.score) }));

  /** "76%" → 0.76, "9.8 CGPA" → 0.98 */
  private toFraction(score: string): number {
    const n = parseFloat(score);
    if (isNaN(n)) return 0;
    return /cgpa/i.test(score) ? n / 10 : n / 100;
  }
}
