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
import { Box, Button, TextField, IconButton, Typography } from "@mui/material";

export const Navbar = () => {
  // const { isAuthenticated, logout } = useAuth();
  // const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Box
      sx={{
        bgcolor: "#0A1E38",
        color: "white",
        py: 1.5,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ color: "#C39D63" }}>
            Cricketer's Choice
          </Typography>
        </Link>

        <IconButton
          sx={{ display: { lg: "none" }, color: "white" }}
          // onClick={toggleMenu}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            mx: 2,
          }}
        >
          <form style={{ display: "flex" }}>
            {/* TODO: Add a search function */}
            <TextField
              variant="outlined"
              placeholder="Search for cricket equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                bgcolor: "white",
                color: "black",
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
            gap: 2,
          }}
        >
          <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ShoppingCartIcon />
              {/* TODO : Add Total Items Count */}
            </Box>
            <Typography sx={{ ml: 1 }}>Cart</Typography>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none", color: "white" }}>
            <LocalShippingIcon />
            <Typography sx={{ ml: 1 }}>My Orders</Typography>
          </Link>
          {/* TODO: Check auth status for login and register */}
        </Box>
      </Box>

      <Box
        sx={{
          display: { lg: "none" },
          bgcolor: "#0A1E38",
          px: 2,
          py: 1,
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
          zIndex: 1000,
          boxShadow: 1,
        }}
      >
        <form style={{ display: "flex", marginBottom: 2 }}>
          {/* TODO: add handleSearch function */}
          <TextField
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: "white",
              color: "black",
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Link
            to="/products"
            // onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            All Products
          </Link>
          <Link
            to=""
            // onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Piano
          </Link>
          <Link
            to=""
            // onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Guitar
          </Link>
          <Link
            to=""
            // onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Melodia
          </Link>
          <Link
            to=""
            // onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            Agon
          </Link>
          <Box sx={{ height: 1, bgcolor: "#145DA0", my: 1 }} />
          <Link
            to="/cart"
            // onClick={toggleMenu}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon />
              TODO: Get total Items count
              <Typography sx={{ ml: 1 }}>Cart</Typography>
            </Box>
          </Link>
          {/* TODO: check auth status */}

          <>
            <Link
              to="/account"
              // onClick={toggleMenu}
              style={{ color: "white", textDecoration: "none" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PersonIcon />
                <Typography sx={{ ml: 1 }}>Account</Typography>
              </Box>
            </Link>
            <Button
              // onClick={() => {
              //   logout();
              //   toggleMenu();
              // }}
              sx={{ color: "white" }}
            >
              Logout
            </Button>
          </>

          <>
            <Link
              to="/login"
              // onClick={toggleMenu}
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              // onClick={toggleMenu}
              style={{ color: "#C39D63", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        </Box>
      </Box>
    </Box>
  );
};
