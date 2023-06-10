import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CartItem from "../components/cartItem/CartItem";
import { getAllProducts } from "../axios/products";
function Cart() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        console.log("products", { res });
        // setUsers(res.data.data.items);

        const data = res.data.hits.slice(0, 4);
        setProducts(data);
        setTotal(data.length);
      })
      .catch((error) => {
        console.error({ error });
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Carrito de compra ({total})</h1>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="top"
      >
        <Grid item xs={6} md={8}>
          {products.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 16, fontWeight: 700, textAlign: "left" }}
                color="text.secondary"
                gutterBottom
              >
                Resumen de pedido
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4} md={4} style={{ textAlign: "left" }}>
                    Materiales
                  </Grid>
                  <Grid item xs={4} md={4}>
                    $
                  </Grid>
                  <Grid item xs={4} md={4}>
                    120.00
                  </Grid>
                </Grid>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={4}
                    md={4}
                    style={{ fontWeight: 700, textAlign: "left" }}
                  >
                    Total
                  </Grid>
                  <Grid item xs={4} md={4}>
                    $
                  </Grid>
                  <Grid item xs={4} md={4} style={{ fontWeight: 700 }}>
                    120.00
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
            <CardActions
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="success"
                style={{
                  borderRadius: 50,
                  fontSize: 12,
                  backgroundColor: "rgb(20 188 173)",
                  fontWeight: 700,
                  width: "100%",
                }}
              >
                Continuar con el pago
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
