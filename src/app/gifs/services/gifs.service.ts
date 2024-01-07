import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchResponse } from '../interfaces/Gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {


  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  public limit: string = '10';
  public totalResults: number = 0;
  public offSet: number = 0;

  private api_key: string = 'RiPz5h72WTGo9H4BRtCTcotV3HHeImbR';
  private service_url: string = 'https://api.giphy.com/v1/gifs';


  //La inyeccion crea el atributo http en la class
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }
  //*PRIVATE methods

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    //Case: tag already exists
    if (this._tagsHistory.includes(tag)) {
      //Quitat el tag de la lista
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }
    //Interta al incio de la lista (esté o no en el arreglo )
    this._tagsHistory.unshift(tag);

    //Limitar el tamaño de la lista
    this._tagsHistory = this._tagsHistory.splice(0, 10);//10 elementos

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);//Recupera el valor y lo convierte en un arreglo

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);//Busca el primer elemento de la lista
  }
  //*PUBLIC methods

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private handleOffSetChange(tag : string) : void{
    tag = tag.toLowerCase();
    if (this._tagsHistory[0].toLowerCase() === tag) return;
    this.offSet = this.totalResults =0;


  }
  public searchTag(tag: string): void {
    if (tag.trim().length === 0) return;//trim() elimina espacios en blanco al inicio y al final

    this.handleOffSetChange(tag);
    this.organizeHistory(tag);
    this.saveLocalStorage();

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('q', tag)
      .set('limit', this.limit)
      .set('offset',this.offSet.toString());
    //Get que me responde un json de SearchResponse
    this.http.get<SearchResponse>(`${this.service_url}/search`, { params })
      //Se subscribe al observable (espera la promesa)
      .subscribe(resp => {
        //Se programa lo que se quiere hacer con la respuesta
        this.gifList = resp.data;
        this.totalResults = resp.pagination.total_count;
      });

  }

  public changeLimit(limit: string): void {
    this.limit = limit;
    this.loadLocalStorage();
  }

  get offSetLimit():number{
    return this.offSet + parseInt(this.limit);
  }

  previousPage() : void {
    if (this.offSet - parseInt(this.limit) < 0){
      this.offSet = 0;
      return;
    }
    this.offSet -= parseInt(this.limit);
    this.loadLocalStorage();
  }
  nextPage() : void {
    if (this.offSet + parseInt(this.limit) >= this.totalResults) return;
    this.offSet += parseInt(this.limit);
    this.loadLocalStorage();
  }
}
