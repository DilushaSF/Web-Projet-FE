// TODO: profile page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../layout/pageLayout";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useSnackbar } from "notistack";

// TODO: Use useAuth hook to check auth status

const Profile = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"profile" | "password">(
    "profile"
  );

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [eircode, setEircode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [mobilePhone, setMobilePhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PageLayout>
      <Box sx={{ maxWidth: 1024, mx: "auto", px: 4, py: 8 }}>
        <Typography variant="h4" sx={{ color: "#0A1E38", mb: 4 }}>
          My Account
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Button
            sx={{
              bgcolor: activeView === "profile" ? "#0A1E38" : "transparent",
              color: activeView === "profile" ? "white" : "#0A1E38",
              mr: 2,
            }}
            onClick={() => setActiveView("profile")}
          >
            Profile Details
          </Button>
          <Button
            sx={{
              bgcolor: activeView === "password" ? "#0A1E38" : "transparent",
              color: activeView === "password" ? "white" : "#0A1E38",
            }}
            onClick={() => setActiveView("password")}
          >
            Change Password
          </Button>
        </Box>

        {activeView === "profile" && (
          <Card>
            <CardHeader>
              {/* <CardTitle>Profile Information</CardTitle> */}
              {/* <CardDescription>Update your personal information</CardDescription> */}
            </CardHeader>

            {/* TODO: handle onSubmit inside form */}
            <CardContent>
              <form
                style={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography component="label" htmlFor="firstName">
                        First Name
                      </Typography>
                      <TextField
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography component="label" htmlFor="lastName">
                        Last Name
                      </Typography>
                      <TextField
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography component="label" htmlFor="email">
                    Email
                  </Typography>
                  <TextField
                    id="email"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography component="label" htmlFor="mobilePhone">
                    Mobile Phone
                  </Typography>
                  <TextField
                    id="mobilePhone"
                    type="tel"
                    value={mobilePhone}
                    disabled
                    sx={{ bgcolor: "#F3F4F6" }}
                  />
                  <Typography sx={{ color: "#718096", fontSize: 12 }}>
                    Mobile phone cannot be changed
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography component="label" htmlFor="eircode">
                    Eircode
                  </Typography>
                  <TextField
                    id="eircode"
                    value={eircode}
                    onChange={(e) => setEircode(e.target.value)}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{ bgcolor: "#0A1E38", color: "white", mt: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeView === "password" && (
          <Card>
  
          </Card>
        )}

        <Box sx={{ mt: 4 }}>
          {/* <Button
            variant="outlined"
            sx={{ borderColor: "#DC2626", color: "#DC2626" }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button> */}
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Profile;