import { Component, OnInit } from '@angular/core';
import Article from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{

  // liste d'articles
  articles: Article[] = [];

  constructor(private articleService: ArticleService){}

  ngOnInit(): void {
      this.articleService.getArticles().subscribe((articles) => {
        this.articles = articles;
        console.log(articles);
      })
  }
}
