import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit{
  id!: number;
  @Input()
  nom!: string;
  prenom!: string;
  adresse!: string;
  numeroAsso!: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.getPersonnalData();
  }

  /**
   * récupération des données du service contact
   */
  getPersonnalData = () => {
    this.nom = this.userService.nom;
    this.prenom = this.userService.prenom;
    this.adresse = this.userService.adresse;
    this.numeroAsso = this.userService.numeroAsso;
  }
}
