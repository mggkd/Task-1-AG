import { Injectable } from "@angular/core";
import { Product } from "../model/product.model";

Injectable({ providedIn: 'root' })

export class ProductService {

  private productList: Product[] = [];
  private bag: Product[] = [];

  addProduct(product: Product) {
    this.productList.push(product);
  }

  getProducts(): Product[] {
    return this.productList
  }

  // addToBag(product: Product) {
  //   this.bag.push(product);
  // }

  addToBag(product: Product) {
    const existingProduct = this.bag.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity = existingProduct.quantity ? existingProduct.quantity + 1 : 1;
    } else {
      this.bag.push({ ...product, quantity: 1 });
    }
  }

  getBag(): Product[] {
    return this.bag;
  }

  getListForConsole()  : Product[]{
    return this.productList
  }

}