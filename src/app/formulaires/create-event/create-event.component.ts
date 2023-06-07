import { Component, EnvironmentInjector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import Evenement from 'src/app/models/evenement.model';
import Salle from 'src/app/models/salle.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { EventService } from 'src/app/services/event.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  // boolean pour affichage de la validation de la requète
  eventValide: boolean = false;
  eventDeleted: boolean = false;

  // Liste de jeux à récupérer de la bdd
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();

  // Liste des évènements à récupérer de la bdd
  eventList$: Observable<Evenement[]> =  this.eventService.getEvents();

  // Liste de salle à récupérer de la bdd
  salles$: Observable<Salle[]> = this.salleService.getSalles();
  
  // je donne le nom au bouton
  btnValide: string = "Valider l'évènement";

  // formValues pour la soumission de la nouvelle salle
  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour description
    dateEvenement: ['', Validators.required],
    categorie: ['', Validators.required],
    lieu: ['', Validators.required],
    salle: [''],
    description: ['', Validators.required],
    file: ['']
  });

  // formValues pour la suppression de la salle
  deleteFormValues: FormGroup = this.formBuilder.group([{
    id: [0, Validators.required]    
  }]);

  // je crée une variable de soumission et de validation pour la création de la nouvelle salle
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression de la salle
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private categorieService: CategorieService,
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
    this.salles$ = this.salleService.getSalles();
  }
  /**
   * envoie les éléments de l'évènement vers le service
   * @param e event du template
   */
  onAddEvent(formGroup: FormGroup) {
    // debug
    console.log(JSON.stringify(formGroup.value, null, 2));

    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.salleService.createSalle(formGroup.value).subscribe(
        (response:any) => {
          this.eventValide=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  } 
  onDeleteEvent(id: number) {// empeche de rafraichir la page au moment de la soumisson
    console.log("index:" + id);
    
    // je passe la variable submitted à true
    this.deleteSubmitted = true;
      
    this.salleService.deleteSalle(id).subscribe(
      (response:any) => {
        this.eventDeleted=true;
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
