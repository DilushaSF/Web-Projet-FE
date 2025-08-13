import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import PageLayout from "../layout/pageLayout";
import { useCart } from "../context/cartContext";
import { useSnackbar } from "notistack";
import { brandNames } from "../../utils/consts";
import { checkout } from "../../services/orderService";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart, orderDetails } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  // Auto-close dialog and navigate after 5 seconds
  useEffect(() => {
    if (isOrderSuccess) {
      const timer = setTimeout(() => {
        setIsOrderSuccess(false);
        navigate("/orders");
        clearCart();
        setIsProcessing(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOrderSuccess, navigate, clearCart]);

  useEffect(() => {
    if (items.length === 0) {
      enqueueSnackbar("Your cart is empty", { variant: "warning" });
      navigate("/dashboard/products");
    }
  }, [items, navigate, enqueueSnackbar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      setCardDetails((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setCardDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckout = async () => {
    if (!orderDetails) {
      enqueueSnackbar("Order details are missing", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setIsProcessing(false);
      return;
    }
    const invalidItems = items.filter((item) => !item.product.productId);
    if (invalidItems.length > 0) {
      enqueueSnackbar("Some items have missing product IDs", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setIsProcessing(false);
      return;
    }
    try {
      await checkout({ ...orderDetails });
      enqueueSnackbar(
        "Order placed successfully! You will receive an email shortly!",
        {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }
      );
      setIsOrderSuccess(true);
    } catch (error) {
      enqueueSnackbar("Failed to place order. Please try again.", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate  fields
    if (
      !cardDetails.cardNumber ||
      !cardDetails.cardholderName ||
      !cardDetails.expiryDate ||
      !cardDetails.cvv
    ) {
      enqueueSnackbar("Please fill in all payment details", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }
    setIsProcessing(true);
    handleCheckout();
  };

  const breadcrumbSteps = [
    { name: "Cart", href: "/dashboard/cart", isCurrent: false },
    { name: "Checkout", href: "/dashboard/checkout", isCurrent: false },
    { name: "Payment", href: "/dashboard/place-order", isCurrent: true },
  ];

  const getBrandName = (brandId: number) => {
    return brandNames[brandId] || "Unknown Brand";
  };

  return (
    <PageLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbSteps.map((step) =>
              step.isCurrent ? (
                <Typography
                  key={step.name}
                  sx={{ color: "#0A1E38", fontWeight: "medium" }}
                >
                  {step.name}
                </Typography>
              ) : (
                <Link key={step.name} to={step.href}>
                  <Typography
                    sx={{ color: "#718096", "&:hover": { color: "#145DA0" } }}
                  >
                    {step.name}
                  </Typography>
                </Link>
              )
            )}
          </Breadcrumbs>
        </Box>

        <Typography variant="h4" sx={{ color: "#0A1E38", mb: 4 }}>
          Payment
        </Typography>

        <Grid container spacing={4}>
          {/* Payment Form */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ bgcolor: "white", boxShadow: 3 }}>
              <CardContent sx={{ pt: 3 }}>
                <Typography variant="h6" sx={{ color: "#0A1E38", mb: 3 }}>
                  Payment Details
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      id="cardNumber"
                      name="cardNumber"
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleChange}
                      inputProps={{ maxLength: 19 }}
                      required
                      fullWidth
                      size="small"
                    />
                    <TextField
                      id="cardholderName"
                      name="cardholderName"
                      label="Cardholder Name"
                      placeholder="John Doe "
                      value={cardDetails.cardholderName}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="expiryDate"
                          name="expiryDate"
                          label="Expiry Date (MM/YY)"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleChange}
                          inputProps={{ maxLength: 5 }}
                          required
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="cvv"
                          name="cvv"
                          label="CVV"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleChange}
                          inputProps={{ maxLength: 3 }}
                          required
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2,
                        pt: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => navigate("/dashboard/checkout")}
                        sx={{
                          flex: 1,
                          color: "#0A1E38",
                          borderColor: "#0A1E38",
                        }}
                      >
                        Return to Shipping
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isProcessing}
                        sx={{
                          flex: 1,
                          bgcolor: "#0A1E38",
                          "&:hover": { bgcolor: "#0A1E38" },
                        }}
                      >
                        {isProcessing ? "Processing..." : "Place Order"}
                      </Button>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
            <Box sx={{ mt: 4 }}>
              <Card sx={{ bgcolor: "white", boxShadow: 3 }}>
                <CardContent sx={{ pt: 3 }}>
                  <Typography variant="h6" sx={{ color: "#0A1E38", mb: 2 }}>
                    Secure Checkout
                  </Typography>
                  <Typography sx={{ color: "#718096" }}>
                    Your payment information is encrypted and secure. We do not
                    store your credit card details.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ bgcolor: "white", boxShadow: 3 }}>
              <CardContent sx={{ pt: 3 }}>
                <Typography variant="h6" sx={{ color: "#0A1E38", mb: 2 }}>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {items.map((item) => (
                    <Box
                      key={item.product.productId || Math.random()}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Box sx={{ position: "relative" }}>
                          <Box
                            component="img"
                            src={item.product.images?.[0]}
                            alt={item.product.productName}
                            sx={{
                              width: 56,
                              height: 56,
                              objectFit: "cover",
                              borderRadius: 1,
                            }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: -8,
                              right: -8,
                              bgcolor: "#0A1E38",
                              color: "white",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.75rem",
                            }}
                          >
                            {item.quantity}
                          </Box>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography
                            sx={{
                              fontWeight: "medium",
                              lineHeight: 1.2,
                              maxWidth: 200,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.product.productName}
                          </Typography>
                          <Typography
                            sx={{ color: "#718096", fontSize: "0.875rem" }}
                          >
                            {getBrandName(item.product.productBrand)}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ fontWeight: "medium" }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{ borderTop: 1, borderColor: "divider", pt: 2, mb: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ color: "#718096" }}>Subtotal</Typography>
                    <Typography sx={{ fontWeight: "medium" }}>
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ color: "#718096" }}>Shipping</Typography>
                    <Typography sx={{ fontWeight: "medium" }}>Free</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ color: "#718096" }}>Tax</Typography>
                    <Typography sx={{ fontWeight: "medium" }}>$0.00</Typography>
                  </Box>
                </Box>
                <Box sx={{ borderTop: 1, borderColor: "divider", py: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                    <Typography sx={{ color: "#0A1E38", fontWeight: "bold" }}>
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          open={isOrderSuccess}
          onClose={() => {
            setIsOrderSuccess(false);
            navigate("/dashboard/orders");
            clearCart();
            setIsProcessing(false);
          }}
        >
          <DialogContent
            sx={{
              bgcolor: "white",
              color: "black",
              borderRadius: 2,
              maxWidth: 400,
              mx: "auto",
              p: 3,
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => {
                setIsOrderSuccess(false);
                navigate("/orders");
                clearCart();
                setIsProcessing(false);
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
              aria-label="Close"
            >
              <Close />
            </IconButton>
            <DialogTitle sx={{ fontWeight: "bold", p: 0, mb: 2 }}>
              Order Successful
            </DialogTitle>
            <Typography sx={{ fontSize: "1rem" }}>
              Your order has been placed successfully! You will receive a short
              email later with the details.
            </Typography>
            <DialogActions sx={{ mt: 3, p: 0 }}>
              <Button
                onClick={() => {
                  setIsOrderSuccess(false);
                  navigate("/orders");
                  clearCart();
                  setIsProcessing(false);
                }}
                sx={{
                  bgcolor: "white",
                  color: "#0A1E38",
                  "&:hover": { bgcolor: "#F3F4F6" },
                }}
              >
                View Orders
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    </PageLayout>
  );
};

export default PlaceOrder;
