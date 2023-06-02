import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageRoutingModule } from './image-routing.module';

import { ImageRepositoryService } from '../shared/services/image-repository.service';
import { RepositoryBaseService } from '../shared/services/repository-base.service';

import { SearchResultComponent } from './search-result/search-result.component';
import { ImageComponent } from './image.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';

@NgModule({
  declarations: [
    ImageComponent,
    ImageDetailComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    MaterialUIModule,
    FlexLayoutModule,
    ImageRoutingModule
  ],
  providers: [{provide: RepositoryBaseService, useClass: ImageRepositoryService}]
})
export class ImageModule { }
