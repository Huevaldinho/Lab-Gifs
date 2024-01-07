import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../components/search-box/search-box.component";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/Gifs.interfaces';
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [SearchBoxComponent, CardListComponent, PaginationComponent]
})
export class HomeComponent {

  constructor(private gifsService: GifsService) { }

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

  get totalResults(): number {
    return this.gifsService.totalResults;
  }

  get offSet(): number {
    return this.gifsService.offSet;
  }
  get offSetLimit() : number {
    return this.gifsService.offSetLimit;
  }

}
