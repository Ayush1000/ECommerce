import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/ecom/products"


  constructor(private httpClient: HttpClient) { }
    getProducts(theCategoryId:number): Observable<Product[]>
    {
      const searchUrl =`${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(Response => Response._embedded.products)
      )
    }
  }
interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }
}
