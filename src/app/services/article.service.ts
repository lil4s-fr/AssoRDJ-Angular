import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modele article
import Article from '../models/article.model';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Article[]> {
    // On demande à retourner une liste de films (Film étant notre interface)
    // La partie entre parenthèse correspond à l'URL complète de notre route API
    return this.httpClient.get<Article[]>(`${this.apiUrl}/articles`)
  }

  // Idem ici mais pour récupérer un film en particulier
  // Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
  getArticle(id: number): Observable<Article> {
    return this.httpClient.get<Article>(`${this.apiUrl}/articles/${id}`);
  }

  // Et ensuite c'est pareil pour toutes les autres requêtes
  createArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.apiUrl}/articles`, article);
  }

  // attention au paramètre de l'URL ${film.id} celui-ci fait référence au paramètre de l'objet film déclaré comme argument de ma fonction 
  updateArticle(article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${this.apiUrl}/artciles/${article.id_article}`, article);
  }

  deleteEvent(id: number): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.apiUrl}/articles/${id}`);
  }
}
