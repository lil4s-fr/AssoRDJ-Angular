import { Component } from '@angular/core';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css']
})
export class FormulairesComponent {
  // nom des boutons
  btnValide1: string = "Gérer les articles";
  btnValide3: string = "Gérer les évènements";
  btnValide5: string = "Gérer les membres";
  btnValide7: string = "Gérer les salles";
  btnValide9: string = "Gérer les réservations de salle";
  btnValide11: string = "Gérer les catégories";

  // booleans d'affichage
  formulaire: boolean = true;
  newArticle: boolean = false;
  newEvent: boolean = false;
  newMembre: boolean = false;
  newRoom: boolean = false;
  newBook: boolean = false;
  newCategory: boolean = false;

  directionNewArticle(): void {
      this.newArticle = true;
      this.formulaire = false;
  } 
  
  directionNewEvent(): void {
      this.newEvent = true;
      this.formulaire = false;
  }

  directionNewMembre():void {
      this.newMembre = true;
      this.formulaire = false;
  }
    
  directionNewRoom(): void {
      this.newRoom= true;
      this.formulaire = false;
  }

  directionNewBook(): void {
      this.newBook = true;
      this.formulaire = false;
  }
  
  directionNewCategory(): void {
    this.newCategory = true;
    this.formulaire = false;
  }
  
}
