import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent {
  contactValide: boolean = false;

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


  // je crée une variable de soumission et de validation pour la création de la nouvelle demande de contact 
  submitted: boolean = false;

  ngOnInit() {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
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
          },
          (error:any) => {
            //throw erreur
            console.log(error);
          }
        )
      }
    }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
