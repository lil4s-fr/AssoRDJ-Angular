import { Component, Input } from '@angular/core';
import Article from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service'
@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {
  // bollean affichage de l'article complet
  afficheArticle: boolean = true;

  constructor ( private articleService: ArticleService){}

  @Input()
  article!: Article;

  afficheArticleComplet = () => { 
    console.log(this.afficheArticle);
    this.afficheArticle = !this.afficheArticle;

    console.log(this.afficheArticle);

  }
}
