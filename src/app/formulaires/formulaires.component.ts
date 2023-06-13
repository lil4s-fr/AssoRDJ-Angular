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
}
