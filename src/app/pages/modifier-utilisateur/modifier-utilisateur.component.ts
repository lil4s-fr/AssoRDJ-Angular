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

  changementMDPValide: boolean = false;
  afficherPwd: boolean = false;
  password!: string;
  passwordBienChange:boolean = false;

  userid!: number;
  user!:Utilisateur|undefined;

  // je donne le nom du bouton
  btnValide: string = "Modifier le membre";
  btnDelete: string = "Modifier le mot de passe";

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
    alert(JSON.stringify(formGroup.value, null, 2));
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

  onDeleteUser(){
    alert('deleteuser');
  }

  onUpdatePassword(){
    if(!this.changementMDPValide){
      this.changementMDPValide = true
      this.btnDelete = "Etes vous sûr ?"
    }
    else if(this.changementMDPValide && !this.afficherPwd){
      this.password = this.generatePassword();
      this.afficherPwd = true;
      let formDelete:FormGroup = this.formBuilder.group({
        id: [this.user?.id],
        nom: [this.user?.nom],
        prenom: [this.user?.prenom],
        numeroAdherent: [this.user?.numeroAdherent],
        pseudo: [this.user?.pseudo],
        email: [this.user?.email],
        numeroTelephone: [this.user?.numeroTelephone],
        hashMotDePasse: [this.password]
      }) 
      formDelete.value.permission = {"id": this.user?.permission.id};
      this.userService.updateUser(formDelete.value).subscribe(
        (response:any) => {
          this.passwordBienChange=true;
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }

  generatePassword(){
    //TODO: ceci n'est pas une méthode safe, et elle doit être changée à la mise
    //en production. Il s'agit juste de faire des tests pour l'instant.
    let wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";
    let length = 20;
    let pwd = new Array(length)

    for (let index = 0; index < pwd.length; index++) {
      let char = wishlist.charAt(this.getRandomInt(0, wishlist.length +1));
      pwd[index] = char;
    }

    return pwd.join('');
  }

  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
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

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
