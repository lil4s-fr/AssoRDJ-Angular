import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  seeButton!: boolean;
  addNewEvent!: boolean;
  // je donne le nom au bouton
  btnValide: string = "Créer un évènement";

  constructor(){}

  ngOnInit(): void {
      this.seeButton = false;
      this.addNewEvent = false;
  }

  /**
   * change le statut du bouton pour le faire apparaître ou disparaître
   * @param e event du template
   */
  onAddNewEvent = (e: any) => {
    this.addNewEvent = !this.addNewEvent;
    this.seeButton = !this.seeButton;
  } 


}
