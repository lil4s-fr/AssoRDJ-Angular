import { Component, Input } from '@angular/core';
import Evenement from 'src/app/models/evenement.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {

  @Input()
  event!: Evenement;
}
