import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modèle coordonnee
import Coordonnees from '../models/coordonnees.model';

@Injectable({
  providedIn: 'root'
})
export class CoordonneeService {
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  getCoordonnees(): Observable<Coordonnees[]> {
    // On demande à retourner une liste de films (Film étant notre interface)
    // La partie entre parenthèse correspond à l'URL complète de notre route API
    return this.httpClient.get<Coordonnees[]>(`${this.apiUrl}/coordonnees`)
  }

  // Idem ici mais pour récupérer un film en particulier
  // Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
  getCoordonnee(id: number): Observable<Coordonnees> {
    return this.httpClient.get<Coordonnees>(`${this.apiUrl}/coordonnees/${id}`);
  }

  // Et ensuite c'est pareil pour toutes les autres requêtes
  createCoordonnee(coordonnee: Coordonnees): Observable<Coordonnees> {
    return this.httpClient.post<Coordonnees>(`${this.apiUrl}/coordonnees`, coordonnee);
  }

  // attention au paramètre de l'URL ${film.id} celui-ci fait référence au paramètre de l'objet film déclaré comme argument de ma fonction 
  updateCoordonnee(coordonnee: Coordonnees): Observable<Coordonnees> {
    return this.httpClient.put<Coordonnees>(`${this.apiUrl}/coordonnees/${coordonnee.id_coordonnees}`, coordonnee);
  }

  deleteCoordonnee(id: number): Observable<Coordonnees> {
    return this.httpClient.delete<Coordonnees>(`${this.apiUrl}/coordonnees/${id}`);
  }
}
