import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Utilisateur from 'src/app/models/utilisateur.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modifier-personal-data',
  templateUrl: './modifier-personal-data.component.html',
  styleUrls: ['./modifier-personal-data.component.css']
})
export class ModifierPersonalDataComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) {}

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

  // boolean pour affichage de la validation de la requète
  infoValid: boolean = false;

  btnValide : string = "Modifier";

  // je crée une variable de soumission et de validation pour la création de la nouvelle salle
  submitted: boolean = false;
  formValidated: boolean = false;

  ngOnInit(): void {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
   }

  onModifyUser(formGroup: FormGroup){

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
}
