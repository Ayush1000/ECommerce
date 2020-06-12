import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  currentCategoryId: number=1;
  searchMode: boolean=false;
  //new properties for server side paging.

  currentPage :number = 1;
  pageSize : number = 5;
  totalRecords: number =0;

  


  constructor(private _productservice: ProductService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  
  updatePageSize(pageSize:  number)
  {
    
    this.listProducts();
  }
  listProducts(){
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

    this._productservice.getProducts(this.currentCategoryId,this.currentPage-1,this.pageSize).subscribe(
     
           this.processPaginate()
    );
  }
  handleSearchProducts()
  {
    const keyword:string =this._activatedRoute.snapshot.paramMap.get('keyword');

    this._productservice.searchProducts(keyword).subscribe(
      data =>{
        this.products = data;
      }
    )

  
 }
 processPaginate(){
  return data =>{
    this.products = data._embedded.products;
    //page number starts from index 1.
    this.currentPage = data.page.number +1;
    this.totalRecords = data.page.totalElements;
    this.pageSize = data.page.size;
  }
} 
}
