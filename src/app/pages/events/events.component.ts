import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  addEvent: boolean = false;
  // je donne le nom au bouton
  btnValide: string = "Créer un évènement";

  constructor(){}

  ngOnInit(): void {
      
  }
  onAddEvent = (e: any) => {
    this.addEvent = !this.addEvent;
  } 
}
