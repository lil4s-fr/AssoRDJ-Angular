import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit{

  // je donne le nom au bouton
  btnValide: string = "Valider la catégorie";

  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour description
    nom: ['', Validators.required], // je peux mettre un ou plusieurs validateur(s)
    description: [''], 
  });
  // je crée une variable submitted qui est un boolean
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder

  constructor(private formBuilder: FormBuilder, private categorieService: CategorieService){
  }

  ngOnInit() {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
  }
  /**
   * envoie les éléments de l'évènement vers le service au click
   */
  onAddCategorie(e: Event) {
    // empeche de rafraichir la page au moment de la soumisson
    e.preventDefault();
    
    
    // je passe la variable submitted à true
    this.submitted = true;
    //  je vérifie si le formulaire est valide
    if (this.formValues.valid) {
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.categorieService.createCategorie(this.formValues.value).subscribe(
        (response:any) => {
          //mettre un message ok à l'utilisateur
          console.log(response);
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
    
  } 
}
