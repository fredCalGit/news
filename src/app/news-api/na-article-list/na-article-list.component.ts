import { Component } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-na-article-list',
  templateUrl: './na-article-list.component.html',
  styleUrls: ['./na-article-list.component.css']
})
export class NaArticleListComponent {
  articles: Article[] = []
  currentPage = 1
  numberOfPages: number = 5

  constructor(private newsApiService: NewsApiService) {
    this.newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles
    })

    this.newsApiService.getPage(this.currentPage)
    this.newsApiService.numberOfPages.subscribe(value => { this.numberOfPages = value })
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage
    this.newsApiService.getPage(this.currentPage)
    console.log(this.numberOfPages)
  }
}
