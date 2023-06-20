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

  //transmission du fichier
  fileName: string = '';
  file!: File;
  uuid!: string;

  // formValues pour la soumission du nouveau membre
  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour les autres champs
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    numeroAdherent: ['', Validators.required],
    pseudo: [''],
    email: ['', Validators.required],
    telephone: ['', Validators.required],
    hashMotDePasse: ['', Validators.required],
    permission: ['', Validators.required],
    fichier: [null]
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
  userList: Utilisateur[] = [];

  // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ){
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.userList = users;
    })

    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
  }

  /**
   * envoie du fichier vers le service pour pécupérer l'uuid
   * @param event fichier en transit
   */
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.userService.sendFile(this.file).subscribe({
        next:(response:any) => {
          console.log(response, !!response)
          this.uuid=response.fichier;          
        },
        error:(error:any) => {
          //throw erreur
          console.log(error);
        }
      })
    }
  }

  /**
   * envoie les éléments de l'évènement vers le service au click
   */
  onAddUser(formGroup: FormGroup) {
    //je reconstitue le formulaire
    const result = {
      nom: formGroup.value.nom,
      prenom: formGroup.value.prenom,
      numeroAdherent: formGroup.value.numeroAdherent,
      pseudo: formGroup.value.pseudo,
      email: formGroup.value.email,
      numeroTelephone: formGroup.value.telephone,
      hashMotDePasse: formGroup.value.hashMotDePasse,
      permission: { "id": formGroup.value.permission },
      coordonnees: [],
      fichier: this.uuid
    }
    
    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (result) {
      this.userService.createUser(result).subscribe({
        next:(response:any) => {
          this.userValide=true;
          this.userList.push(result);
        },
        error:(error:any) => {
          //throw erreur
          console.log(error);
        }
      })
    }
  }

  //debug pour vérifier si les datas sont valides.
  
  onRedirectEditUser(id?: number){
    this.router.navigate(['/modifierutilisateur', id])
  }
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
