import { Component } from '@angular/core';
import { INTEGRATIONS } from '../../../../core/data/portfolio.data';

/** "AI & Web3" — an animated integration hub, AI capabilities, blockchain and the Ovoform case study. */
@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrl: './integrations.component.scss',
})
export class IntegrationsComponent {
  data = INTEGRATIONS;

  // Apps sit on a circle around the AI core; x/y are % of the square hub.
  nodes = INTEGRATIONS.hub.map((app, i, all) => {
    const angle = (i / all.length) * Math.PI * 2 - Math.PI / 2;
    const x = +(50 + 39 * Math.cos(angle)).toFixed(2);
    const y = +(50 + 39 * Math.sin(angle)).toFixed(2);
    // Alternate the packet direction: data flows in to the AI and back out to the apps.
    const inbound = i % 2 === 0;
    return {
      ...app,
      x,
      y,
      path: inbound ? `M${x} ${y} L50 50` : `M50 50 L${x} ${y}`,
      begin: `${(i * 0.37).toFixed(2)}s`,
    };
  });

  blocks = [
    { height: '18,201', hash: '0x7a1f…e9c4', txs: 42 },
    { height: '18,202', hash: '0x3c90…b1d7', txs: 37 },
    { height: '18,203', hash: '0x9f3a…c21e', txs: 51 },
  ];

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
