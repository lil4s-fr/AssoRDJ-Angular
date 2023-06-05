import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
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

  // je donne le nom du bouton
  btnValide: string = "Valider la salle";

  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour description
    nom: ['', Validators.required]
  });

  // je crée une variable submitted qui est un boolean
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une liste de salles pour l'afficher
  salleList!: Observable<Salle[]>;

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

    // j'initialise la liste des salles en allant chercher dans le service
    this.salleList = this.salleService.getSalles();
  }

  /**
   * envoie les éléments de l'évènement vers le service au click
   */
  onAddSalle(e: Event) {
    // empeche de rafraichir la page au moment de la soumisson
    e.preventDefault();
    
    
    // je passe la variable submitted à true
    this.submitted = true;
    //  je vérifie si le formulaire est valide
    if (this.formValues.valid) {
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.salleService.createSalle(this.formValues.value).subscribe(
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

  onDeleteSalle(salle: Salle, e: Event) {// empeche de rafraichir la page au moment de la soumisson
    e.preventDefault();
    console.log(salle.id);
    const i = salle.id;
    const c = 4; //chiffre au hasard pour éviter une erreur pendant le debuggage ...
    // je passe la variable submitted à true
    this.submitted = true;
    //  je vérifie si le formulaire est valide
    if (this.formValues.valid) {
      
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.salleService.deleteSalle(c).subscribe(
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
}
