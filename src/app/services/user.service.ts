import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

//import du modele user
import Utilisateur from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  handleError(error: HttpErrorResponse){
    if (error.status === 0) {
        console.error("erreur: ", error.error);
    } else {
        console.error("erreur: " + error.status + "message: " + error.error)
    }
    return throwError( () => new Error("Erreur de récupération SalleService"))
  }
  
  /**
   * On demande à retourner une liste d'utilisateurs
   * @returns URL complète de notre route API
   */
  getUsers(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(`${this.apiUrl}/utilisateurs`, this.httpOptions)
  }

  /**
   * récupérer un utilisateur en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id user
   * @returns URL complète de notre route API
   */
  getUser(id: number): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.apiUrl}/utilisateurs/${id}`, this.httpOptions);
  }

  /**
   * envoie du fichier pour récupérer uuid
   * @param file fichier à stocker
   * @returns 
   */
  sendFile(file: any): Observable<string> {
    const formData = new FormData();
    formData.append("img", file)
    return this.httpClient.post<string>(`${this.apiUrl}/utilisateurs/img`, formData);
  }

  /**
   * création d'un utilisateur
   * @param user id user
   * @returns URL complète de notre route API
   */
  createUser(user: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(`${this.apiUrl}/utilisateurs`, user, this.httpOptions).pipe(catchError(this.handleError));
  }

  /**
   * attention au paramètre de l'URL ${user.id}
   * celui-ci fait référence au paramètre de l'objet user déclaré comme argument de ma fonction 
   * @param user id user
   * @returns URL complète de notre route API
   */
  updateUser(user: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.apiUrl}/utilisateurs/${user.id}`, user, this.httpOptions);
  }

  /**
   * suppression d'un utilisateur
   * @param id id user
   * @returns URL complète de notre route API
   */
  deleteUser(id: number): Observable<Utilisateur> {
    return this.httpClient.delete<Utilisateur>(`${this.apiUrl}/utilisateurs/${id}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  connexion = (email: string, password: string):void => {}
}
