import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  IconButton,
  Typography,
  Stack,
  Drawer,
  Box,
} from "@mui/material";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e: any) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm) newParams.set("search", searchTerm);
    else newParams.delete("search");
    setSearchParams(newParams);
  };

  useEffect(() => {
    const currentSearchTerm = searchParams.get("search") || "";
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchTerm) newParams.set("search", searchTerm);
      else newParams.delete("search");
      setSearchParams(newParams);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchParams, setSearchParams]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0A1E38", boxShadow: 1 }}>
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          justifyContent: "space-between",
        }}
      >
        <Link to="/dashboard/products" style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ color: "#C39D63" }}>
            Tune Cart
          </Typography>
        </Link>

        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            mx: 2,
          }}
        >
          <form
            onSubmit={handleSearch}
            style={{ display: "flex", width: "100%", maxWidth: "500px" }}
          >
            <TextField
              variant="outlined"
              placeholder="Search for musical instruments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                bgcolor: "white",
                flexGrow: 1,
                "& .MuiOutlinedInput-root": { borderRadius: "4px 0 0 4px" },
              }}
            />
            <Button
              type="submit"
              sx={{
                bgcolor: "#C39D63",
                color: "black",
                borderRadius: "0 4px 4px 0",
                minWidth: "auto",
                p: 1,
              }}
            >
              <SearchIcon />
            </Button>
          </form>
        </Box>

        <IconButton
          sx={{ display: { lg: "none" }, color: "white" }}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          <Link
            to="/dashboard/cart"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ShoppingCartIcon />
                {totalItems > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -5,
                      bgcolor: "#C39D63",
                      color: "#0A1E38",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    {totalItems}
                  </Box>
                )}
              </Box>
              <Typography sx={{ ml: 1 }}>Cart</Typography>
            </Box>
          </Link>

          <Link
            to="/dashboard/my-orders"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalShippingIcon />
              <Typography sx={{ ml: 1 }}>My Orders</Typography>
            </Box>
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard/profile"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon />
                  <Typography sx={{ ml: 1 }}>Account</Typography>
                </Box>
              </Link>
              <Button onClick={() => logout()} sx={{ color: "white" }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/auth/login")}
                sx={{ color: "white" }}
              >
                Login
              </Button>
              <Button
                sx={{ bgcolor: "#C39D63", color: "black" }}
                onClick={() => navigate("/auth/register")}
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>

      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "#0A1E38",
            color: "white",
            px: 2,
            py: 2,
            top: "64px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              marginBottom: 2,
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                bgcolor: "white",
                flexGrow: 1,
                "& .MuiOutlinedInput-root": { borderRadius: "4px 0 0 4px" },
              }}
            />
            <Button
              type="submit"
              sx={{
                bgcolor: "#C39D63",
                color: "black",
                borderRadius: "0 4px 4px 0",
                minWidth: "auto",
                p: 1,
              }}
            >
              <SearchIcon />
            </Button>
          </form>
          <Link
            to="/dashboard/products"
            onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            All Products
          </Link>
          <Link
            to="/dashboard/products?category=guitar"
            onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Guitar
          </Link>
          <Link
            to="/products?category=balls"
            onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Balls
          </Link>
          <Link
            to="/products?category=gloves"
            onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Gloves
          </Link>
          <Link
            to="/products?category=pads"
            onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Pads
          </Link>
          <Box sx={{ height: 1, bgcolor: "#145DA0", my: 1, width: "100%" }} />
          <Link
            to="/dashboard/cart"
            onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon />
              <Typography sx={{ ml: 1 }}>Cart ({totalItems})</Typography>
            </Box>
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                onClick={toggleMenu}
                style={{ color: "white", textDecoration: "none" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon />
                  <Typography sx={{ ml: 1 }}>Account</Typography>
                </Box>
              </Link>
              <Button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                sx={{ color: "white" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                onClick={toggleMenu}
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                onClick={toggleMenu}
                style={{ color: "#C39D63", textDecoration: "none" }}
              >
                Register
              </Link>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};
