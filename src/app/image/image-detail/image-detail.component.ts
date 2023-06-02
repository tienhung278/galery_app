import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { RepositoryBaseService } from 'src/app/shared/services/repository-base.service';
import { Image } from 'src/app/shared/types/image.type';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  image: Image | undefined = {};
  readonly url = "/data/images.json";

  constructor(private route: ActivatedRoute, private repositoryBaseService: RepositoryBaseService<Image>) {
    this.route.paramMap
      .pipe(map(params => parseInt(params.get("id") || "", 10)),
            filter(id => !!id),
            switchMap(id => this.repositoryBaseService.findById(this.url, id)))
      .subscribe(data => this.image = data);
  }

  ngOnInit(): void {
  }

}
