import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom} from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-modifier-categorie',
  templateUrl: './modifier-categorie.component.html',
  styleUrls: ['./modifier-categorie.component.css']
})
export class ModifierCategorieComponent implements OnInit{
  isLoaded!:Promise<boolean>;
  //boolean pour affichage de la validation de la requette
  categorieValide: boolean = false;
  categorieDelete: boolean =false;

  categorieid!: number;
  categorie!: Categorie|undefined;

  //Je donne le nom du bouton
  btnValide: string = "Modifier la categorie"; 

   // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder
   constructor(
    private formBuilder: FormBuilder,
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute,
    ){
    this.categorieid = parseInt(this.route.snapshot.paramMap.get('id') !);
    this.getCategorieData();
  }

  // formValues pour la soumission de la modification de la categorie
  formValues: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
  });

  //formValues pour la suppression d'une categorie
  deleteFormValues: FormGroup = this.formBuilder.group({
    id: [0, Validators.required]
  });

  // je crée une variable de soumission et de validation pour la modification de salle
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression de salle
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  ngOnInit() {
    // j'obtiens l'ID de la categorie depuis l'URL
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

  onEditCategorie(formGroup: FormGroup){
    //debug
    console.log(JSON.stringify(formGroup.value, null, 2));
    formGroup.value.permission = { "id": formGroup.value.permission }
    formGroup.value.id = this.categorie?.id;
    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      this.categorieService.updateCategorie(formGroup.value).subscribe(
        (response:any) => {
          this.categorieValide=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }


  async getCategorieData(){
    let returner: Categorie|undefined;
    try{
      this.categorie = await firstValueFrom(this.categorieService.getCategorie(this.categorieid));
      this.formValues.setValue({
        nom: this.categorie.nom,
        description : this.categorie.description,
      })
      this.isLoaded = Promise.resolve(true);
      console.log(this.categorie);
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
