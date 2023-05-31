import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import du modèle de reservation
import Reservation from '../models/idReservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  // Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement.
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * On demande à retourner une liste de réservations
   * @returns URL complète de notre route API
   */
  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.apiUrl}/reservations`)
  }

  /**
   * récupérer une réservation en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id reservation
   * @returns URL complète de notre route API
   */
  getReservation(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.apiUrl}/reservations/${id}`);
  }

  /**
   * création d'un évènement
   * @param reservation id reservation
   * @returns URL complète de notre route API
   */
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
  }

  // 
  /**
   * attention au paramètre de l'URL ${reservation.id}
   * celui-ci fait référence au paramètre de l'objet reservation déclaré comme argument de ma fonction 
   * @param reservation id reservation
   * @returns URL complète de notre route API
   */
  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(`${this.apiUrl}/reservations/${reservation.id_reservation}`, reservation);
  }

  /**
   * suppression d'une réservation
   * @param id id reservation
   * @returns URL complète de notre route API
   */
  deleteReservation(id: number): Observable<Reservation> {
    return this.httpClient.delete<Reservation>(`${this.apiUrl}/reservations/${id}`);
  }

// méthode à renseigner pour ajouter une réservation à la bdd
  onAddBook = (date: Date, salle: string, participants: string[], description: string): void => {

  }
}
