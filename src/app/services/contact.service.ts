import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import du modèle de contact 
import ContactRequest from '../models/contactRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000';

  // Injection de la dépendence HttpClient
  constructor(private httpClient: HttpClient) { }

  getContacts(): Observable<ContactRequest[]> {
    // On demande à retourner une liste de films (Film étant notre interface)
    // La partie entre parenthèse correspond à l'URL complète de notre route API
    return this.httpClient.get<ContactRequest[]>(`${this.apiUrl}/contacts`)
  }

  // Idem ici mais pour récupérer un film en particulier
  // Lorsqu'on appellera la méthode, on devra alors lui passer l'ID en argument
  getContact(id: number): Observable<ContactRequest> {
    return this.httpClient.get<ContactRequest>(`${this.apiUrl}/contacts/${id}`);
  }

  // Et ensuite c'est pareil pour toutes les autres requêtes
  createContact(contactRequest: ContactRequest): Observable<ContactRequest> {
    return this.httpClient.post<ContactRequest>(`${this.apiUrl}/contacts`, contactRequest);
  }

  // attention au paramètre de l'URL ${film.id} celui-ci fait référence au paramètre de l'objet film déclaré comme argument de ma fonction 
  updateContact(contactRequest: ContactRequest): Observable<ContactRequest> {
    return this.httpClient.put<ContactRequest>(`${this.apiUrl}/contacts/${contactRequest.id_demandecontact}`, contactRequest);
  }

  deleteContact(id: number): Observable<ContactRequest> {
    return this.httpClient.delete<ContactRequest>(`${this.apiUrl}/contacts/${id}`);
  }
}
