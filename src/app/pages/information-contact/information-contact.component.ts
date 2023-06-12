import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom} from 'rxjs';
import Contact from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-information-contact',
  templateUrl: './information-contact.component.html',
  styleUrls: ['./information-contact.component.css']
})
export class InformationContactComponent implements OnInit{

  isLoaded!:Promise<boolean>;

  contactid!: number;
  contact!: Contact | undefined;

  contactDelete: boolean = false;

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router : Router,
  ) {
    this.contactid = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getContactData();
  }

  formValues: FormGroup = this.formBuilder.group({
    utilisateur: ['', Validators.required],
    mail: ['', Validators.required],
    message: ['', Validators.required],
    typeDemande: ['', Validators.required]
  });

  //formValues pour la suppression d'une salle
  deleteFormValues: FormGroup = this.formBuilder.group({
    id: [0, Validators.required]
  });

  ngOnInit() {
    this.formValues.valueChanges.subscribe(() => {
      // Actions à effectuer lorsque les valeurs du formulaire changent
    });
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
  }

  onDeleteContact() {
    let id = this.contactid;
    this.contactService.deleteContact(id).subscribe(
      (response: any) => {
        this.contactDelete = true;
        console.log('Contact supprimé avec succès.');
        this.router.navigate(['/contact']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  async getContactData() {
    try {
      this.contact = await firstValueFrom(this.contactService.getContact(this.contactid));
      this.formValues.setValue({
        utilisateur: this.contact.utilisateur,
        mail: this.contact.mail,
        message: this.contact.message,
        typeDemande: this.contact.typeDemande,
      });
      this.isLoaded = Promise.resolve(true);
      console.log(this.contact);
    } catch (err) {
      console.log(err);
    }
  }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
