import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{
  // image pour la page 404
  imagePath: string = 'assets/images 404.jpg';

  // nom bouton
  btnValide: string = "Joue encore une fois ..."

  // jeu de dés aléatoire
  diceValues: number[] = [];
  totalDices: number = 0;

  ngOnInit() {
    this.generateDiceValues()
  }
  
  generateDiceValues() {
    this.totalDices = 0;
    const numberOfDice = 4; // Nombre de dés dans le jeu
    const minDiceValue = 1; // Valeur minimale d'un dé
    const maxDiceValue = 6; // Valeur maximale d'un dé
  
    
      for (let i = 0; i < numberOfDice; i++) {      
        const diceValue = Math.floor(Math.random() * (maxDiceValue - minDiceValue + 1)) + minDiceValue;
        //this.diceValues.push(diceValue);
        this.totalDices += diceValue;      
        if (this.totalDices == 24) {
          this.totalDices = 0;
          i = 0;
        }      
      }
  }
}