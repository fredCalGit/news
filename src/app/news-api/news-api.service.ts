import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

export interface Article {
  source: {
    id: string;
    name: string;
  },
  url: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
  title: string;
  content: string;
}

interface NewsApiResponse {
  articles: Article[];
  totalResults: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines'
  private pageSize = 10
  private apiKey = '7823beedb2714adeb460171753f340b6'
  private country = 'ca'

  private pagesInput: Subject<number>
  pagesOutput: Observable<Article[]>
  numberOfPages: Subject<number>

  constructor(private http: HttpClient, private notificationsService: NotificationsService) {
    this.numberOfPages = new Subject()
    this.pagesInput = new Subject()
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', String(this.pageSize))
          .set('page', String(page))
      }),
      switchMap(params => {
        return this.http.get<NewsApiResponse>(this.url, { params }).pipe(
          tap(() => this.notificationsService.addSuccess('Got latest news!')),
          catchError((err) => {
            this.notificationsService.addError('Failed to get news')
            return throwError(() => new Error(err.message))
          })
        )
      }),
      tap(response => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize)
        this.numberOfPages.next(totalPages)
      }),
      map(value => value?.articles)
    )
  }

  getPage(page: number) {
    this.pagesInput.next(page)
  }
}
