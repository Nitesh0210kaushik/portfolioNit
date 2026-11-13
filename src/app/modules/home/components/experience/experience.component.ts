import { Component } from '@angular/core';
import { EXPERIENCE, Experience } from '../../../../core/data/portfolio.data';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  jobs = EXPERIENCE.map((job) => ({ ...job, initials: this.initials(job), duration: this.duration(job.period) }));

  private initials(job: Experience): string {
    // Capital letters give "VelocionTech" → "VT", "Korecent Solutions" → "KS".
    const name = job.company.replace(/pvt\.?|ltd\.?/gi, '').trim();
    return (name.match(/[A-Z]/g) ?? [name[0]]).slice(0, 2).join('');
  }

  /** "Sep 2023 – May 2025" → "1 yr 9 mos" (inclusive of both months). */
  private duration(period: string): string {
    const parts = period.match(/([A-Za-z]{3})\w*\s*(\d{4})/g);
    if (!parts || parts.length < 2) return '';
    const toIndex = (s: string) => {
      const [, m, y] = s.match(/([A-Za-z]{3})\w*\s*(\d{4})/)!;
      return Number(y) * 12 + MONTHS.indexOf(m.toLowerCase());
    };
    const months = toIndex(parts[1]) - toIndex(parts[0]) + 1;
    const y = Math.floor(months / 12);
    const m = months % 12;
    return [y ? `${y} yr${y > 1 ? 's' : ''}` : '', m ? `${m} mo${m > 1 ? 's' : ''}` : ''].filter(Boolean).join(' ');
  }
}
