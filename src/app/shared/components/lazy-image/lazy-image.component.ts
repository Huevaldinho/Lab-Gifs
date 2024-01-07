import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-lazy-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent {
  //*Componente generico para imagenes
  public hasLoaded: boolean = false;

  @Input()
  public url !: string;
  @Input()
  public alt: string = '';

  ngOnInit(): void {
    if (!this.url) throw new Error('Url is required');
  }

  public onLoad(): void {
    this.hasLoaded = true;
  }

}
