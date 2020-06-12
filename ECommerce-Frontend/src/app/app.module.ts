import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import {RouterModule,Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SearchComponent } from './components/search/search.component';

import { ProductDetailsComponent } from './components/product-details/product-details.component'
import{ JwPaginationComponent} from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

const routes: Routes= [
  {path:'products',component:ProductListComponent},
  {path:'search/:keyword',component:ProductListComponent},
  {path:'products/:id',component:ProductDetailsComponent},
  {path:'category/:id',component:ProductListComponent},
  {path:'',redirectTo:'/products',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
 ,
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent,
    JwPaginationComponent
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
