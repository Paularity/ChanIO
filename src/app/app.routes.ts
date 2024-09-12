import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: HomeComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
