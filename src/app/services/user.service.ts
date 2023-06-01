import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modele user
import User from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// valeurs en dur pour le codage en attendant le lien dans la base de données
  nom: string = "Dias";
  prenom: string = "Antoine";
  adresse: string = "Rue de l'espérance 59144 Dunkerque";
  numeroAsso: number = 123654;

  // Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement.
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * On demande à retourner une liste d'utilisateurs
   * @returns URL complète de notre route API
   */
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`)
  }

  /**
   * récupérer un utilisateur en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id user
   * @returns URL complète de notre route API
   */
  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * création d'un utilisateur
   * @param user id user
   * @returns URL complète de notre route API
   */
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user);
  }

  /**
   * attention au paramètre de l'URL ${user.id}
   * celui-ci fait référence au paramètre de l'objet user déclaré comme argument de ma fonction 
   * @param user id user
   * @returns URL complète de notre route API
   */
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${user.numero_adherent}`, user);
  }

  /**
   * suppression d'un utilisateur
   * @param id id user
   * @returns URL complète de notre route API
   */
  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/users/${id}`);
  }

  connexion = (email: string, password: string):void => {}
}
