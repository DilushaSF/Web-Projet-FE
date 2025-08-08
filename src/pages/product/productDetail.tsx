import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { ArrowBack, Add, Remove, ShoppingCart } from "@mui/icons-material";
import Slider from "react-slick";
import PageLayout from "../layout/pageLayout";
import { useCart } from "../context/cartContext";
import { getProductById } from "../../services/productService";
import { categoryNames, brandNames } from "../../utils/consts";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const [quantity, setQuantity] = useState<number>(
    items.find((item) => item.product.productId === id)?.quantity || 1
  );

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  console.log("id isss", id);
  const [tab, setTab] = useState("description");

  const handleAddToCart = () => {
    if (product) {
      // @ts-expect-error: Product type is not defined
      addToCart(product, quantity);

      enqueueSnackbar(`Added ${product.productName} to cart!`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  const categoryName = product
    ? categoryNames[product.productCategory] || "Unknown Category"
    : "";
  const brandName = product
    ? brandNames[product.productBrand] || "Unknown Brand"
    : "";

  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };

  if (isLoading || !product) {
    return (
      <PageLayout>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
          <Typography sx={{ mb: 4 }}>Loading...</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{ bgcolor: "#e0e0e0", aspectRatio: "1/1", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: "#e0e0e0", height: 200, borderRadius: 1 }} />
            </Grid>
          </Grid>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {/* Back button */}
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          sx={{ mb: 2, color: "#0A1E38" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {/* Main layout */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Slider {...sliderSettings}>
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <Box key={index} sx={{ textAlign: "center" }}>
                    <img
                      src={image}
                      alt={`${product.productName} ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                        objectFit: "contain",
                        margin: "auto",
                      }}
                    />
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src="https://via.placeholder.com/400"
                    alt="No image available"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                  />
                </Box>
              )}
            </Slider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                sx={{
                  bgcolor: "#C39D63",
                  color: "black",
                  display: "inline-block",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  mb: 1,
                  fontSize: "0.75rem",
                }}
              >
                {categoryName}
              </Typography>
              <Typography variant="h4" sx={{ color: "#0A1E38", mb: 1 }}>
                {product.productName}
              </Typography>
              <Typography sx={{ color: "#718096", mb: 2 }}>
                {brandName}
              </Typography>
              <Typography variant="h5" sx={{ color: "#0A1E38", mb: 2 }}>
                ${product.price}
              </Typography>
              <Typography sx={{ color: "#4B5563", mb: 2 }}>
                {product.productDescription}
              </Typography>
              {product.weight && (
                <Typography sx={{ color: "#4B5563", mb: 2 }}>
                  Weight: {product.weight} g
                </Typography>
              )}

              {/* Quantity */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ mr: 2 }}>Quantity:</Typography>
                <Box
                  sx={{
                    display: "flex",
                    border: "1px solid #D1D5DB",
                    borderRadius: 1,
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    disabled={quantity <= 1}
                    sx={{ p: 1 }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Box
                    sx={{
                      width: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {quantity}
                  </Box>
                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{ p: 1 }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Add to Cart */}
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                sx={{ width: "100%", bgcolor: "#0A1E38" }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box>
          <Typography variant="h5" sx={{ color: "#0A1E38", mb: 2 }}>
            Details
          </Typography>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Description" value="description" />
            <Tab label="Specifications" value="specifications" />
            <Tab label="Shipping" value="shipping" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tab === "description" && (
              <Typography sx={{ color: "#4B5563" }}>
                {product.productDescription}
              </Typography>
            )}
            {tab === "specifications" && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 1 }}>
                    <Typography sx={{ color: "#0A1E38", mb: 1 }}>
                      Product Info
                    </Typography>
                    <Typography sx={{ color: "#4B5563" }}>
                      Brand: {brandName}
                    </Typography>
                    <Typography sx={{ color: "#4B5563" }}>
                      Category: {categoryName}
                    </Typography>
                    {product.weight && (
                      <Typography sx={{ color: "#4B5563" }}>
                        Weight: {product.weight} g
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ bgcolor: "#F9FAFB", p: 2, borderRadius: 1 }}>
                    <Typography sx={{ color: "#0A1E38", mb: 1 }}>
                      Materials
                    </Typography>
                    <Typography sx={{ color: "#4B5563" }}>
                      {product.productCategory === 1
                        ? "Premium Quality Product"
                        : product.productCategory === 2
                        ? "Lightweight materials."
                        : product.productCategory === 3
                        ? "Leather with foam padding."
                        : "Lightweight materials."}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
            {tab === "shipping" && (
              <Box>
                <Typography sx={{ color: "#4B5563", mb: 2 }}>
                  Free shipping on orders over $50. Ships in 1-2 days.
                </Typography>
                <Typography sx={{ color: "#4B5563" }}>
                  Return within 30 days, unused, in original packaging.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default ProductDetail;
