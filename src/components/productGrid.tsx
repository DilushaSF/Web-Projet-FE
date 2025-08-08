import React from "react";
import type { Product } from "../pages/context/cartContext";
import { ProductCard } from "./productCard";
import { Grid, Box, Skeleton, Typography } from "@mui/material";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box
              sx={{
                bgcolor: "#F5F5F5",
                borderRadius: 1,
                boxShadow: 1,
                height: 320,
                display: "flex",
                flexDirection: "column",
                // animation: "pulse 1.5s infinite",
                // "@keyframes pulse": {
                //   "0%": { opacity: 1 },
                //   "50%": { opacity: 0.6 },
                //   "100%": { opacity: 1 },
                // },
              }}
            >
              <Skeleton variant="rectangular" height={192} />
              <Box
                sx={{
                  p: 2,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton variant="text" sx={{ width: "75%", mb: 1 }} />
                <Skeleton variant="text" sx={{ width: "50%", mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Skeleton variant="text" sx={{ width: "25%" }} />
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "25%", height: 32 }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ my: 12, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "#616161", mb: 1 }}>
          No products found
        </Typography>
        <Typography sx={{ color: "#9E9E9E" }}>
          Try adjusting your search or filter criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
