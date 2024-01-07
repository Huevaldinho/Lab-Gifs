import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GifsService } from './gifs/services/gifs.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HomeComponent } from './gifs/pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,SidebarComponent,HomeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Taller Services';

  constructor(){}

}
