import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

//import du modele categorie
import Categorie from '../models/categorie.model';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

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
    return throwError( () => new Error("message que tu veux"))
  }
  /**
   * On demande à retourner une liste d'articles
   * @returns La partie entre parenthèse correspond à l'URL complète de notre route API
   */
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`, this.httpOptions)
  }

  /**
   * récupérer un article en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id article
   * @returns lien vers l'API
   */
  getCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/categories/${id}`, this.httpOptions);
  }

  /**
   * requète pour créer un article
   * @param article id article
   * @returns lien vers l'API
   */
  createCategorie(categorie: Categorie): Observable<Categorie> {
    console.log(categorie);
    
    return this.http.post<Categorie>(`${this.apiUrl}/categories`, categorie).pipe(catchError(this.handleError));
  }


  /**
   * attention au paramètre de l'URL ${article.id} 
   * celui-ci fait référence au paramètre de l'objet categorie déclaré comme argument de ma fonction 
   * @param categorie id categorie
   * @returns lien vers l'API
   */
  updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/categories/${categorie.id}`, categorie, this.httpOptions);
  }

  /**
   * requète pour détruire un categorie
   * @param id id categorie
   * @returns lien vers l'API
   */
  deleteCategorie(id: number): Observable<Categorie> {
    return this.http.delete<Categorie>(`${this.apiUrl}/categories/${id}`, this.httpOptions);
  }
 
}
