import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { ImageRepositoryService } from 'src/app/shared/services/image-repository.service';
import { RepositoryBaseService } from 'src/app/shared/services/repository-base.service';
import { Image } from 'src/app/shared/types/image.type';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
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

  constructor(private media: MediaObserver, 
              private imageRepositoryService: ImageRepositoryService, 
              private route: ActivatedRoute) {
    this.images$ = this.route.queryParams.pipe(
      switchMap(queryParams => this.imageRepositoryService.findByCondition(this.url, queryParams))
    );

    this.columns$ = media.asObservable()
      .pipe(map(mc => this.breakpointsToColumnsNumber.get(mc[0].mqAlias) as number));
   }

  ngOnInit(): void {
  }

}
