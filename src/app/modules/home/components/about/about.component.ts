import { Component } from '@angular/core';
import { PROFILE } from '../../../../core/data/portfolio.data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  profile = PROFILE;

  facts = [
    { icon: 'fas fa-location-dot', label: 'Location', value: PROFILE.location },
    { icon: 'fas fa-graduation-cap', label: 'Education', value: 'MCA, Invertis University' },
    { icon: 'fas fa-envelope', label: 'Email', value: PROFILE.email, href: 'mailto:' + PROFILE.email },
    { icon: 'fas fa-phone', label: 'Phone', value: PROFILE.phone, href: PROFILE.phoneHref },
  ];

  focus = [
    { icon: 'fas fa-layer-group', title: 'Full-stack products', text: 'Angular / React frontends on Node.js, Nest.js & Express APIs.' },
    { icon: 'fas fa-bolt', title: 'Real-time systems', text: 'WebRTC, mediasoup, WebSockets, Redis & BullMQ.' },
    { icon: 'fas fa-mobile-screen', title: 'Mobile apps', text: 'Cross-platform Android & iOS apps with React Native.' },
  ];
}
