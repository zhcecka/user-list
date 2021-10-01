import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  surname: string;
  name: string;
  birthday: string;
  company: string;
  email: string;
  phone: string;
  mask: string;
  id?: number;
  favourite?: boolean;
}

const CONTACTS_API = 'http://localhost:3000/api/contacts';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getContacts(searchString?: string): Observable<Contact[]> {
    const options = searchString ? {
      params: {
        search: searchString
      }
    } : {};
    return this.http.get<Contact[]>(CONTACTS_API, options);
  }

  public addContact(contact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(CONTACTS_API, contact);
  }

  public editContact(contact): Observable<Contact[]> {
    return this.http.put<Contact[]>(CONTACTS_API, contact);
  }

  public deleteContact(contact): Observable<Contact[]> {
    return this.http.delete<Contact[]>(`${CONTACTS_API}/${contact.id}`);
  }

  public getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${CONTACTS_API}/${id}`);
  }
}
