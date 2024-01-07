import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  //Inyecta el servicio de gifs
  constructor(private gifsService:GifsService) { }

  //Llama al servicio para obtener el historial de tags
  get tags() : string[] {
    return this.gifsService.tagsHistory;
  }

  //Llama al servicio para buscar gifs por tag
  searchTag(tag:string)  {
    this.gifsService.searchTag(tag);
    console.log(tag);
  }

}
