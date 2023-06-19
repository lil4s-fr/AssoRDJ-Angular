import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import Utilisateur from 'src/app/models/utilisateur.model';
import { MatDialog } from '@angular/material/dialog';
import { ModifierPersonalDataComponent } from './modifier-personal-data/modifier-personal-data.component';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent{
  // je crée une liste de salles pour l'afficher
  userList$!: Observable<Utilisateur[]>;

  @Input()
  user!: Utilisateur;

  constructor(private dialog: MatDialog){}

  onChangeAffichage(){
    const dialogRef = this.dialog.open(ModifierPersonalDataComponent, {
      width: '50vw', // Largeur de la modale en pixels
      height: '70vh', // Hauteur de la modale en pixels
      // Autres options de configuration de la modale
    });
  }

}
