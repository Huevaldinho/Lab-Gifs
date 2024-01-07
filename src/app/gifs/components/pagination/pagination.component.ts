import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'gifs-pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {

  @Input() public offSet: number = 0;
  @Input() public offSetLimit: number = 0;

  @ViewChild('selectLimit')//* Bindea con el input del html
  public selectLimit!: ElementRef<HTMLSelectElement>;//Para que se inicialice "!:" sin tener que hacerlo en el constructor

  public options: number[] = [10, 20, 30, 40, 50];


  constructor(private gifsService: GifsService) { }

  //*PUBLIC methods
  public changeOptionHandler(): void {
    this.gifsService.changeLimit(this.selectLimit.nativeElement.value);
  }

  /*
  * @param value: number -> 0: Anterior, 1: Siguiente
  */
  public handlePagination(value: number): void {
    value === 0 ? this.gifsService.previousPage() : this.gifsService.nextPage();
  }

  get results() : number {
    return this.gifsService.totalResults;
  }

}
