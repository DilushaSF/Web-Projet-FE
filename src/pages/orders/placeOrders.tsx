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
// import { checkout } from "@/services/orderService";
import { brandNames } from "../../utils/consts";

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

  const breadcrumbSteps = [
    { name: "Cart", href: "/dashboard/cart", isCurrent: false },
    { name: "Checkout", href: "/dashboard/checkout", isCurrent: false },
    { name: "Payment", href: "/dashboard/place-order", isCurrent: true },
  ];

  useEffect(() => {
    if (items.length === 0) {
      enqueueSnackbar("Your cart is empty", { variant: "warning" });
      navigate("/products");
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
      enqueueSnackbar("Order details are missing", { variant: "error" });
      setIsProcessing(false);
      return;
    }
    const invalidItems = items.filter((item) => !item.product.productId);
    if (invalidItems.length > 0) {
      enqueueSnackbar("Some items have missing product IDs", {
        variant: "error",
      });
      setIsProcessing(false);
      return;
    }
    try {
      // await checkout({ ...orderDetails });
      enqueueSnackbar(
        "Order placed successfully! You will receive an email shortly!",
        { variant: "success" }
      );
      setIsOrderSuccess(true);
    } catch (error) {
      enqueueSnackbar("Failed to place order. Please try again.", {
        variant: "error",
      });
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (
      !cardDetails.cardNumber ||
      !cardDetails.cardholderName ||
      !cardDetails.expiryDate ||
      !cardDetails.cvv
    ) {
      enqueueSnackbar("Please fill in all payment details", {
        variant: "error",
      });
      return;
    }
    setIsProcessing(true);
    handleCheckout();
  };

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
                <form>
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
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default PlaceOrder;
