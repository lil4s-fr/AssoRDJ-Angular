import { Component, OnInit } from '@angular/core';
import Evenement from 'src/app/models/evenement.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  // liste d'évènements
  events: Evenement [] = [];
  
  constructor(private eventService: EventService){}

  ngOnInit(): void {
      this.eventService.getEvents().subscribe((events) => {
        this.events = events;
    })
  }
}
