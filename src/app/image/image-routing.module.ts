import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageComponent } from './image.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: "", component: ImageComponent },
  { path: "image/:id", component: ImageDetailComponent },
  { path: "search-results", component: SearchResultComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ImageRoutingModule { }
