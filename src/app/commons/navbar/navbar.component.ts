import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionComponent } from 'src/app/formulaires/connection/connection.component';
import { NewContactComponent } from 'src/app/pages/new-contact/new-contact.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private dialog: MatDialog){}

  openLoginModal(){
    const dialogRef = this.dialog.open(ConnectionComponent, {
      width: '50vw', // Largeur de la modale en pixels
      height: '70vh', // Hauteur de la modale en pixels
      // Autres options de configuration de la modale
      
    });
  }
  openContactModal(){
    const dialogRef = this.dialog.open(NewContactComponent, {
      width: '80vw', // Largeur de la modale en pixels
      height: '75vh', // Hauteur de la modale en pixels
      // Autres options de configuration de la modale
      
    });
  }
}
