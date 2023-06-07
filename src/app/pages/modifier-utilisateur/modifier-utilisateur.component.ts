import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, firstValueFrom, take } from 'rxjs';
import Utilisateur from 'src/app/models/utilisateur.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.css']
})
export class ModifierUtilisateurComponent implements OnInit{
  isLoaded!:Promise<boolean>;
  // boolean pour affichage de la validation de la requelle
  userValide: boolean = false;
  userDeleted: boolean = false;
  userid!: number;
  user!:Utilisateur|undefined;

  // je donne le nom du bouton
  btnValide: string = "Modifier le membre";

  // formValues pour la soumission du nouveau membre
  formValues: FormGroup = this.formBuilder.group({
    // je crée un champ nom qui est un FormControl, idem pour les autres champs
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    numeroAdherent: ['', Validators.required],
    pseudo: [''],
    email: ['', Validators.required],
    numeroTelephone: ['', Validators.required],
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
    private router: Router,
    private route: ActivatedRoute,
    ){
    this.userid = parseInt(this.route.snapshot.paramMap.get('id') !);
    this.getUserData();
  }

  ngOnInit() {
    // j'obtiens l'ID de l'utilisateur depuis l'URL
    // this.route.snapshot.paramMap.get('id')
    //                                         non-null assertion 👇
    // je réinitialise si l'utilisateur change les champs
    this.formValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
    this.deleteFormValues.valueChanges.subscribe(()=> {
      this.submitted=false;
    })
  }

  /**
   * envoie les éléments de l'évènement vers le service au click
   */
  onEditUser(formGroup: FormGroup) {
    //debug
    console.log(JSON.stringify(formGroup.value, null, 2));
    formGroup.value.permission = { "id": formGroup.value.permission }
    formGroup.value.id = this.user?.id;

    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      this.userService.updateUser(formGroup.value).subscribe(
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

  async getUserData(){
    let returner:Utilisateur|undefined;
    try{
      this.user = await firstValueFrom(this.userService.getUser(this.userid).pipe(take(1)));
      this.formValues.setValue({
        nom: this.user.nom,
        prenom: this.user.prenom,
        numeroAdherent: this.user.numeroAdherent,
        pseudo: this.user.pseudo,
        email: this.user.email,
        numeroTelephone: this.user.numeroTelephone,
        permission: this.user.permission.id,
      })
      this.isLoaded = Promise.resolve(true);
      console.log(this.user);
    }
    catch(err){
      console.log(err);
    }
    return returner;
  }

  // onDeleteUser(id: number) {
  //   console.log(" deleteFormValue : " + this.deleteFormValues);
    
  //   // si le formulaire est valide, je passe la variable formValidated à true ce qui me permettra de signaler
  //   // à l'utilisateur que le formulaire a bien été validé via un message
  //   this.userService.deleteUser(id).subscribe(
  //     (response:any) => {
  //       this.userDeleted=true;
  //     },
  //     (error:any) => {
  //       //throw erreur
  //       console.log(error);
  //     }
  //   )
    
  // }



  //debug pour vérifier si les datas sont valides.

  onRedirectEditUser(id: number){
    this.router.navigate(['/modifierutilisateur', id])
  }
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
