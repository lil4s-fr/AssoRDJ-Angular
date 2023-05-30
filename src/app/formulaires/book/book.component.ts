import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  // Liste de salle à récupérer de la bdd
  rooms = [
    { label: 'Salle 1', value: 'salle1' },
    { label: 'Salle 2', value: 'salle2' },
    { label: 'Salle 3', value: 'salle3' },
    { label: 'Salle 4', value: 'salle4' }
  ];

  selectedRooms!: string;
}
