import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/model/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  productList: Product[] = [];
  bag: Product[] = [];

  constructor(private productServ: ProductService) { }

  ngOnInit() {
    this.productList = this.productServ.getProducts();
  }

  // addToBag(product: Product) {
  //   this.productServ.addToBag(product)
  // }

  addToBag(product: Product) {
    const productInBag = this.bag.find(p => p.name === product.name);

    if (productInBag) {
      productInBag.quantity = (productInBag.quantity || 0) + 1;
    } else {
      const productToAdd: Product = { ...product, quantity: 1 };
      this.bag.push(productToAdd);
    }
  }


  increaseQuantity(product: Product) {
    product.quantity = product.quantity ? product.quantity + 1 : 1;
  }

  decreaseQuantity(product: Product) {
    if (product.quantity && product.quantity > 0) {
      product.quantity -= 1;
    }
  }
}
