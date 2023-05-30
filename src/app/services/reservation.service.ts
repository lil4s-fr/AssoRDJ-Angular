import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modèle de reservation
import Reservation from '../models/idReservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    // On demande à retourner une liste de films (Film étant notre interface)
    // La partie entre parenthèse correspond à l'URL complète de notre route API
    return this.httpClient.get<Reservation[]>(`${this.apiUrl}/reservations`)
  }

  // Idem ici mais pour récupérer un film en particulier
  // Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
  getReservation(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.apiUrl}/reservations/${id}`);
  }

  // Et ensuite c'est pareil pour toutes les autres requêtes
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
  }

  // attention au paramètre de l'URL ${film.id} celui-ci fait référence au paramètre de l'objet film déclaré comme argument de ma fonction 
  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(`${this.apiUrl}/reservations/${reservation.id_reservation}`, reservation);
  }

  deleteReservation(id: number): Observable<Reservation> {
    return this.httpClient.delete<Reservation>(`${this.apiUrl}/reservations/${id}`);
  }
}
