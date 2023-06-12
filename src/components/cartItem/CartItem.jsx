import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Alert,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function CartItem({ product, handleClick }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Card
        sx={{ minWidth: 275, marginBottom: "2px", backgroundColor: "#f8f8f8" }}
      >
        <CardContent>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} md={4}>
              <CardMedia
                component="img"
                alt={product.name}
                height="100"
                style={{
                  borderRadius: 5,
                  boxShadow: "9px 0px 5px -1px rgba(201,201,201,0.52)",
                  width: "100%",
                }}
                image={product.imagePath}
              />
            </Grid>
            <Grid item xs={6} md={8}>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item xs={6} md={6}>
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} md={12}>
                      {product.brands.map((brand, index) => (
                        <Typography
                          gutterBottom
                          component="div"
                          key={brand + index}
                          style={{ fontWeight: "600", fontSize: 10 }}
                        >
                          {brand.toUpperCase()}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Typography
                        gutterBottom
                        component="div"
                        style={{
                          textAlign: "left",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "100%",
                          fontWeight: "600",
                          fontSize: 10,
                        }}
                      >
                        {product.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} md={6}>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{
                      textAlign: "right",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      width: "100%",
                      fontWeight: "600",
                      fontSize: 10,
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => {
                      handleClick();
                      dispatch(removeItem(product.id));
                    }}
                  >
                    Eliminar
                  </Typography>
                </Grid>

                <Grid item xs={6} md={6}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs={6} md={6}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{ fontWeight: "600", fontSize: 7 }}
                      >
                        Precio unitario
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{ fontWeight: "600", fontSize: 7 }}
                      >
                        $
                        {product.taloPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{ fontWeight: "600", fontSize: 7 }}
                      >
                        Precio total
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{ fontWeight: "600", fontSize: 7 }}
                      >
                        $
                        {product.taloPriceWithTaxAndRecharge
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={3} md={3}>
                      <IconButton
                        variant="contained"
                        style={{
                          borderRadius: 50,
                          backgroundColor: "purple",
                        }}
                        onClick={() => dispatch(decrementQuantity(product.id))}
                        size="small"
                      >
                        <RemoveIcon
                          style={{
                            color: "white",
                            maxWidth: "10px",
                            maxHeight: "10px",
                            minWidth: "10px",
                            minHeight: "10px",
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <TextField
                        id="standard-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={product.quantity}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <IconButton
                        variant="contained"
                        style={{ borderRadius: 50, backgroundColor: "purple" }}
                        size="small"
                        onClick={() => {
                          dispatch(incrementQuantity(product.id));
                        }}
                      >
                        <AddIcon
                          style={{
                            color: "white",
                            maxWidth: "10px",
                            maxHeight: "10px",
                            minWidth: "10px",
                            minHeight: "10px",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CartItem;
