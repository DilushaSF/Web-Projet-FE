import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import PageLayout from "../layout/pageLayout";
import { useCart } from "../context/cartContext";
import { useSnackbar } from "notistack";

const Cart = () => {
  const {
    items,
  } = useCart();
  const navigate = useNavigate();


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
            onClick={() => navigate("/products")}
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
      </Box>
    </PageLayout>
  );
};

export default Cart;
