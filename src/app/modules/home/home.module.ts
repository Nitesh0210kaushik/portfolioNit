import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
