import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ContactComponentModule } from '../contact/contact.module';

import { ContactsListPage } from './contacts-list.page';

describe('ContactsListPage', () => {
  let component: ContactsListPage;
  let fixture: ComponentFixture<ContactsListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsListPage ],
      imports: [IonicModule.forRoot(), ContactComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
