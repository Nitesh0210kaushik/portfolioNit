import { Component } from '@angular/core';
import { findLogo } from '../../core/data/tech-logos';

const lane = (labels: string[]) => labels.map((label) => ({ label, color: findLogo(label)?.color ?? '#7c5cff' }));

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Two lanes of official-logo pills for the tech ticker between the hero and About.
  lanes = [
    lane(['Angular', 'React.js', 'React Native', 'Node.js', 'Nest.js', 'Express.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Tailwind CSS']),
    lane(['Firebase', 'Supabase', 'Redis', 'Docker', 'WebRTC', 'WebSockets', 'Stripe', 'Claude Code', 'Codex', 'Android', 'iOS', 'GitHub']),
  ];
}
