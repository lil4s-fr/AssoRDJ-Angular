import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom} from 'rxjs';
import Salle from 'src/app/models/salle.model';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-modifier-salle',
  templateUrl: './modifier-salle.component.html',
  styleUrls: ['./modifier-salle.component.css']
})
export class ModifierSalleComponent implements OnInit{
  isLoaded!:Promise<boolean>;
  //boolean pour affichage de la validation de la requette
  salleValide: boolean = false;
  salleDelete: boolean =false;

  salleid!: number;
  salle!: Salle|undefined;

  //Je donne le nom du bouton
  btnValide: string = "Modifier la salle"; 

   // je crée un constructeur qui prend en paramètre la déclaration d'une variable nommée formBuilder de type formBuilder
   constructor(
    private formBuilder: FormBuilder,
    private salleService: SalleService,
    private router: Router,
    private route: ActivatedRoute,
    ){
    this.salleid = parseInt(this.route.snapshot.paramMap.get('id') !);
    this.getSalleData();
  }

  // formValues pour la soumission de la modification de la salle
  formValues: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    capacite: ['', Validators.required],
    lieu: ['', Validators.required],
    acces_pmr: ['']
  });

  //formValues pour la suppression d'une salle
  deleteFormValues: FormGroup = this.formBuilder.group({
    id: [0, Validators.required]
  });

  // je crée une variable de soumission et de validation pour la modification de salle
  submitted: boolean = false;
  formValidated: boolean = false;

  // je crée une variable de soumission et de validation pour la suppression de salle
  deleteSubmitted: boolean = false;
  deleteFormValidated: boolean = false;

  ngOnInit() {
    // j'obtiens l'ID de la salle depuis l'URL
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

  onEditSalle(formGroup: FormGroup){
    //debug
    console.log(JSON.stringify(formGroup.value, null, 2));
    formGroup.value.permission = { "id": formGroup.value.permission }
    formGroup.value.id = this.salle?.id;
    // je passe la variable submitted à true pour pouvoir afficher a confirmation à l'écran avec un ngIf
    this.submitted = true;

    //  je vérifie si le formulaire est valide
    if (formGroup.valid) {
      this.salleService.updateSalle(formGroup.value).subscribe(
        (response:any) => {
          this.salleValide=true;
          window.location.reload();
        },
        (error:any) => {
          //throw erreur
          console.log(error);
        }
      )
    }
  }

  async getSalleData(){
    let returner: Salle|undefined;
    try{
      this.salle = await firstValueFrom(this.salleService.getSalle(this.salleid));
      this.formValues.setValue({
        nom: this.salle.nom,
        capacite : this.salle.capacite,
        lieu: this.salle.lieu,
        acces_pmr: this.salle.acces_pmr,
      })
      this.isLoaded = Promise.resolve(true);
      console.log(this.salle);
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

