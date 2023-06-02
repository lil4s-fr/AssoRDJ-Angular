import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  // je récupère les données du template
  email: string = "";
  password: string = "";

    // je donne le nom au bouton
    btnValide: string = "Se connecter";

    constructor(private userService: UserService){}
    connexion = (e: any) => {
      // appelle la fonction de compte service pour provoquer l'ajout des points
      if (this.email == "" || this.password == "") return;
      this.userService.connexion(this.email, this.password);  
    } 
}
