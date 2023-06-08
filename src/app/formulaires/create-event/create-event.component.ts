import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import Evenement from 'src/app/models/evenement.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { EventService } from 'src/app/services/event.service';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  // instanciation d'un évènement
  event!: Evenement;
  
  // boolean pour affichage de la validation de la requète
  eventValide: boolean = false;
  eventDeleted: boolean = false;

  // Liste de catégories à récupérer de la bdd
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();

  // Liste des évènements à récupérer de la bdd
  eventList$: Observable<Evenement[]> =  this.eventService.getEvents();

  // je donne le nom au bouton
  btnValide: string = "Valider l'évènement";

  // formValues pour la soumission de la nouvelle salle
  formValues: FormGroup = this.formBuilder.group({
    // je crée les champs du FormControl
    nom: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: [''],
    categories: ['', Validators.required],
    lieu: ['', Validators.required],
    description: ['', Validators.required]
  });

  // formValues pour la suppression de la salle
  deleteFormValues: FormGroup = this.formBuilder.group([{
    id: [0, Validators.required]    
  }]);

  // je crée une variable de soumission et de validation pour la création du nouvel évènement
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression de l'évènement
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

    // je mets la date du jour au bon format
    formGroup.value.dateCreation = DateTime.now().toFormat('yyyy-MM-dd');

    // mise au format des dates de début et fin    
    const formattedDateDebut = this.formatDate(formGroup.value.dateDebut);
    formGroup.patchValue({
      dateDebut: formattedDateDebut
    });
    if (formGroup.value.dateFin == '') {
      formGroup.value.dateFin = formGroup.value.dateDebut;
    } else {
      const formattedDateFin = this.formatDate(formGroup.value.dateFin);
    formGroup.patchValue({
      dateFin: formattedDateFin
    });
    }
    
    // je mets la catégorie dans l'objet à poster et complète l'objet event
    formGroup.value.categories = [{"id": formGroup.value.categories}];
       
    formGroup.value.id = this.event?.id;
    console.log("objet catégorie : " + formGroup.value.categories);
    alert(JSON.stringify(formGroup.value, null, 2));

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      console.log("valide");
      
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.eventService.createEvent(formGroup.value).subscribe(
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

  /**
   * suppression d'un évènement de la liste
   * @param id de l'event
   */
  onDeleteEvent(id: number) { 
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
  /**
   * conversion de dates du picker
   * @param date à convertir
   * @returns 
   */
  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}
