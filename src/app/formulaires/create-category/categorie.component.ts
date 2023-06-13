import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit{

  // boolean pour affichage de la validation de la requelle
  categorieValide: boolean = false;

  // je donne le nom au bouton
  btnValide: string = "Valider la catégorie";

  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour description
    nom: ['', Validators.required], // je peux mettre un ou plusieurs validateur(s)
    description: ['', Validators.required], 
  });
  // je crée une variable submitted qui est un boolean
  submitted: boolean = false;
  salleDeleted: boolean = false;
  formValidated: boolean = false;

  // je crée une liste de catégories pour l'afficher
  categoryList$!: Observable<Categorie[]>;

  // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private categorieService: CategorieService,
    private router:Router
    ){
  }

  ngOnInit() {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })

    // j'initialise la liste des salles en allant chercher dans le service
    this.categoryList$ = this.categorieService.getCategories();
  }

  /**
   * envoie les éléments de l'évènement vers le service au click
   */
  onAddCategorie(formGroup: FormGroup) {
    //debug
    console.log(JSON.stringify(formGroup.value, null, 2));
    // je passe la variable submitted à true
    this.submitted = true;
    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.categorieService.createCategorie(formGroup.value).subscribe(
        (response:any) => {
          this.categorieValide=true;
          window.location.reload();
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }

  onDeleteCategory(id: number) {    
    this.categorieService.deleteCategorie(id).subscribe(
      (response:any) => {
        this.salleDeleted = true;
        window.location.reload();
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
  onRedirectEditCategorie(id: number){
    this.router.navigate(['/modifiercategorie', id])
  }
}
