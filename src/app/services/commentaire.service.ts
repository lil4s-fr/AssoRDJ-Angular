import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modèle commentaire
import Comment from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<Comment[]> {
    // On demande à retourner une liste de films (Film étant notre interface)
    // La partie entre parenthèse correspond à l'URL complète de notre route API
    return this.httpClient.get<Comment[]>(`${this.apiUrl}/comments`)
  }

  // Idem ici mais pour récupérer un film en particulier
  // Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
  getComment(id: number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.apiUrl}/comments/${id}`);
  }

  // Et ensuite c'est pareil pour toutes les autres requêtes
  createComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  // attention au paramètre de l'URL ${film.id} celui-ci fait référence au paramètre de l'objet film déclaré comme argument de ma fonction 
  updateComment(comment: Comment): Observable<Comment> {
    return this.httpClient.put<Comment>(`${this.apiUrl}/comments/${comment.id_commentaire}`, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.apiUrl}/comments/${id}`);
  }
}
