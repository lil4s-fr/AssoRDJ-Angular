import { Component, Input, OnInit } from '@angular/core';
import Article from 'src/app/models/article.model';
import Utilisateur from 'src/app/models/utilisateur.model';
import { ArticleService } from 'src/app/services/article.service'
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit{
  // bollean affichage de l'article complet
  afficheArticle: boolean = true;

  // je récupère la liste des utilisateurs
  users!: Utilisateur[];

  constructor ( 
    private articleService: ArticleService,
    private utilisateurService: UserService
    ){}

  ngOnInit() {
    // alert(JSON.stringify(this.event, null, 2));
    this.utilisateurService.getUsers().subscribe(
      (response:any) => {
        this.users = response;
      },
      (error:any) => {
        alert(error);
      }
    )
  }
  @Input()
  article!: Article;

  afficheArticleComplet = () => { 
    console.log(this.afficheArticle);
    this.afficheArticle = !this.afficheArticle;

    console.log(this.afficheArticle);

  }
}
