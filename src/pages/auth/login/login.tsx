import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import LoginImage from "../../../assets/images/login_image.webp";

const bgImageStyle = {
  backgroundImage: `url(${LoginImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Login = () => {
  const [mobilePhone, setMobilePhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Left side - Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        <Box sx={{ maxWidth: 448, width: "100%" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
              Music Store
            </Typography>
            <Typography variant="body1" sx={{ color: "#6B7280" }}>
              Login to your account
            </Typography>
          </Box>

          <Card>
            <CardHeader
              title="Welcome Back"
              subheader="Enter your credentials to access your account"
              titleTypographyProps={{
                variant: "h5",
                sx: { fontWeight: "bold", textAlign: "center" },
              }}
              subheaderTypographyProps={{ sx: { textAlign: "center" } }}
            />

            <CardContent>
              <form>
                <Box sx={{ marginBottom: 2 }}>
                  <Typography
                    component="label"
                    htmlFor="mobilePhone"
                    sx={{ display: "block" }}
                  >
                    Mobile Phone
                  </Typography>
                  <TextField
                    id="mobilePhone"
                    type="tel"
                    placeholder="+353 XX XXX XXXX"
                    value={mobilePhone}
                    onChange={(e) => {
                      setError(null);
                      setMobilePhone(e.target.value);
                    }}
                    fullWidth
                    required
                    sx={{ marginTop: 1 }}
                  />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component="label" htmlFor="password">
                      Password
                    </Typography>
                    <MuiLink
                      component={Link}
                      to="/forgot-password"
                      sx={{
                        fontSize: "0.875rem",
                        color: "#145DA0",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Forgot password?
                    </MuiLink>
                  </Box>
                  <TextField
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setError(null);
                      setPassword(e.target.value);
                    }}
                    fullWidth
                    required
                    sx={{ marginTop: 1 }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    backgroundColor: "#0A1E38",
                    color: "white",
                    "&:hover": { backgroundColor: "#0A1E38" },
                    marginTop: 2,
                  }}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
              {error && (
                <Typography
                  sx={{
                    color: "#EF4444",
                    fontSize: "0.875rem",
                    textAlign: "left",
                    marginTop: 2,
                  }}
                >
                  {error}
                </Typography>
              )}
            </CardContent>

            <Box
              sx={{
                textAlign: "center",
                marginTop: 2,
                width: "100%",
                padding: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                Don't have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/register"
                  sx={{
                    color: "#145DA0",
                    textDecoration: "none",
                    fontWeight: "medium",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Register
                </MuiLink>
              </Typography>
            </Box>
          </Card>
        </Box>
      </Grid>

      {/* Right side - Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          ...bgImageStyle,
          display: { xs: "none", md: "block" },
          backgroundColor: "#0A1E38",
        }}
      ></Grid>
    </Grid>
  );
};

export default Login;
