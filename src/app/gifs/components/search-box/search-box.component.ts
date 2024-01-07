import { Component, ElementRef,ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('searchInput')//* Bindea con el input del html
  public searchInput!: ElementRef<HTMLInputElement>;//Para que se inicialice "!:" sin tener que hacerlo en el constructor

  //Inyecta el servicio de gifs
  constructor(private gifsService:GifsService) { }

  searchTag() {
    const newTag : string = this.searchInput.nativeElement.value;//Obtiene el valor del input
    this.gifsService.searchTag(newTag);
    this.searchInput.nativeElement.value = '';//Limpia el input despues de la busqueda
  }

}
