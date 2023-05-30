import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit{
  @Input()
  nom!: string;
  prenom!: string;
  adresse!: string;
  numeroAsso!: number;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
      this.getPersonnalData();
  }

  /**
   * récupération des données du service contact
   */
  getPersonnalData = () => {
    this.nom = this.contactService.nom;
    this.prenom = this.contactService.prenom;
    this.adresse = this.contactService.adresse;
    this.numeroAsso = this.contactService.numeroAsso;
  }
}
