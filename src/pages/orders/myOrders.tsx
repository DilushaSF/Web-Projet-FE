import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import PageLayout from "../layout/pageLayout";
import { useSnackbar } from "notistack";

import type { Order } from "../../services/orderService";
import { getUserOrders } from "../../services/orderService";

const Orders = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const orderData = await getUserOrders();
        console.log(orderData);
        // Ensure orderData is an array, fallback to empty array if undefined
        setOrders(Array.isArray(orderData) ? orderData : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        enqueueSnackbar("Failed to load orders", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders(); 
  }, []);
  return (
    <PageLayout>
      <Box sx={{ maxWidth: 1024, mx: "auto" }}>
        <Typography variant="h4" sx={{ color: "#0A1E38", mb: 4 }}>
          My Orders
        </Typography>
        {isLoading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[1, 2, 3].map((i) => (
              <Card key={i} sx={{ p: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ height: 24, bgcolor: "grey.200", width: "25%", borderRadius: 1 }} />
                  <Box sx={{ height: 16, bgcolor: "grey.200", width: "50%", borderRadius: 1 }} />
                  <Box sx={{ height: 16, bgcolor: "grey.200", width: "33%", borderRadius: 1 }} />
                </Box>
              </Card>
            ))}
          </Box>
        ) : error ? (
          <Card sx={{ p: 6, textAlign: "center" }}>
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Button
              variant="contained"
              sx={{ bgcolor: "#0A1E38", color: "white" }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Card>
        ) : orders.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {orders.map((order) => (
              <Card
                key={order.orderId}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                  transition: "box-shadow 0.3s",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          Order Date - {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Recipient Name : {order.recipientFirstName} {order.recipientLastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                        Eircode : {order.recipientEircode || "Not provided"}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="medium" color="#0A1E38">
                        Order Total : ${order.total}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {order.orderToProducts?.length > 0 && (
                        <Box>
                          {order.orderToProducts.map((product) => (
                            <Box key={product.orderToProductId} sx={{ mb: 1 }}>
                              <Typography variant="subtitle2" fontWeight="medium">
                                {product.product.productName}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: {product.quantity}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Price: ${product.product.price}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
       <Typography>
           <Card sx={{ textAlign: "center", py: 6 }}>
            <CardContent>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "grey.100",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                {/* Uncomment and import ShoppingCartIcon if needed */}
                {/* <ShoppingCartIcon sx={{ fontSize: 32, color: "grey.400" }} /> */}
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                No orders yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You haven't placed any orders yet.
              </Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: "#0A1E38", color: "white" }}
                onClick={() => navigate("/products")}
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>
       </Typography>
        )}
      </Box>
    </PageLayout>
  );
};

export default Orders;