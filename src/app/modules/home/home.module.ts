import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { TechLogoComponent } from './components/tech-logo/tech-logo.component';
import { RevealDirective } from './directives/reveal.directive';
import { TiltDirective } from './directives/tilt.directive';
import { ScrollFxDirective } from './directives/scroll-fx.directive';
import { SpotlightDirective } from './directives/spotlight.directive';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    TechLogoComponent,
    ServicesComponent,
    IntegrationsComponent,
    RevealDirective,
    TiltDirective,
    ScrollFxDirective,
    SpotlightDirective,
  ],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
