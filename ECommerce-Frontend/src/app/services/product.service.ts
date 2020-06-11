import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/ecom/products";
  private categoryUrl ="http://localhost:8080/api/ecom/product-category";


  constructor(private httpClient: HttpClient) { }
    getProducts(theCategoryId:number): Observable<Product[]>
    {
      const searchUrl =`${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
      return this.getProductsList(searchUrl)
    }
  private getProductsList(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(Response => Response._embedded.products)
    );
  }

    getProductCategories():Observable<ProductCategory[]>{
      
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(Response => Response._embedded.productCategory)
      );
    }
    searchProducts(keyword:string): Observable<Product[]>
    {
      const searchUrl =`${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
      return this.getProductsList(searchUrl);
    };
  }
interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
