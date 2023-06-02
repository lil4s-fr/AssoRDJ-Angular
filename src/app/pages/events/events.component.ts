import { Component, OnInit } from '@angular/core';
import Evenement from 'src/app/models/evenement.model';
import { EventService } from 'src/app/services/event.service';

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

  // liste d'évènements
  events: Evenement [] = [];
  
  constructor(private eventService: EventService){}

  ngOnInit(): void {
      this.seeButton = false;
      this.addNewEvent = false;
      this.eventService.getEvents().subscribe((events) => {
        this.events = events;
  })
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
