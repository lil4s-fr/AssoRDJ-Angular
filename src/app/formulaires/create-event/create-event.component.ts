import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import Salle from 'src/app/models/salle.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { EventService } from 'src/app/services/event.service';
import { SalleService } from 'src/app/services/salle.service';

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
  selectedRooms: string = "";
  description: string = "";
  selectedFile!: File;

  // Liste de jeux à récupérer de la bdd
  categories$: Observable<Categorie[]> =  this.categorieService.getCategories();

  // Liste de salle à récupérer de la bdd
  salles$: Observable<Salle[]> = this.salleService.getSalles();
  
  // je donne le nom au bouton
  btnValide: string = "Valider l'évènement";

  constructor(
    private eventService: EventService,
    private categorieService: CategorieService,
    private salleService: SalleService
    ){
    this.selectedDate = new Date();
  }

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
