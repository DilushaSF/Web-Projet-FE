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
  Tabs,
  Tab,
  Breadcrumbs,
} from "@mui/material";
import PageLayout from "../layout/pageLayout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useSnackbar } from "notistack";
import { brandNames } from "../../utils/consts";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, setOrderDetails } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [formState, setFormState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddress || "",
    phone: user?.mobilePhone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState("standard");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const breadcrumbSteps = [
    { name: "Cart", href: "/cart", isCurrent: false },
    { name: "Checkout", href: "/checkout", isCurrent: true },
    { name: "Payment", href: "/place-order", isCurrent: false },
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
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* Checkout Form */}
          <Grid item xs={12} lg={8}>
            <form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* Contact Information */}
                <Card sx={{ bgcolor: "white", boxShadow: 3 }}>
                  <CardContent sx={{ pt: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0A1E38", mb: 2 }}>
                      Contact Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          value={formState.firstName}
                          onChange={handleChange}
                          required
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          value={formState.lastName}
                          onChange={handleChange}
                          required
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="phone"
                          name="phone"
                          label="Phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          required
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card sx={{ bgcolor: "white", boxShadow: 3 }}>
                  <CardContent sx={{ pt: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0A1E38", mb: 2 }}>
                      Shipping Address
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <TextField
                        id="address"
                        name="address"
                        label="Street Address"
                        value={formState.address}
                        onChange={handleChange}
                        required
                        fullWidth
                        size="small"
                      />
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="city"
                            name="city"
                            label="City"
                            value={formState.city}
                            onChange={handleChange}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="state"
                            name="state"
                            label="State/Province"
                            value={formState.state}
                            onChange={handleChange}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="zipCode"
                            name="zipCode"
                            label="ZIP/Postal Code"
                            value={formState.zipCode}
                            onChange={handleChange}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            id="country"
                            name="country"
                            label="Country"
                            value={formState.country}
                            onChange={handleChange}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>

                {/* Shipping Methods */}
                <Card sx={{ bgcolor: "white", boxShadow: 3 }}>
                  <CardContent sx={{ pt: 3 }}>
                    <Typography variant="h6" sx={{ color: "#0A1E38", mb: 2 }}>
                      Shipping Method
                    </Typography>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      sx={{ width: "100%" }}
                    >
                      <Box
                        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
                      >
                        <Tab label="Standard" value="standard" />
                        <Tab label="Express" value="express" />
                        <Tab label="Overnight" value="overnight" />
                      </Box>
                      <Box sx={{ pt: 2 }}>
                        {tabValue === "standard" && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography sx={{ fontWeight: "medium" }}>
                                Standard Shipping
                              </Typography>
                              <Typography
                                sx={{ color: "#718096", fontSize: "0.875rem" }}
                              >
                                Delivered in 5-7 business days
                              </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: "medium" }}>
                              Free
                            </Typography>
                          </Box>
                        )}
                        {tabValue === "express" && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography sx={{ fontWeight: "medium" }}>
                                Express Shipping
                              </Typography>
                              <Typography
                                sx={{ color: "#718096", fontSize: "0.875rem" }}
                              >
                                Delivered in 2-3 business days
                              </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: "medium" }}>
                              $9.99
                            </Typography>
                          </Box>
                        )}
                        {tabValue === "overnight" && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography sx={{ fontWeight: "medium" }}>
                                Overnight Shipping
                              </Typography>
                              <Typography
                                sx={{ color: "#718096", fontSize: "0.875rem" }}
                              >
                                Delivered next business day
                              </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: "medium" }}>
                              $19.99
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Tabs>
                  </CardContent>
                </Card>
              </Box>
            </form>
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
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                // onClick={handleSubmit}
                disabled={isLoading}
                sx={{
                  width: { xs: "100%", md: "auto" },
                  bgcolor: "#0A1E38",
                  "&:hover": { bgcolor: "#0A1E38" },
                }}
              >
                {isLoading ? "Processing..." : "Continue to Payment"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default Checkout;
