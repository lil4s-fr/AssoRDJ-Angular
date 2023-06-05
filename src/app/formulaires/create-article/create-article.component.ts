import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

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

  //je récupère la liste des catégories
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();

  // je donne le nom au bouton
  btnValide: string = "Valider l'article";

  constructor(
    private articleService: ArticleService,
    private categorieService: CategorieService
    ){

  }

  /**
   * envoie les éléments de l'évènement vers le service
   * @param e event du template
   */
  onAddArticle= (e: any) => {
    if (this.selectedGame == "") return;
    this.articleService.onAddArticle(this.selectedGame, this.title, this.corpsArticle)
  }
}
