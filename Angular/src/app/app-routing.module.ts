import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './product-card/product-card.component';
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
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'order-success', component: OrderSuccessComponent, data: { permittedRoles: ['Customer'] } },
      { path: 'check-out', component: CheckOutComponent, data: { permittedRoles: ['Customer'] } },
      { path: 'shopping-cart', component: ShoppingCartComponent, data: { permittedRoles: ['Customer'] } },
      { path: 'products/products', component: ProductsComponent, data: { permittedRoles: ['Customer'] } },
      { path: 'admin/admin-orders', component: AdminOrdersComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
      { path: 'admin/admin-products', component: AdminProductsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } }
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent, data: { permittedRoles: ['Customer'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
