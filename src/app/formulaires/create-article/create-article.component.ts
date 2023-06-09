import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Article from 'src/app/models/article.model';
import Categorie from 'src/app/models/categorie.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit{
  // instanciation d'un article
  article!: Article;

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
    // je crée les champs du FormControl
    categories: [[]],
    titre: ['', Validators.required], // je peux mettre un ou plusieurs validateur(s)
    corps: ['', Validators.required]   
  });

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
    private categorieService: CategorieService,
    private router:Router
    ){}

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
   * envoie les éléments de ll'article vers le service
   * @param e event du template
   */
  onAddArticle(formGroup: FormGroup) {
    // debug
        console.log(JSON.stringify(formGroup.value, null, 2));

    // je passe la variable submitted à true pour pouvoir afficher la confirmation à l'écran avec un ngIf
    this.submitted = true;

    // je mets la date du jour au bon format
    formGroup.value.date_ecriture = DateTime.now().toFormat('yyyy-MM-dd');

    // je mets la catégorie dans l'objet à poster et complète l'objet article
    formGroup.value.categories = [{"id": formGroup.value.categories}];
    formGroup.value.date_modif = formGroup.value.date_ecriture;
    formGroup.value.like_dislike = 0
    formGroup.value.id = this.article?.id;
    alert(JSON.stringify(formGroup.value, null, 2));

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

  /**
   * suppression d'un article
   * @param id de l'article
   */
  onDeleteArticle(id: number) {
    
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
  onRedirectEditArticle(id: number){
    this.router.navigate(['/modifierarticle', id])
  }
}
