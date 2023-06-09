import { Component } from '@angular/core';
import Evenement from 'src/app/models/evenement.model';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-last-event',
  templateUrl: './last-event.component.html',
  styleUrls: ['./last-event.component.css']
})
export class LastEventComponent {
  // liste d'évènements
  events: Evenement[] = [];
  
  constructor(private eventService: EventService){}

  ngOnInit(): void {

    this.eventService.getTwoLastEvents().subscribe((events) => {
      this.events = events;
    });
  }

  formatDate(dateString: string):string{
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('fr-FR', options);
  }
  
}
