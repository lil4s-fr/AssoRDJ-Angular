import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Utilisateur from 'src/app/models/utilisateur.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit{
  // boolean pour affichage de la validation de la requète
  infoValid: boolean = false;

  // formValues pour la soumission de la nouvelle salle
  formValues: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    coordonnees: [[], Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    pseudo: [''],
    numeroAdherant: ['', Validators.required],
  });

  // je crée une variable de soumission et de validation pour la création de la nouvelle salle
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une liste de salles pour l'afficher
  userList$!: Observable<Utilisateur[]>;

  // boolean pour afficher le formulaire de modification
  affiche: boolean = false;

  btnValide : string = "Valider";

  @Input()
  user!: Utilisateur;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
   }

   onChangeAffichage() {
    this.affiche = !this.affiche;
   }
  /**
     * envoie les éléments de l'évènement vers le service au click
     */
  onModifyUser(formGroup: FormGroup) {
    // debug
    console.log(JSON.stringify(formGroup.value, null, 2));

    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
      // à l'utilisateur que le formulaire a bien été validé via un message
      this.userService.updateUser(formGroup.value).subscribe(
        (response:any) => {
          this.infoValid=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }
  //debug pour vérifier si les datas sont valides.
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
