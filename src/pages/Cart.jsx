import { Alert, Grid, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CartItem from "../components/cartItem/CartItem";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
function Cart() {
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const getTotal = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.taloPriceWithTaxAndRecharge * item.quantity;
    });

    return `${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  useEffect(() => {
    let totalQuantity = 0;

    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });

    setTotal(totalQuantity);
  }, [cart]);

  const handleClick = () => {
    setOpen(true);
    console.log("eliminado");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
      <Typography variant="h6" component="h2" style={{ textAlign: "left" }}>
        Carrito de compra ({total})
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="top"
      >
        <Grid item xs={6} md={8}>
          {cart?.map((product) => (
            <CartItem
              product={product}
              key={product.id}
              handleClick={handleClick}
            />
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
                    {getTotal()}
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
                    {getTotal()}
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
    </>
  );
}

export default Cart;
