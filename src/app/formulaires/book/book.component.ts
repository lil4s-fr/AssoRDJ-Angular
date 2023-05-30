import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  // je récupère la salle sélectionnée et le tableau de participants
  selectedRooms!: string;
  selectedParticipants: string[] = [];

  // je donne le nom au bouton
  btnValide: string = "Valider la réservation";

  constructor(private reservationService: ReservationService){}

  // Liste de salle à récupérer de la bdd
  rooms = [
    { label: 'Salle 1', value: 'salle1' },
    { label: 'Salle 2', value: 'salle2' },
    { label: 'Salle 3', value: 'salle3' },
    { label: 'Salle 4', value: 'salle4' }
  ];  

  // Liste de participants à récupérer de la bdd
  participants = [
    { label: 'Antoine', value: 'id1' },
    { label: 'Alexis', value: 'id2' },
    { label: 'Dorian', value: 'id3' },
    { label: 'Ln', value: 'id4' }
  ];  

  onAddBook = (e: any) => {
    // appelle la fonction de compte service pour provoquer l'ajout des points
    this.reservationService.onAddBook();  
  } 
}
