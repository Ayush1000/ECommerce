import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  constructor(private _activatedRoute:ActivatedRoute,
              private _productService:ProductService,
              private _cartService: CartService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      ()=>{
        this.getProductInfo();
      }
    )
  }


  getProductInfo(){
    const id: number =+this._activatedRoute.snapshot.paramMap.get('id');

    this._productService.get(id).subscribe(
      data => {
        this.product = data; 
      }
    )
  }

  addToCart()
  {
    const cartItem = new CartItem(this.product);
    this._cartService.addToCart(cartItem);
  }
}
