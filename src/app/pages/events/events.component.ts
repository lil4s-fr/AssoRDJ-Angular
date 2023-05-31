import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  addButton: boolean = false;
  // je donne le nom au bouton
  btnValide: string = "Créer un évènement";

  constructor(){}

  ngOnInit(): void {
      
  }

  /**
   * change le statut du bouton pour le faire apparaître ou disparaître
   * @param e event du template
   */
  onAddButton = (e: any) => {
    this.addButton = !this.addButton;
  } 


}
