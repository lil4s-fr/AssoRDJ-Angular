import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import Reservation from 'src/app/models/reservation.model';
import Salle from 'src/app/models/salle.model';
import Utilisateur from 'src/app/models/utilisateur.model'
import { CategorieService } from 'src/app/services/categorie.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SalleService } from 'src/app/services/salle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{  

  // Liste de salle à récupérer de la bdd
  salles$: Observable<Salle[]> = this.salleService.getSalles();
  
  // Liste de jeux à récupérer de la bdd
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();
  
  // Liste des participants qui est en fait la liste des contacts
  participants$: Observable<Utilisateur[]> = this.userService.getUsers();

  // Liste des réservations de salle
  bookList$: Observable<Reservation[]> = this.reservationService.getReservations();

  // je donne le nom au bouton
  btnValide: string = "Valider la réservation";

  // boolean pour affichage de la validation de la requète
  bookValide: boolean = false;
  bookDeleted: boolean = false;

  // Liste des créneaux horaires de début de réservation
  times = [
    { label: '00:00', value: '0' },
    { label: '00:30', value: '030' },
    { label: '01:00', value: '1' },
    { label: '01:30', value: '130' },
    { label: '02:00', value: '2' },
    { label: '02:30', value: '230' },
    { label: '03:00', value: '3' },
    { label: '03:30', value: '330' },
    { label: '04:00', value: '4' },
    { label: '04:30', value: '430' },
    { label: '05:00', value: '5' },
    { label: '05:30', value: '530' },
    { label: '06:00', value: '6' },
    { label: '06:30', value: '630' },
    { label: '07:00', value: '7' },
    { label: '07:30', value: '730' },
    { label: '08:00', value: '8' },
    { label: '08:30', value: '830' },
    { label: '09:00', value: '9' },
    { label: '09:30', value: '930' },
    { label: '10:00', value: '10' },
    { label: '10:30', value: '1030' },
    { label: '11:00', value: '11' },
    { label: '11:30', value: '1130' },
    { label: '12:00', value: '12' },
    { label: '12:30', value: '1230' },
    { label: '13:00', value: '13' },
    { label: '13:30', value: '1330' },
    { label: '14:00', value: '14' },
    { label: '14:30', value: '1430' },
    { label: '15:00', value: '15' },
    { label: '15:30', value: '1530' },
    { label: '16:00', value: '16' },
    { label: '16:30', value: '1630' },
    { label: '17:00', value: '17' },
    { label: '17:30', value: '1730' },
    { label: '18:00', value: '18' },
    { label: '18:30', value: '1830' },
    { label: '19:00', value: '19' },
    { label: '19:30', value: '1930' },
    { label: '20:00', value: '20' },
    { label: '20:30', value: '2030' },
    { label: '21:00', value: '21' },
    { label: '21:30', value: '2130' },
    { label: '22:00', value: '22' },
    { label: '22:30', value: '2230' },
    { label: '23:00', value: '23' },
    { label: '23:30', value: '2330' }
  ];  
  
  // formValues pour la soumission de la nouvelle salle
  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour description
    date_reservation: ['', Validators.required],
    // TODO: programmer la date du jour à envoyer et l'utilisateur qui crée la réservation
    creneau: ['', Validators.required],
    salle: ['', Validators.required],
    categorie: ['', Validators.required],
    participant: [[], Validators.required],
    description: ['', Validators.required]
  });
  
  // formValues pour la suppression de la salle
  deleteFormValues: FormGroup = this.formBuilder.group([{
    id: [0, Validators.required]    
  }]);

  // je crée une variable de soumission et de validation pour la création de la réservation
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression de la réservation
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private salleService: SalleService,
    private categorieService: CategorieService,
    private userService: UserService
    ){}

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
   * envoie les éléments de l'évènement vers le service au click
   */
  onAddBook(formGroup: FormGroup) {
    // empeche de rafraichir la page au moment de la soumisson
    console.log(JSON.stringify(formGroup.value, null, 2));

    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.salleService.createSalle(formGroup.value).subscribe(
        (response:any) => {
          this.bookValide=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }

  onDeleteBook(id: number) {// empeche de rafraichir la page au moment de la soumisson
    console.log("index:" + id);
    
    // je passe la variable submitted à true
    this.deleteSubmitted = true;
      
    this.reservationService.deleteReservation(id).subscribe(
      (response:any) => {
        this.bookDeleted=true;
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
