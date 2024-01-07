import { Component, Input } from '@angular/core';

import { Gif } from '../../interfaces/Gifs.interfaces';
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'gifs-card-list',
    standalone: true,
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.css',
    imports: [CardComponent]
})
export class CardListComponent {

  @Input()
  public gifs : Gif[] = [];

  constructor() {}

}
