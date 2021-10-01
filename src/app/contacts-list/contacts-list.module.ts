import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ContactsListPage } from './contacts-list.page';
import { ContactsListPageRoutingModule } from './contacts-list-routing.module';
import { ContactComponentModule } from '../contact/contact.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactComponentModule,
    ContactsListPageRoutingModule
  ],
  declarations: [ContactsListPage]
})
export class ContactsListPageModule {}
