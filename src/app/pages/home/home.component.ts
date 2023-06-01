import { Component } from '@angular/core';
import Article from 'src/app/models/article.model';
import Evenement from 'src/app/models/evenement.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // liste d'évènements
  events: Evenement[] = [];
  
  constructor(private eventService: EventService){}

  ngOnInit(): void {

    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
}
}
