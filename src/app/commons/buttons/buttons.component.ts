
import { TypeofExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, Output, OnInit  } from '@angular/core';


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})

export class ButtonsComponent implements OnInit{
  constructor() {}

  // récupère la valeur à mettre dans le bouton dans le composant dans lequel il est appelé
  @Input()
  value: string = ""
  @Input()
  type: string = ""

  // évènement click émit par la méthode action vers le composant équipe pour la méthode addEquipe
  @Output()
  event: EventEmitter<void> = new EventEmitter<void>()

  ngOnInit(): void {}

  /**
   * écoute l'évènement du composant qui utilise le bouton pour adapter le nom du bouton
   */
  action = () => {
    this.event.emit();
  }
}
