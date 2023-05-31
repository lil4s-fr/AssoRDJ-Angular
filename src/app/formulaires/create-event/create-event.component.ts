import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  // je récupère les infos des inputs
  selectedDate: Date;
  selectedGame: string = "";
  lieu: string = "";
  description: string = "";
  selectedFile!: File;

  // je donne le nom au bouton
  btnValide: string = "Valider l'évènement";

  constructor(private eventService: EventService){
    this.selectedDate = new Date();
  }

  // Liste de jeux à récupérer de la bdd
  games = [
    { label: 'Game 1', value: 'game1' },
    { label: 'Game 2', value: 'game2' },
    { label: 'Game 3', value: 'game3' },
    { label: 'Game 4', value: 'game4' }
  ];  

  /**
   * envoie les éléments de l'évènement vers le service
   * @param e event du template
   */
  onAddEvent= (e: any) => {
    if (this.selectedDate == null
       || this.selectedGame == ""
        || this.lieu == "") return;
    this.eventService.onAddEvent(
      this.selectedDate,
      this.selectedGame,
      this.lieu,
      this.description,
      this.selectedFile
    )
  } 
/**
les méthodes sont associées au material angular du template qui pose problème
   * récupère le fichier sélectionné
   * @param event 
   * 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /**
   * Réinitialiser la sélection du fichier
   *
  clearFileInput() {
    this.selectedFile = null;
  }
*/
}
