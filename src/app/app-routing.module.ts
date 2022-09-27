import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AuthenticatedGuard } from './authenticated.guard';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'customers',
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: CustomerListComponent,
      },
      {
        path: 'new',
        component: CustomerFormComponent,
      },
      {
        path: 'edit/:id',
        component: CustomerFormComponent,
      },
      {
        path: 'details/:id',
        component: CustomerDetailComponent,
      },
    ],
  },
  {
    path: 'accounts',
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: AccountListComponent,
      },
      {
        path: 'new',
        component: AccountFormComponent,
      },
      {
        path: 'edit/:id',
        component: AccountFormComponent,
      },
      {
        path: 'details/:id',
        component: AccountDetailComponent,
      },
    ],
  },
  {
    path: 'unauthorized',
    canActivate: [AuthenticatedGuard],
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    canActivate: [AuthenticatedGuard],
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
