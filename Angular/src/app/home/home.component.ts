import { Component, OnInit } from '@angular/core';
import { ProductService } from './../shared/product.service';
import { Product } from './../shared/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getProducts();
  }

}
