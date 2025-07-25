import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";

export const Navbar = () => {
  // const { isAuthenticated, logout } = useAuth();
  // const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#0A1E38" }}>
        <Toolbar sx={{ maxWidth: "1200px", width: "100%", mx: "auto", py: 1 }}>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "#C39D63" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Tune Cart
            </Typography>
          </Link>

          <Box sx={{ display: { lg: "none" }, ml: "auto" }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              justifyContent: "center",
              mx: 3,
            }}
          >
            <form style={{ display: "flex" }}>
              {/* TODO: Add a search function */}
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search for musical instruments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": { borderRadius: "4px 0 0 4px" },
                }}
              />
              <Button
                type="submit"
                sx={{
                  bgcolor: "#C39D63",
                  color: "black",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <SearchIcon />
              </Button>
            </form>
          </Box>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Link to="/cart" style={{ color: "white" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <ShoppingCartIcon fontSize="small" />
                <Typography variant="body2">Cart</Typography>
              </Box>
            </Link>
            <Link to="/orders" style={{ color: "white" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalShippingIcon />
                <Typography sx={{ ml: 1 }}>My Orders</Typography>
              </Box>
            </Link>
            {/* TODO: Check auth status for login and register */}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ bgcolor: "#0A1E38", color: "white", px: 2, py: 2 }}>
          <form style={{ display: "flex", marginBottom: 16 }}>
            {/* TODO: add handleSearch function */}
            <TextField
              variant="outlined"
              placeholder="Search products..."
              fullWidth
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                bgcolor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px 0 0 4px",
                },
              }}
            />
            <Button
              type="submit"
              sx={{
                bgcolor: "#C39D63",
                color: "black",
                borderRadius: "0 4px 4px 0",
              }}
            >
              <SearchIcon />
            </Button>
          </form>

          <List>
            <ListItem
              button
              component={Link}
              to="/products"
              onClick={toggleDrawer}
            >
              <ListItemText primary="All Products" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button component={Link} to="" onClick={toggleDrawer}>
              <ListItemText primary="Piano" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button component={Link} to="" onClick={toggleDrawer}>
              <ListItemText primary="Guitar" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button component={Link} to="" onClick={toggleDrawer}>
              <ListItemText primary="Melodia" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button component={Link} to="" onClick={toggleDrawer}>
              <ListItemText primary="Agon" sx={{ color: "white" }} />
            </ListItem>

            <Divider sx={{ bgcolor: "#145DA0", my: 1 }} />

            <ListItem button component={Link} to="/cart" onClick={toggleDrawer}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShoppingCartIcon />
                {/* TODO: Get total Items count */}
                <Typography sx={{ ml: 1 }}>Cart</Typography>
              </Box>
            </ListItem>

            {/* TODO: check auth status */}
            <>
              <ListItem
                button
                component={Link}
                to="/account"
                onClick={toggleDrawer}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon />
                  <Typography sx={{ ml: 1 }}>Account</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <Button
                  // onClick={() => {
                  //   logout();
                  //   toggleDrawer();
                  // }}
                  sx={{ color: "white" }}
                >
                  Logout
                </Button>
              </ListItem>
            </>

            <>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Login" sx={{ color: "white" }} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/register"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Register" sx={{ color: "#C39D63" }} />
              </ListItem>
            </>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
