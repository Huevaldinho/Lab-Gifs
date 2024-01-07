import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/Gifs.interfaces';
import { LazyImageComponent } from "../../../shared/components/lazy-image/lazy-image.component";

@Component({
    selector: 'gifs-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [LazyImageComponent]
})
export class CardComponent {
  //Siempre recibe un Gif
  @Input()
  public gif!: Gif;

  constructor() {}


  ngOnInit (){
    if (!this.gif) throw new Error('Gif is required');
  }

}
