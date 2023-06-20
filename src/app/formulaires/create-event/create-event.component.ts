import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import Evenement from 'src/app/models/evenement.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  // instanciation d'un évènement
  event!: Evenement;
  
  // Liste des évènements à récupérer de la bdd
  eventList$: Observable<Evenement[]> =  this.eventService.getEvents();
  eventList: Evenement[] = [];

  // Liste de catégories à récupérer de la bdd
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();
  categorieList: Categorie[]=[];

  //transmission du fichier
  fileName: string = '';
  file!: File;
  uuid!: string;

  // boolean pour affichage de la validation de la requète
  eventValide: boolean = false;
  eventDeleted: boolean = false;

  // je donne le nom au bouton
  btnValide: string = "Valider l'évènement";

  // formValues pour la soumission de la nouvelle salle
  formValues: FormGroup = this.formBuilder.group({
    // je crée les champs du FormControl
    nom: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    categories: [[]],
    lieu: ['', Validators.required],
    description: ['', Validators.required],
    fichier: [null]
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
    private categorieService: CategorieService
    ){
     
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.eventList = events;
    })

    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
  }

  /**
   * envoie du fichier vers le service pour pécupérer l'uuid
   * @param event fichier en transit
   */
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.eventService.sendFile(this.file).subscribe({
        next:(response:any) => {
          console.log(response, !!response)
          this.uuid=response.fichier;          
        },
        error:(error:any) => {
          //throw erreur
          console.log(error);
        }
      })
    }
  }

  /**
   * envoie les éléments de l'évènement vers le service
   * @param e event du template
   */
  onAddEvent(formGroup: FormGroup) {
    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    // mise au format des dates de début et fin    
    const formattedDateDebut = this.formatDate(formGroup.value.dateDebut);
    formGroup.patchValue({
      dateDebut: formattedDateDebut
    });
    let formattedDateFin = '';
    if (formGroup.value.dateFin == '') {
      formattedDateFin = formattedDateDebut;
    } else {
      formattedDateFin = this.formatDate(formGroup.value.dateFin);
    formGroup.patchValue({
      dateFin: formattedDateFin
    });
    }

    //je reconstitue le formulaire
    const result = {
      nom: formGroup.value.nom,
      lieu: formGroup.value.lieu,
      description: formGroup.value.description,
      dateDebut: formattedDateDebut,
      dateFin: formattedDateFin,
      fichier: this.uuid,
      categories: [{"id": formGroup.value.categories}]
    }

    //  je vérifie si le formulaire est valide
    if (result) {
      
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.eventService.createEvent(result).subscribe({
        next:(response:any) => {
          this.eventValide=true;
          this.eventList.push(response);
        },
        error:(error:any) => {
          //throw erreur
          console.log(error);
        }
      })
    }
  } 

  /**
   * suppression d'un évènement de la liste
   * @param id de l'event
   */
  onDeleteEvent(id?: number) { 
    // je passe la variable submitted à true
    this.deleteSubmitted = true;
      
    if (id) this.eventService.deleteEvent(id).subscribe({
      next:(response:any) => {
        this.eventDeleted=true;
        this.eventList = this.eventList.filter(event=>event.id!==id);
      },
      error:(error:any) => {
        //throw erreur
        console.log(error);
      }
    })    
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
