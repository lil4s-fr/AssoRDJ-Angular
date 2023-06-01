import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import du modèle de contact 
import ContactRequest from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Déclaration de l'URL vers notre API, pour ne pas avoir à la rappeller à chaque fois.
  // Idéalement, on devrait la placer en tant que variable d'environnement.
  private apiUrl = 'http://localhost:8080';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * On demande à retourner une liste de contacts
   * @returns URL complète de notre route API
   */
  getContacts(): Observable<ContactRequest[]> {
    return this.httpClient.get<ContactRequest[]>(`${this.apiUrl}/contacts`)
  }

  /**
   * récupérer un contact en particulier
   * Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
   * @param id id contact
   * @returns URL complète de notre route API
   */
  getContact(id: number): Observable<ContactRequest> {
    return this.httpClient.get<ContactRequest>(`${this.apiUrl}/contacts/${id}`);
  }

  /**
   * création d'un contact
   * @param contactRequest id contact
   * @returns URL complète de notre route API
   */
  createContact(contactRequest: ContactRequest): Observable<ContactRequest> {
    return this.httpClient.post<ContactRequest>(`${this.apiUrl}/contacts`, contactRequest);
  }

  /**
   * attention au paramètre de l'URL ${contactRequest.id}
   * celui-ci fait référence au paramètre de l'objet contact déclaré comme argument de ma fonction 
   * @param contactRequest id contact
   * @returns URL complète de notre route API
   */
  updateContact(contactRequest: ContactRequest): Observable<ContactRequest> {
    return this.httpClient.put<ContactRequest>(`${this.apiUrl}/contacts/${contactRequest.id}`, contactRequest);
  }

  /**
   * destruction d'un contact
   * @param id id contact
   * @returns URL complète de notre route API
   */
  deleteContact(id: number): Observable<ContactRequest> {
    return this.httpClient.delete<ContactRequest>(`${this.apiUrl}/contacts/${id}`);
  }  
}