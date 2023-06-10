/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { getAllProducts } from "../axios/products";

import ProductCard from "../components/productCard/productCard";
import Grid from "@mui/material/Grid";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        console.log("products", { res });
        // setUsers(res.data.data.items);
        setProducts(res.data.hits);
      })
      .catch((error) => {
        console.error({ error });
      });
  }, []);

  return (
    <Grid container spacing={1}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCard key={product.id} product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
