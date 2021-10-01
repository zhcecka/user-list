import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataService, Contact } from '../services/data.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: 'contacts-list.page.html',
  styleUrls: ['contacts-list.page.scss'],
})
export class ContactsListPage {
  public contacts: Observable<Contact[]>;
  public favouriteContacts: Observable<Contact[]>;

  constructor(
    private data: DataService,
    private router: Router
    ) {
  }

  ionViewWillEnter() {
    this.contacts = this.data.getContacts();
    this.favouriteContacts = this.contacts.pipe(map((data) => data.filter((contact) => contact.favourite)));
  }

  // refresh(ev) {
  //   setTimeout(() => {
  //     ev.detail.complete();
  //   }, 3000);
  // }

  search(event: CustomEvent) {
    const searchString = event.detail.value;
    this.contacts = this.data.getContacts(searchString);
  }

  addContact() {
    this.router.navigate(['/new-contact']);
  }

  onDeleteContact(contact: Contact) {
    this.contacts = this.data.deleteContact(contact);
    this.favouriteContacts = this.contacts.pipe(map((data) => data.filter((item) => item.favourite)));
  }

}
