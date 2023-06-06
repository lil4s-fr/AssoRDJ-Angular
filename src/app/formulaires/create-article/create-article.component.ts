import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Article from 'src/app/models/article.model';
import Categorie from 'src/app/models/categorie.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit{
  // je récupère la liste des articles
  articleList$: Observable<Article[]> = this.articleService.getArticles();
  //je récupère la liste des catégories
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();

  // boolean pour affichage de la validation de la requelle
  articleValide: boolean = false;
  articleDeleted: boolean = false;

  // je donne le nom au bouton
  btnValide: string = "Valider l'article";

  formValues: FormGroup = this.formBuilder.group({
    // je crée les champs qui sont un FormControl
    categorie: [[]],
    utilisateur: ['', Validators.required],
    titre: ['', Validators.required], // je peux mettre un ou plusieurs validateur(s)
    corps: ['', Validators.required], 
    date_ecriture: ['', Validators.required]
  });
  //TODO: récupération de la date du jour pour l'envoyer dans le back

  // formValues pour la suppression de la salle
  deleteFormValues: FormGroup = this.formBuilder.group([{
    id: [0, Validators.required]    
  }]);

  // je crée une variable submitted qui est un boolean
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression de l'article
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categorieService: CategorieService
    ){
  }

  ngOnInit(): void {
      // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
  }

  /**
   * envoie les éléments de l'évènement vers le service
   * @param e event du template
   */
  onAddArticle(formGroup: FormGroup) {
    // debug
    console.log(JSON.stringify(formGroup.value, null, 2));

    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.articleService.createArticle(formGroup.value).subscribe(
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

  onDeleteArticle(id: number) {// empeche de rafraichir la page au moment de la soumisson
    console.log("index:" + id);
    
    // je passe la variable submitted à true
    this.deleteSubmitted = true;
      
    this.articleService.deleteArticle(id).subscribe(
      (response:any) => {
        this.articleDeleted=true;
      },
      (error:any) => {
        //throw erreur
        console.log(error);
      }
    )
    
  }

  //debug pour vérifier si les datas sont valides.
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
