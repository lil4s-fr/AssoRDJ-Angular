import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Impot du modele event
import IdEvent from '../models/idEvent.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
// Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement. On verra ça plus tard
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<IdEvent[]> {
    // On demande à retourner une liste de films (Film étant notre interface)
    // La partie entre parenthèse correspond à l'URL complète de notre route API
    return this.httpClient.get<IdEvent[]>(`${this.apiUrl}/events`)
  }

  // Idem ici mais pour récupérer un film en particulier
  // Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
  getEvent(id: number): Observable<IdEvent> {
    return this.httpClient.get<IdEvent>(`${this.apiUrl}/events/${id}`);
  }

  // Et ensuite c'est pareil pour toutes les autres requêtes
  createEvent(event: IdEvent): Observable<IdEvent> {
    return this.httpClient.post<IdEvent>(`${this.apiUrl}/events`, event);
  }

  // attention au paramètre de l'URL ${film.id} celui-ci fait référence au paramètre de l'objet film déclaré comme argument de ma fonction 
  updateEvent(event: IdEvent): Observable<IdEvent> {
    return this.httpClient.put<IdEvent>(`${this.apiUrl}/events/${event.id_evenement}`, event);
  }

  deleteEvent(id: number): Observable<IdEvent> {
    return this.httpClient.delete<IdEvent>(`${this.apiUrl}/events/${id}`);
  }

}
