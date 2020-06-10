package com.ecom.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ecom.backend.entity.ProductCategory;

@RepositoryRestResource(collectionResourceRel="productCategory",path="product-category")
public interface ProductCatergoryRepository extends JpaRepository<ProductCategory,Long> {

}
