import { Component } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  // je récupère la date, la salle sélectionnée et le tableau de participants
  selectedDate: Date;
  selectedTime: string = "";
  selectedRooms: string = "";
  selectedParticipants: string[] = [];
  descriptionReservation: string = "";

  // je donne le nom au bouton
  btnValide: string = "Valider la réservation";

  constructor(private reservationService: ReservationService){
    this.selectedDate = new Date();
  }

  // Liste de salle à récupérer de la bdd
  rooms = [
    { label: 'Salle 1', value: 'salle1' },
    { label: 'Salle 2', value: 'salle2' },
    { label: 'Salle 3', value: 'salle3' },
    { label: 'Salle 4', value: 'salle4' }
  ];  

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

  // Liste de participants à récupérer de la bdd
  participants = [
    { label: 'Antoine', value: 'id1' },
    { label: 'Alexis', value: 'id2' },
    { label: 'Dorian', value: 'id3' },
    { label: 'Ln', value: 'id4' }
  ];  

  onAddBook = (e: any) => {
    // appelle la fonction de compte service pour provoquer l'ajout des points
    if (this.selectedRooms == "" || this.selectedDate == null) return;
    this.reservationService.onAddBook(
      this.selectedDate,
      this.selectedTime,
      this.selectedRooms,
      this.selectedParticipants,
      this.descriptionReservation);  
  } 
}
