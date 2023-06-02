import { Observable } from 'rxjs';
import { Image } from '../types/image.type';
import { ImageSearchParams } from '../types/imagesearchparams.type';

export abstract class RepositoryBaseService<T> {
  
  abstract findAll(url: string): Observable<T[]>;
  abstract findById(url: string, value: any): Observable<T | undefined>;
}
