import { Component } from '@angular/core';
import Article from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.css']
})
export class LastArticlesComponent {
  //liste d'articles
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    ){}

  ngOnInit():void {
    this.articleService.getTwoLastArticles().subscribe((articles) => {
      this.articles = articles;
    })
  }

  formatDate(dateString?: string):string{
    const date = dateString ? new Date(dateString) : new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('fr-FR', options);
  }
}
