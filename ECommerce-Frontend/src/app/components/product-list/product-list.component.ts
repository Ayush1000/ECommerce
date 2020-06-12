import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import {NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap"
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  currentCategoryId: number=1;
  searchMode: boolean=false;
  previousCategory: number =1;
  //new properties for server side paging.

  currentPage :number = 1;
  pageSize : number = 5;
  totalRecords: number =0;

  


  constructor(private _productservice: ProductService,
              private _activatedRoute: ActivatedRoute,
              private _cartService : CartService,
              private _spinnerService: NgxSpinnerService,
              _config:NgbPaginationConfig) { 
                _config.maxSize=3;
                _config.boundaryLinks = true;
              }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  
  updatePageSize(pageSize:  number)
  {
    this.pageSize= pageSize;
    this.currentPage =1;
    this.listProducts();
  }
  listProducts(){
    //spinner code
    this._spinnerService.show();
    this.searchMode= this._activatedRoute.snapshot.paramMap.has('keyword');
    
    if (this.searchMode) {
      //do search
      this.handleSearchProducts();
    }else{
      //display products
      this.handleListProducts();
    }
  }

  handleListProducts(){
    const hasCategoryId :Boolean= this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId=+this._activatedRoute.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId=1;
    }
    //setting up the page number to ne on category change.
    if(this.previousCategory != this.currentCategoryId){
      this.currentPage = 1;
    }
    this.previousCategory=this.currentCategoryId;
    this._productservice.getProducts(this.currentCategoryId,this.currentPage-1,this.pageSize).subscribe(
     
           this.processPaginate()
    );
  }
  handleSearchProducts()
  {
    const keyword:string =this._activatedRoute.snapshot.paramMap.get('keyword');

    this._productservice.searchProducts(keyword,this.currentPage-1,this.pageSize).subscribe(
      this.processPaginate()
    );

  
 }
 processPaginate(){
  return data =>{
    
      //spinner should stop
    this._spinnerService.hide();
    this.products = data._embedded.products;
    //page number starts from index 1.
    this.currentPage = data.page.number +1;
    this.totalRecords = data.page.totalElements;
    this.pageSize = data.page.size;
    
  }
} 


addToCart(product: Product)
{
  console.log(`product name: ${product.name} , and price: ${product.unitPrice}`);
  const cartItem = new CartItem(product);
  this._cartService.addToCart(cartItem);
}
}
