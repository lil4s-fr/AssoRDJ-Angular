import { Component, OnInit } from '@angular/core';
import Contact from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contactValide: boolean = false;
  contactDeleted: boolean = false;

  btnValide: string = "Envoyer";

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    ){}

  // formValues pour la soumission de la nouvelle salle
  formValues: FormGroup = this.formBuilder.group({
    // je crée les champs du FormControl
    mail: ['', Validators.required],
    message: ['', Validators.required],
    typeDemande: [, Validators.required]
  });

  // formValues pour la suppression de la demande de contact
  deleteFormValues: FormGroup = this.formBuilder.group([{
    id: [0, Validators.required]    
  }]);

  // je crée une variable de soumission et de validation pour la suppression de la demande de contact
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  // je crée une liste de salles pour l'afficher
  contactList$!: Observable<Contact[]>;

  // je crée une variable de soumission et de validation pour la création de la nouvelle demande de contact 
  submitted: boolean = false;

  ngOnInit() {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })

    // j'initialise la liste des demande de contact en allant chercher dans le service
    this.contactList$ = this.contactService.getContacts();
  }
     /**
   * envoie les éléments de la demande de contact vers le service au click
   */
  onAddContact(formGroup: FormGroup) {
      // debug
      console.log(JSON.stringify(formGroup.value, null, 2));
      formGroup.value.typeDemande = { "id": formGroup.value.typeDemande }

      // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
      this.submitted = true;

      //  je vérifie si le formulaire est valide
      if (formGroup.valid) {
        // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
        // à l'utilisateur que le formulaire a bien été validé via un message
        this.contactService.createContact(formGroup.value).subscribe(
          (response:any) => {
            this.contactValide=true;
            window.location.reload();
          },
          (error:any) => {
            //throw erreur
            console.log(error);
          }
        )
      }
    }
    /**
   * suppression d'une salle
   * @param id de la salle
   */
  onDeleteContact(id: number) {    
    // je passe la variable submitted à true
    this.deleteSubmitted = true;
      
    this.contactService.deleteContact(id).subscribe(
      (response:any) => {
        this.contactDeleted=true;
        window.location.reload();
      },
      (error:any) => {
        //throw erreur
        console.log(error);
      }
    )    
  }
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
