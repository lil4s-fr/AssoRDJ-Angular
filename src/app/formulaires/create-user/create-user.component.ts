import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Utilisateur from 'src/app/models/utilisateur.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  // boolean pour affichage de la validation de la requelle
  userValide: boolean = false;
  userDeleted: boolean = false;

  // je donne le nom du bouton
  btnValide: string = "Valider le membre";

  // formValues pour la soumission du nouveau membre
  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour les autres champs
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    numeroAdherent: ['', Validators.required],
    pseudo: [''],
    email: ['', Validators.required],
    numeroTelephone: ['', Validators.required],
    hashMotDePasse: ['', Validators.required],
    permission: ['', Validators.required]
  });

  // formValues pour la suppression du membre
  deleteFormValues: FormGroup = this.formBuilder.group({
    id: [0, Validators.required]    
  } 
  );

  // je crée une variable de soumission et de validation pour la création du nouveau membre
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression du membre
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  // je crée une liste de salles pour l'afficher
  userList$!: Observable<Utilisateur[]>;

  // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ){
  }

  ngOnInit() {
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })

    // j'initialise la liste des salles en allant chercher dans le service
    this.userList$ = this.userService.getUsers();
  }

  /**
   * envoie les éléments de l'évènement vers le service au click
   */
  onAddUser(formGroup: FormGroup) {
    //debug
    console.log(JSON.stringify(formGroup.value, null, 2));
    formGroup.value.permission = { "id": formGroup.value.permission }

    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      this.userService.createUser(formGroup.value).subscribe(
        (response:any) => {
          this.userValide=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }

  //debug pour vérifier si les datas sont valides.
  
  onRedirectEditUser(id: number){
    this.router.navigate(['/modifierutilisateur', id])
  }
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
