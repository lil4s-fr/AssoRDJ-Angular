import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modele article
import Article from '../models/article.model';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement.
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * On demande à retourner une liste d'articles
   * @returns La partie entre parenthèse correspond à l'URL complète de notre route API
   */
  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.apiUrl}/articles`)
  }

  /**
   * récupérer un article en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id article
   * @returns lien vers l'API
   */
  getArticle(id: number): Observable<Article> {
    return this.httpClient.get<Article>(`${this.apiUrl}/articles/${id}`);
  }

  /**
   * requète pour créer un article
   * @param article id article
   * @returns lien vers l'API
   */
  createArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.apiUrl}/articles`, article);
  }

  /**
   * attention au paramètre de l'URL ${article.id} 
   * celui-ci fait référence au paramètre de l'objet article déclaré comme argument de ma fonction 
   * @param article id article
   * @returns lien vers l'API
   */
  updateArticle(article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${this.apiUrl}/artciles/${article.id_article}`, article);
  }

  /**
   * requète pour détruire un article
   * @param id id article
   * @returns lien vers l'API
   */
  deleteArticle(id: number): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.apiUrl}/articles/${id}`);
  }
}
