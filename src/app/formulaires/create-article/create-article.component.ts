import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {
  // je récupère les infos des inputs
  selectedGame: string = "";
  title: string = "";
  corpsArticle: string = "";

  // je donne le nom au bouton
  btnValide: string = "Valider l'article";

  constructor(private articleService: ArticleService){

  }

  // Liste de jeux à récupérer de la bdd
  games = [
    { label: 'Game 1', value: 'game1' },
    { label: 'Game 2', value: 'game2' },
    { label: 'Game 3', value: 'game3' },
    { label: 'Game 4', value: 'game4' }
  ];  

  /**
   * envoie les éléments de l'évènement vers le service
   * @param e event du template
   */
  onAddArticle= (e: any) => {
    if (this.selectedGame == "") return;
    this.articleService.onAddArticle(this.selectedGame, this.title, this.corpsArticle)
  }
}
