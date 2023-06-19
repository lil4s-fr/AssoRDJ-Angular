import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import Article from 'src/app/models/article.model';
import Categorie from 'src/app/models/categorie.model';
import Salle from 'src/app/models/salle.model';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.css']
})
export class ModifierArticleComponent {
  isLoaded!:Promise<boolean>;
  //boolean pour affichage de la validation de la requette
  articleValide: boolean = false;
  articleDelete: boolean =false;

  articleid!: number;
  article!: Article|undefined;

  //je récupère la liste des catégories
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();
  
  //Je donne le nom du bouton
  btnValide: string = "Modifier l'article"; 

   // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder
   constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private categorieService: CategorieService
    ){
    this.articleid = parseInt(this.route.snapshot.paramMap.get('id') !);
    this.getArticleData();
  }

  // formValues pour la soumission de la modification de l'article
  formValues: FormGroup = this.formBuilder.group({
    categories: [[], Validators.required],
    titre: ['', Validators.required],
    corps: ['', Validators.required]
  });

  //formValues pour la suppression d'un article
  deleteFormValues: FormGroup = this.formBuilder.group({
    id: [0, Validators.required]
  });

  // je crée une variable de soumission et de validation pour la modification de l'article
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression de l'article
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  ngOnInit() {
    // j'obtiens l'ID de l'article depuis l'URL
    // this.route.snapshot.paramMap.get('id')
    //                                         non-null assertion 👇
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
  }

  /**
   * modification de l'article
   * @param formGroup formulaire saisi par l'utilisateur
   */
  onEditArticle(formGroup: FormGroup){
    
    formGroup.value.categories = [{"id": formGroup.value.categories}];
    formGroup.value.permission = { "id": formGroup.value.permission }
    formGroup.value.id = this.article?.id;
    //debug
    console.log(JSON.stringify(formGroup.value, null, 2));
    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      this.articleService.updateArticle(formGroup.value).subscribe(
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
   * suppression de l'article
   */
  onDeleteArticle(){
    let id = this.articleid;
    console.log(" deleteFormValue : " + this.deleteFormValues);

    // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
    // à l'utilisateur que le formulaire a bien été validé via un message
    this.articleService.deleteArticle(id).subscribe(
      (Response:any) => {
        this.articleDelete=true;
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  /**
   * récupère les données de l'article
   * @returns informations de l'objet cherché
   */
  async getArticleData(){
    let returner: Salle|undefined;
    try{
      this.article = await firstValueFrom(this.articleService.getArticle(this.articleid));
      this.formValues.setValue({
        categories: this.article.categories,
        titre : this.article.titre,
        corps: this.article.corps,
      })
      this.isLoaded = Promise.resolve(true);
      console.log(this.article);
    }
    catch(err){
      console.log(err);
    }
    return returner;
  }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
