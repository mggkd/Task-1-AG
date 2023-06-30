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

  ngOnInit(): void {
    this.productList = this.productServ.getProducts();
  }

  addToBag(product: Product): void {
    const productInBag = this.bag.find(p => p.name === product.name);

    if (productInBag) {
      productInBag.quantity = (productInBag.quantity || 0) + (product.quantity || 0);
    } else {
      const productToAdd: Product = { ...product, quantity: product.quantity };
      this.bag.push(productToAdd);
    }
  }

  increaseQuantity(product: Product): void {
    product.quantity = (product.quantity || 0) + 1;
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity && product.quantity > 0) {
      product.quantity -= 1;
    }
  }

  calculateGrandTotal(): number {
    let grandTotal = 0;
    for (const product of this.bag) {
      const amount = (product.price || 0) * (product.quantity || 0);
      grandTotal += amount;
    }
    return grandTotal;
  }
}
