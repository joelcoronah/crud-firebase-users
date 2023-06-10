import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 250, margin: 1, backgroundColor: "#f8f8f8" }}>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {product.brands.map((brand, index) => (
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            key={brand + index}
          >
            {brand.toUpperCase()}
          </Typography>
        ))}

        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          style={{
            textAlign: "left",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
            fontWeight: "600",
          }}
        >
          {product.name}
        </Typography>

        <CardMedia
          component="img"
          alt={product.name}
          height="160"
          style={{
            borderRadius: 5,
            paddingBottom: 10,
            boxShadow: "9px 0px 5px -1px rgba(201,201,201,0.52)",
          }}
          image={product.imagePath}
        />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ fontWeight: "600" }}
        >
          ${product.taloPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
            fontWeight: 400,
          }}
        >
          Ver detalle del producto
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
