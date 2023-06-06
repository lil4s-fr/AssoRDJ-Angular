import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

//import du modele categorie
import Categorie from '../models/categorie.model';
import Salle from '../models/salle.model';


@Injectable({
  providedIn: 'root'
})
export class SalleService {

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
  constructor(private http: HttpClient,) { }

  handleError(error: HttpErrorResponse){
    if (error.status === 0) {
        console.error("erreur: ", error.error);
    } else {
        console.error("erreur: " + error.status + "message: " + error.error)
    }
    return throwError( () => new Error("Erreur de récupération SalleService"))
  }

  /**
   * On demande à retourner une liste de salles
   * @returns La partie entre parenthèse correspond à l'URL complète de notre route API
   */
  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/salles`, this.httpOptions)
  }

  /**
   * récupérer une salle en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id salle
   * @returns lien vers l'API
   */
  getSalle(id: number): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}/salles/${id}`, this.httpOptions);
  }

  /**
   * requète pour créer une salle
   * @param salle id salle
   * @returns lien vers l'API
   */
  createSalle(salle: Salle): Observable<Salle> {    
    return this.http.post<Salle>(`${this.apiUrl}/salles`, salle).pipe(catchError(this.handleError)).pipe(catchError(this.handleError));
  }


  /**
   * attention au paramètre de l'URL ${salle.id} 
   * celui-ci fait référence au paramètre de l'objet salle déclaré comme argument de ma fonction 
   * @param salle id salle
   * @returns lien vers l'API
   */
  updateSalle(salle: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/salles/${salle.id}`, salle, this.httpOptions);
  }

  /**
   * requète pour détruire une salle
   * @param id id salle
   * @returns lien vers l'API
   */
  deleteSalle(id: number): Observable<Salle> {
    return this.http.delete<Salle>(`${this.apiUrl}/salles/${id}`, this.httpOptions).pipe(catchError(this.handleError));
  }
 
}
