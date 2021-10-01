import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('./contacts-list/contacts-list.module').then( m => m.ContactsListPageModule)
  },
  {
    path: 'contact/:id',
    loadChildren: () => import('./view-contact/view-contact.module').then( m => m.ViewContactPageModule)
  },
  {
    path: 'new-contact',
    loadChildren: () => import('./view-contact/view-contact.module').then( m => m.ViewContactPageModule)
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
