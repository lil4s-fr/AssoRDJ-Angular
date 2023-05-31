import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modèle coordonnee
import Coordonnees from '../models/coordonnees.model';

@Injectable({
  providedIn: 'root'
})
export class CoordonneeService {
  // Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement.
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * On demande à retourner une liste de coordonnées
   * @returns URL complète de notre route API
   */
  getCoordonnees(): Observable<Coordonnees[]> {
    return this.httpClient.get<Coordonnees[]>(`${this.apiUrl}/coordonnees`)
  }

  /**
   * récupérer des coordonnées en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id coordonnee
   * @returns URL complète de notre route API
   */
  getCoordonnee(id: number): Observable<Coordonnees> {
    return this.httpClient.get<Coordonnees>(`${this.apiUrl}/coordonnees/${id}`);
  }

  /**
   * création de coordonnées
   * @param coordonnee id coordonnee
   * @returns URL complète de notre route API
   */
  createCoordonnee(coordonnee: Coordonnees): Observable<Coordonnees> {
    return this.httpClient.post<Coordonnees>(`${this.apiUrl}/coordonnees`, coordonnee);
  }

  /**
   * attention au paramètre de l'URL ${coordonnee.id}
   * celui-ci fait référence au paramètre de l'objet coordonnee déclaré comme argument de ma fonction 
   * @param coordonnee id coordonnee
   * @returns URL complète de notre route API
   */
  updateCoordonnee(coordonnee: Coordonnees): Observable<Coordonnees> {
    return this.httpClient.put<Coordonnees>(`${this.apiUrl}/coordonnees/${coordonnee.id_coordonnees}`, coordonnee);
  }

  /**
   * destruction d'une coordonnée
   * @param id id coordonnee
   * @returns URL complète de notre route API
   */
  deleteCoordonnee(id: number): Observable<Coordonnees> {
    return this.httpClient.delete<Coordonnees>(`${this.apiUrl}/coordonnees/${id}`);
  }
}
