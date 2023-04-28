import { Component, Input } from '@angular/core';

//import des models de données 
import Article from 'src/app/models/article.model';
import Event from 'src/app/models/idEvent.model';

//import des services de données 
import { EventService } from '../services/event.service';
import IdEvent from 'src/app/models/idEvent.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent {

  events: IdEvent[]= [];
  articles: Article[] = [];

  constructor(
    private eventService: EventService,
  ){}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }

  @Input()
  typeCard!: string;
}
