import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import Salle from 'src/app/models/salle.model';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent  implements OnInit{
  // boolean pour affichage de la validation de la requelle
  salleValide: boolean = false;
  salleDeleted: boolean = false;

  // je donne le nom du bouton
  btnValide: string = "Valider la salle";

  // formValues pour la soumission de la nouvelle salle
  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour description
    nom: ['', Validators.required]
  });

  // formValues pour la soumission de la nouvelle salle
  deleteFormValues: FormGroup = this.formBuilder.group([{
    // je crée un champ id qui est un FormControl, idem pour nom
    id: [0, Validators.required]    
  },
  {
    nom: ['', Validators.required]    
  }]);

  // je crée une variable de soumission et de validation pour la création de la nouvelle salle
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la création de la nouvelle salle
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  // je crée une liste de salles pour l'afficher
  salleList$!: Observable<Salle[]>;

  // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private salleService: SalleService
    ){
  }

  ngOnInit() {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })

    // j'initialise la liste des salles en allant chercher dans le service
    this.salleList$ = this.salleService.getSalles();
  }

  /**
   * envoie les éléments de l'évènement vers le service au click
   */
  onAddSalle(e: Event) {
    // empeche de rafraichir la page au moment de la soumisson
    e.preventDefault();
    console.log( " FormValue : " + this.formValues.value);

    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (this.formValues.valid) {
      const id = this.formValues.value.id;
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.salleService.createSalle(id).subscribe(
        (response:any) => {
          this.salleValide=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }

  onDeleteSalle(e: Event) {// empeche de rafraichir la page au moment de la soumisson
    e.preventDefault();
    console.log(" deleteFormValue : " + this.deleteFormValues);
    
    // je passe la variable submitted à true
    this.deleteSubmitted = true;
    //  je vérifie si le formulaire est valide
    if (this.deleteFormValues.valid) {
      console.log("formulaire valide");
      
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.salleService.deleteSalle(this.deleteFormValues.value).subscribe(
        (response:any) => {
          this.salleDeleted=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }
}
