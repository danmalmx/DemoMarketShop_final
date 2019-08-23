import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ForbiddenComponent } from './admin/forbidden/forbidden.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/user/login', pathMatch: 'prefix' },
//   { path: 'user', component: UserComponent,
//     children: [
//         { path: 'registration', component: RegistrationComponent },
//         { path: 'login', component: LoginComponent }
//       ]
//     },
//     {path: '', component: HomeComponent, canActivate: [AuthGuard]},
//     {path:   'shopping-cart', component: ShoppingCartComponent},
//   ];

const routes: Routes = [
  { path: 'user', component: UserComponent,
  children: [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
  ]
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard],
      children: [
        { path: 'shopping-cart', component: ShoppingCartComponent },
    ]
   },
   { path: 'forbidden', component: ForbiddenComponent },
   { path: 'admin/admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard], data: {permittedRoles: ['Admin']} }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
