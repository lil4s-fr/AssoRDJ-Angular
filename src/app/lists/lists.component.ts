import { Component, Input } from '@angular/core';

//import des models de données 
import Article from 'src/app/models/article.model';
import Evenement from 'src/app/models/evenement.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent {

  @Input()
  events!: Evenement[];

  @Input()
  articles!: Article[];
}
