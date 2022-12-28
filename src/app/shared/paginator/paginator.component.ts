import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() numberOfPages: number = 5
  pageOptions: number[] = []

  currentPage = 1
  @Output() pageChanged = new EventEmitter()

  constructor() {
    for (let i = 0; i < this.numberOfPages; i++) {
      this.pageOptions.push(i)
    }
    this.pageOptions = this.pageOptions.filter(pageNumber => pageNumber > 0 && pageNumber <= this.numberOfPages)
  }

  onClick(newPage: number) {
    this.currentPage = newPage
    this.pageChanged.emit(this.currentPage)
  }
}
