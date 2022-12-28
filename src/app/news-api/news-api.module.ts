import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NaArticleListComponent } from './na-article-list/na-article-list.component';
import { TrimOutletNamePipe } from './trim-outlet-name.pipe';



@NgModule({
  declarations: [
    NaArticleListComponent,
    TrimOutletNamePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [NaArticleListComponent]
})
export class NewsApiModule { }
