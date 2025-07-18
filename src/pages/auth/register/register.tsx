import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

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
import SignUpImage from "../../../assets/images/signup_image.webp";

const bgImageStyle = {
  backgroundImage: `url(${SignUpImage})`,
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
      }}>
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
          //   height: "100vh",
          //   overflow: "hidden",
        }}>
        <Box
          sx={{
            maxWidth: 448,
            width: "100%",
            height: "100%",
            // overflowY: "auto",
            // paddingRight: 1,
          }}>
          <Box sx={{textAlign: "center", mb: 3}}>
            <Typography variant="h2" sx={{fontWeight: "bold", mb: 1}}>
              TuneCart
            </Typography>
            <Typography variant="body1" sx={{color: "#6B7280"}}>
              Create a new account
            </Typography>
          </Box>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 3,
              padding: 3,
              border: "1px solid #ccc",
            }}>
            <CardHeader
              title="Sign Up"
              subheader="Enter your information to create your account"
              titleTypographyProps={{
                variant: "h5",
                sx: {fontWeight: "bold", textAlign: "center"},
              }}
              subheaderTypographyProps={{sx: {textAlign: "center"}}}
            />

            <CardContent>
              <form>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    marginBottom: 2,
                  }}>
                  {/* First Name */}
                  <Box sx={{flex: 1}}>
                    <Typography
                      component="label"
                      htmlFor="firstName"
                      sx={{display: "block"}}>
                      First Name
                    </Typography>
                    <TextField
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={mobilePhone}
                      onChange={(e) => {
                        setError(null);
                        setMobilePhone(e.target.value);
                      }}
                      fullWidth
                      required
                      sx={{marginTop: 1}}
                      size="small"
                      InputProps={{
                        sx: {
                          height: 40,
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </Box>

                  {/* last name */}
                  <Box sx={{flex: 1}}>
                    <Typography
                      component="label"
                      htmlFor="lastName"
                      sx={{display: "block"}}>
                      Last Name
                    </Typography>
                    <TextField
                      id="lastName"
                      type="text"
                      placeholder="John"
                      value={mobilePhone}
                      onChange={(e) => {
                        setError(null);
                        setMobilePhone(e.target.value);
                      }}
                      fullWidth
                      required
                      sx={{marginTop: 1}}
                      size="small"
                      InputProps={{
                        sx: {
                          height: 40,
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    marginBottom: 2,
                  }}>
                  {/* email */}
                  <Box sx={{marginBottom: 2}}>
                    <Typography
                      component="label"
                      htmlFor="email"
                      sx={{display: "block"}}>
                      Email
                    </Typography>
                    <TextField
                      id="email"
                      type="text"
                      placeholder="name@example.com"
                      value={mobilePhone}
                      onChange={(e) => {
                        setError(null);
                        setMobilePhone(e.target.value);
                      }}
                      fullWidth
                      required
                      sx={{marginTop: 1}}
                      size="small"
                      InputProps={{
                        sx: {
                          height: 40,
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </Box>

                  {/* eircode */}
                  <Box sx={{flex: 1}}>
                    <Typography
                      component="label"
                      htmlFor="eircode"
                      sx={{display: "block"}}>
                      Eircode
                    </Typography>
                    <TextField
                      id="eircode"
                      type="text"
                      placeholder="D02 X285"
                      value={mobilePhone}
                      onChange={(e) => {
                        setError(null);
                        setMobilePhone(e.target.value);
                      }}
                      fullWidth
                      required
                      sx={{marginTop: 1}}
                      size="small"
                      InputProps={{
                        sx: {
                          height: 40,
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* eircode */}
                <Box sx={{marginBottom: 2}}>
                  <Typography
                    component="label"
                    htmlFor="mobilePhone"
                    sx={{display: "block"}}>
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
                    sx={{marginTop: 1}}
                    size="small"
                    InputProps={{
                      sx: {
                        height: 40,
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                </Box>

                {/* password */}
                <Box sx={{marginBottom: 2}}>
                  <Typography
                    component="label"
                    htmlFor="password"
                    sx={{display: "block"}}>
                    Password
                  </Typography>
                  <TextField
                    id="password"
                    type="password"
                    placeholder="•••••••"
                    value={password}
                    onChange={(e) => {
                      setError(null);
                      setPassword(e.target.value);
                    }}
                    fullWidth
                    required
                    sx={{marginTop: 1}}
                    size="small"
                    InputProps={{
                      sx: {
                        height: 40,
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                </Box>

                {/* confirm password */}
                <Box sx={{marginBottom: 2}}>
                  <Typography
                    component="label"
                    htmlFor="confirmPassword"
                    sx={{display: "block"}}>
                    Confirm Password
                  </Typography>
                  <TextField
                    id="confirmPassword"
                    type="password"
                    placeholder="•••••••"
                    value={password}
                    onChange={(e) => {
                      setError(null);
                      setPassword(e.target.value);
                    }}
                    fullWidth
                    required
                    sx={{marginTop: 1}}
                    size="small"
                    InputProps={{
                      sx: {
                        height: 40,
                        fontSize: "0.875rem",
                      },
                    }}
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
                    "&:hover": {backgroundColor: "#0A1E38"},
                    marginTop: 2,
                  }}>
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
                  }}>
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
              }}>
              <Typography variant="body2" sx={{color: "#6B7280"}}>
                Already have an account?{" "}
                <MuiLink
                  component={Link}
                  to="/auth/login"
                  sx={{
                    color: "#145DA0",
                    textDecoration: "none",
                    fontWeight: "medium",
                    "&:hover": {textDecoration: "underline"},
                  }}>
                  Login
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
          display: {xs: "none", md: "block"},
          backgroundColor: "#0A1E38",
        }}></Grid>
    </Grid>
  );
};

export default Login;
