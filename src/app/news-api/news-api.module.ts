import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NaArticleListComponent } from './na-article-list/na-article-list.component';



@NgModule({
  declarations: [
    NaArticleListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class NewsApiModule { }
