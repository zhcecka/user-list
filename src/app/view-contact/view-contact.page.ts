import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService, Contact } from '../services/data.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.page.html',
  styleUrls: ['./view-contact.page.scss'],
})
export class ViewContactPage implements OnInit, OnDestroy {
  public contact: Contact;
  public isEditMode: boolean;
  public isAddMode: boolean;
  public isEmailNotValid: boolean;
  private subscribtion$: Subscription;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.subscribtion$ = this.data.getContactById(parseInt(id, 10)).subscribe((contact) => this.contact = contact);
    } else {
      this.contact = {
        surname: '',
        name: '',
        birthday: '',
        company: '',
        email: '',
        phone: '',
        mask: '',
      };
      this.isAddMode = true;
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Back' : '';
  }

  switchEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  addContact() {
  }

  saveContact() {
    // eslint-disable-next-line max-len
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(this.contact.email)) {
      this.isEmailNotValid = true;
      return;
    }
    if (this.contact.id !== undefined) {
      this.data.editContact(this.contact).subscribe();
    } else {
      this.data.addContact(this.contact).subscribe();
    }
    this.goBack();
  }

  makeFavourite() {
    this.contact.favourite = !this.contact.favourite;
    this.data.editContact(this.contact).subscribe();
  }

  input() {
    this.isEmailNotValid = false;
  }

  ngOnDestroy() {
    if (this.subscribtion$) {
      this.subscribtion$.unsubscribe();
    };
  }

  private goBack() {
    this.navCtrl.back();
  }
}
