import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Image } from '../shared/types/image.type';
import { MediaObserver } from '@angular/flex-layout';
import { ImageRepositoryService } from '../shared/services/image-repository.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  readonly columns$: Observable<number>;
  readonly images$: Observable<Image[]>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 1 ],
    [ 'sm', 2 ],
    [ 'md', 3 ],
    [ 'lg', 4 ],
    [ 'xl', 5 ],
  ]);
  readonly url = "/data/images.json";

  constructor(private media: MediaObserver, private imageRepositoryService: ImageRepositoryService) {
    this.images$ = imageRepositoryService.findAll(this.url);
    this.columns$ = media.asObservable()
      .pipe(map(mc => this.breakpointsToColumnsNumber.get(mc[0].mqAlias) as number));
   }

  ngOnInit(): void {
  }

}
