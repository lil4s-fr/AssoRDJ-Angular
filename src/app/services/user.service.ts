import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modele user
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    // On demande à retourner une liste de films (Film étant notre interface)
    // La partie entre parenthèse correspond à l'URL complète de notre route API
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`)
  }

  // Idem ici mais pour récupérer un film en particulier
  // Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Et ensuite c'est pareil pour toutes les autres requêtes
  createEvent(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  }

  // attention au paramètre de l'URL ${film.id} celui-ci fait référence au paramètre de l'objet film déclaré comme argument de ma fonction 
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${user.numero_adherent}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/users/${id}`);
  }
}
