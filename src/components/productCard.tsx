import React from "react";
import { Link } from "react-router-dom";
import { type Product } from "../pages/context/cartContext";
import { categoryNames, brandNames } from "../utils/consts";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const categoryName = categoryNames[product.productCategory];
  const brandName = brandNames[product.productBrand];

  return (
    <Link
      to={`/product/${product.productId}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: 1,
          "&:hover": { boxShadow: 3 },
          transition: "box-shadow 0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TODO: check image URL changed */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={product?.images?.[0]?.url || "/placeholder.svg"}
            alt={product?.productName}
            sx={{
              aspectRatio: "1/1",
              overflow: "hidden",
              bgcolor: "#F5F5F5",
              "&:hover": { transform: "scale(1.05)" },
              transition: "transform 0.3s",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <Typography
              sx={{
                bgcolor: "#C39D63",
                color: "black",
                fontSize: "0.75rem",
                fontWeight: "bold",
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {categoryName?.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <CardContent
          sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ mb: 1, flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#424242",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product?.productName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#757575" }}>
              {brandName}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#0A1E38", fontWeight: "bold" }}
            >
              ${product?.price}
            </Typography>
            {/* <Button
              size="small"
              sx={{ bgcolor: "#0A1E38", color: "white", "&:hover": { bgcolor: "#0A1E38" } }}
            >
              Add
            </Button> */}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
