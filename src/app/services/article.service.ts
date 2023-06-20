import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modele article
import Article from '../models/article.model';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement.
  private apiUrl = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * On demande à retourner une liste d'articles
   * @returns La partie entre parenthèse correspond à l'URL complète de notre route API
   */
  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.apiUrl}/articles`, this.httpOptions)
  }

  /**
   * récupérer un article en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id article
   * @returns lien vers l'API
   */
  getArticle(id: number): Observable<Article> {
    return this.httpClient.get<Article>(`${this.apiUrl}/articles/${id}`, this.httpOptions);
  }
  /**
   * On demande a retourner les 2 derniers articles
   * @returns La partie entre parenthèse correspond à l'URL complète de notre route API
   */
  getTwoLastArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.apiUrl}/articles/twolastarticles`)
  }
  
  /**
   * envoie du fichier pour récupérer uuid
   * @param file fichier à stocker
   * @returns 
   */
  sendFile(file: any): Observable<string> {
    const formData = new FormData();
    formData.append("img", file)
    return this.httpClient.post<string>(`${this.apiUrl}/articles/img`, formData);
  }

  /**
   * requète pour créer un article
   * @param article id article
   * @returns lien vers l'API
   */
  createArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.apiUrl}/articles`, article, this.httpOptions);
  }

  /**
   * attention au paramètre de l'URL ${article.id} 
   * celui-ci fait référence au paramètre de l'objet article déclaré comme argument de ma fonction 
   * @param article id article
   * @returns lien vers l'API
   */
  updateArticle(article: Article): Observable<Article> {
    return this.httpClient.put<Article>(`${this.apiUrl}/articles/${article.id}`, article, this.httpOptions);
  }

  /**
   * requète pour détruire un article
   * @param id id article
   * @returns lien vers l'API
   */
  deleteArticle(id: number): Observable<Article> {
    return this.httpClient.delete<Article>(`${this.apiUrl}/articles/${id}`, this.httpOptions);
  }
}
