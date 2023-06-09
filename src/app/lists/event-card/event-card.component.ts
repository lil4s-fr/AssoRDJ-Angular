import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Categorie from 'src/app/models/categorie.model';
import Evenement from 'src/app/models/evenement.model';
import Utilisateur from 'src/app/models/utilisateur.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit{
  
  // bollean affichage de l'évènement complet
  afficheEvent: boolean = true;

  // je récupère la liste des catégories et utilisateurs
  categories!: Categorie[];
  users!: Utilisateur[];

  constructor ( 
    private eventService: EventService,
    private categorieService: CategorieService,
    private utilisateurService: UserService
    ){}

  ngOnInit() {
    // alert(JSON.stringify(this.event, null, 2));
    this.categorieService.getCategories().subscribe(
      (response:any) => {
        this.categories = response;
      },
      (error:any) => {
        alert(error);
      }
    )

    // alert(JSON.stringify(this.event, null, 2));
    this.utilisateurService.getUsers().subscribe(
      (response:any) => {
        this.users = response;
      },
      (error:any) => {
        alert(error);
      }
    )
  }

  @Input()
  event!: Evenement;

  
  afficheEventComplet = () => { 
    console.log(this.afficheEvent);
    this.afficheEvent = !this.afficheEvent;

    console.log(this.afficheEvent);

  }
}
