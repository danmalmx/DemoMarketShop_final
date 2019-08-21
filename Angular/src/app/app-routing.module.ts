import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path:   'shopping-cart', component: ShoppingCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
