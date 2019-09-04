import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductService } from './shared/product.service';
import { CategoryService } from './shared/category.service';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ForbiddenComponent } from './admin/forbidden/forbidden.component';
import { OrdersServices } from './shared/orders.service';
import { ProductFormComponent } from './admin/admin-products/product-form/product-form.component';
import { ProductFormListComponent } from './admin/admin-products/product-form-list/product-form-list.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    RegistrationComponent,
    UserComponent,
    LoginComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    ProductCardComponent,
    ProductFormComponent,
    ProductFormListComponent,
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    // RouterModule.forRoot([
    //   {path:   '',component: HomeComponent },
    //   {path:   'products',component: ProductsComponent},
    //   {path:   'shopping-cart',component: ShoppingCartComponent},
    //   {path:   'check-out',component: CheckOutComponent},
    //   {path:   'order-success',component: OrderSuccessComponent},
    //   {path:   'login',component: LoginComponent},
    //   {path:   'my/orders',component: MyOrdersComponent },
    //   {path:   'admin/products',component: AdminProductsComponent},
    //   {path:   'admin/orders',component: AdminOrdersComponent}
    // ])
  ],
  providers: [ProductService, CategoryService, UserService, OrdersServices, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
