import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit{
  // je récupère les infos des inputs
  selectedGame: string = "";
  title: string = "";
  corpsArticle: string = "";

  //je récupère la liste des catégories
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();

  // boolean pour affichage de la validation de la requelle
  articleValide: boolean = false;

  // je donne le nom au bouton
  btnValide: string = "Valider l'article";

  formValues: FormGroup = this.formBuilder.group({
    // je crée les champs qui sont un FormControl
    categorie: [[]],
    titre: ['', Validators.required], // je peux mettre un ou plusieurs validateur(s)
    corps: [''], 
  });
  // je crée une variable submitted qui est un boolean
  submitted: boolean = false;
  formValidated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categorieService: CategorieService
    ){
  }

  ngOnInit(): void {
      
  }

  /**
   * envoie les éléments de l'évènement vers le service
   * @param e event du template
   */
  onAddArticle= (e: Event) => {
    // empeche de rafraichir la page au moment de la soumisson
    e.preventDefault();
    
    
    // je passe la variable submitted à true
    this.submitted = true;
    //  je vérifie si le formulaire est valide
    if (this.formValues.valid) {
      console.log("formulaire valide");
      
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.articleService.createArticle(this.formValues.value).subscribe(
        (response:any) => {
          this.articleValide=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }
}
