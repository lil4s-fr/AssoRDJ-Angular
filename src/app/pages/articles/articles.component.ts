import { Component, OnInit } from '@angular/core';
import Article from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{
  seeButton!: boolean;
  addNewEvent!: boolean;
  // je donne le nom au bouton
  btnValide: string = "Créer un article";

  // liste d'articles
  articles: Article[] = [];

  constructor(private articleService: ArticleService){}

  ngOnInit(): void {
      this.seeButton = false;
      this.addNewEvent = false;
      this.articleService.getArticles().subscribe((articles) => {
        this.articles = articles;
      })
  }

  /**
   * change le statut du bouton pour le faire apparaître ou disparaître
   * @param e event du template
   */
  onAddNewEvent = (e: any) => {
    this.addNewEvent = !this.addNewEvent;
    this.seeButton = !this.seeButton;
  } 
}
