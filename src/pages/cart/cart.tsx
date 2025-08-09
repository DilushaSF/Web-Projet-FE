import { useNavigate } from "react-router-dom";
import { Grid, Box, Button, Typography, IconButton } from "@mui/material";
import { Delete, Add, Remove, ShoppingBag } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PageLayout from "../layout/pageLayout";
import { useCart } from "../context/cartContext";
import { useSnackbar } from "notistack";

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveItem = (
    productId: string | undefined,
    productName: string
  ) => {
    if (!productId) {
      enqueueSnackbar("Cannot remove item: Product ID is missing", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }
    removeFromCart(productId);
    enqueueSnackbar(`${productName} removed from cart`, {
      variant: "success",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  };

  const handleUpdateQuantity = (
    productId: string | undefined,
    newQuantity: number
  ) => {
    if (!productId) {
      enqueueSnackbar("Cannot update quantity: Product ID is missing", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
    enqueueSnackbar("Cart cleared", {
      variant: "success",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  };

  if (items.length === 0) {
    return (
      <PageLayout>
        <Box
          sx={{ maxWidth: 600, mx: "auto", px: 2, py: 16, textAlign: "center" }}
        >
          <ShoppingBag sx={{ fontSize: 64, color: "#9CA3AF", mb: 2 }} />
          <Typography variant="h4" sx={{ color: "#0A1E38", mb: 2 }}>
            Your Cart is Empty
          </Typography>
          <Typography sx={{ color: "#718096", mb: 4 }}>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/products")}
            sx={{ bgcolor: "#0A1E38", "&:hover": { bgcolor: "#0A1E38" } }}
          >
            Continue Shopping
          </Button>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        <Typography variant="h4" sx={{ color: "#0A1E38", mb: 4 }}>
          Your Cart
        </Typography>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  borderBottom: 1,
                  borderColor: "divider",
                  pb: 2,
                  mb: 2,
                  color: "#718096",
                  fontWeight: "medium",
                }}
              >
                <Box sx={{ flex: 1 }}>Product</Box>
                <Box sx={{ width: 100, textAlign: "center" }}>Quantity</Box>
                <Box sx={{ width: 80, textAlign: "right" }}>Price</Box>
                <Box sx={{ width: 80, textAlign: "right" }}>Total</Box>
                <Box sx={{ width: 60 }}></Box>
              </Box>

              {items.map((item) => (
                <Box
                  key={item.product.productId || Math.random()}
                  sx={{
                    display: { xs: "block", md: "flex" },
                    alignItems: "center",
                    py: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  {/* Product */}
                  <Box sx={{ flex: 1, display: "flex", mb: { xs: 2, md: 0 } }}>
                    <Link
                      to={`/dashboard/product/${item.product.productId || ""}`}
                    >
                      <Box
                        component="img"
                        src={item.product.images?.[0]}
                        alt={item.product.productName}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                          mr: 2,
                        }}
                      />
                    </Link>
                    <Box>
                      <Link
                        to={`/dashboard/product/${
                          item.product.productId || ""
                        }`}
                      >
                        <Typography
                          sx={{
                            color: "#0A1E38",
                            fontWeight: "medium",
                            "&:hover": { color: "#145DA0" },
                          }}
                        >
                          {item.product.productName}
                        </Typography>
                      </Link>
                      <Typography
                        sx={{
                          color: "#0A1E38",
                          fontWeight: "medium",
                          mt: 1,
                          display: { md: "none" },
                        }}
                      >
                        ${item.product.price}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Quantity */}
                  <Box
                    sx={{
                      width: 100,
                      display: "flex",
                      justifyContent: "center",
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        border: "1px solid #D1D5DB",
                        borderRadius: 1,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.productId,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        sx={{ p: 1 }}
                        aria-label="Decrease quantity"
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Box
                        sx={{
                          width: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "medium",
                        }}
                      >
                        {item.quantity}
                      </Box>
                      <IconButton
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.productId,
                            item.quantity + 1
                          )
                        }
                        sx={{ p: 1 }}
                        aria-label="Increase quantity"
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Price */}
                  <Box
                    sx={{
                      width: 80,
                      textAlign: "right",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    ${item.product.price}
                  </Box>

                  {/* Subtotal */}
                  <Box
                    sx={{ width: 80, textAlign: "right", fontWeight: "medium" }}
                  >
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Box>

                  {/* Remove */}
                  <Box sx={{ width: 60, textAlign: "right" }}>
                    <IconButton
                      onClick={() =>
                        handleRemoveItem(
                          item.product.productId,
                          item.product.productName
                        )
                      }
                      sx={{ color: "#9CA3AF", "&:hover": { color: "#EF4444" } }}
                      aria-label={`Remove ${item.product.productName} from cart`}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              ))}

              <Box
                sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/products")}
                  sx={{ borderColor: "#0A1E38", color: "#0A1E38" }}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="text"
                  onClick={handleClearCart}
                  sx={{ color: "#EF4444", "&:hover": { bgcolor: "#FEF2F2" } }}
                >
                  Clear Cart
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
                p: 3,
                position: "sticky",
                top: 96,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#0A1E38", mb: 3 }}
              >
                Order Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ color: "#718096" }}>
                  Subtotal ({totalItems} items)
                </Typography>
                <Typography sx={{ fontWeight: "medium" }}>
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ color: "#718096" }}>Shipping</Typography>
                <Typography sx={{ fontWeight: "medium" }}>Free</Typography>
              </Box>
              <Box sx={{ borderTop: 1, borderColor: "divider", my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography sx={{ color: "#0A1E38", fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography sx={{ color: "#0A1E38", fontWeight: "bold" }}>
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/dashboard/checkout")}
                sx={{
                  width: "100%",
                  bgcolor: "#0A1E38",
                  "&:hover": { bgcolor: "#0A1E38" },
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default Cart;
