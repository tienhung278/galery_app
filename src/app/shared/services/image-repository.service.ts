import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../types/image.type';
import { ImageSearchParams } from '../types/imagesearchparams.type';
import { RepositoryBaseService } from './repository-base.service';

@Injectable({
  providedIn: 'root'
})
export class ImageRepositoryService implements RepositoryBaseService<Image> {  
  httpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json'})
  };
  private apiEndPoint: string = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  findAll(url: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiEndPoint}${url}`);
  }

  findById(url: string, value: any): Observable<Image | undefined> {
    return this.http.get<Image[]>(`${this.apiEndPoint}${url}`)
      .pipe(map(images => images.find(image => image.id === value)));
  }

  findByCondition(url: string, params: ImageSearchParams): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiEndPoint}${url}`)
    .pipe(map(images => this.filterProducts(images, params))
    );
  }

  private filterProducts(images: Image[], params: ImageSearchParams): Image[] {
    let result: Image[];

    if (params.id) {
      result = images.filter(i => i.id === parseInt(params.id || ""));      
    } else {
      if (params.minRating) {
        result = images.filter(i => i.rating ? i.rating >= params.minRating! : images);        
      } else {
        result = images;
      }

      if (params.maxRating) {
        result = result.filter(i => i.rating ? i.rating <= params.maxRating! : images);
      } else {
        result = result;
      }
    }
    return result;
  }
}
