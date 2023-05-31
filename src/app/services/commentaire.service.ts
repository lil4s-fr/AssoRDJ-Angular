import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modèle commentaire
import Comment from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  // Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement.
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * On demande à retourner une liste de commentaires
   * @returns URL complète de notre route API
   */
  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.apiUrl}/comments`)
  }

  /**
   * récupérer un commentaire en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id comments
   * @returns URL complète de notre route API
   */
  getComment(id: number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.apiUrl}/comments/${id}`);
  }

  /**
   * création d'un commentaire
   * @param comment id comments
   * @returns URL complète de notre route API
   */
  createComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  /**
   * attention au paramètre de l'URL ${comment.id} 
   * celui-ci fait référence au paramètre de l'objet commentaire déclaré comme argument de ma fonction 
   * @param comment id comments
   * @returns URL complète de notre route API
   */
  updateComment(comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(`${this.apiUrl}/comments/${comment.id_commentaire}`, comment);
  }

  /**
   * destruction d'un commentaire
   * @param id id comments
   * @returns URL complète de notre route API
   */
  deleteComment(id: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.apiUrl}/comments/${id}`);
  }
}
