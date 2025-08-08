import React, { useEffect, useState } from "react";
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
import { updateUser } from "../../services/userService";
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

useEffect(() => {
  const storedUser = localStorage.getItem("user");
 
  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser);
   
      setFirstName(userObj.firstName || "");
      setLastName(userObj.lastName || "");
      setEmailAddress(userObj.emailAddress || "");
      setEircode(userObj.eircode || "");
      setMobilePhone(userObj.mobilePhone || "");
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
    }
  }
}, []);

// profile update form submission
  const ProfileUpdate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUser({
        firstName,
        lastName,
        emailAddress,
        eircode,
      });

      // Update localStorage with new data
      localStorage.setItem('user', JSON.stringify(updatedUser.data.user));
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('Failed to update profile');
      enqueueSnackbar('Failed to update profile', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
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
            <CardContent>
              <form
               onSubmit={ProfileUpdate}
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
            <CardContent>
              <form
                style={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography component="label" htmlFor="oldPassword">
                    Old Password
                  </Typography>
                  <TextField
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => {
                      setError(null);
                      setOldPassword(e.target.value);
                    }}
                    required
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography component="label" htmlFor="newPassword">
                    New Password
                  </Typography>
                  <TextField
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setError(null);
                      setNewPassword(e.target.value);
                    }}
                    required
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography component="label" htmlFor="confirmPassword">
                    Confirm New Password
                  </Typography>
                  <TextField
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setError(null);
                      setConfirmPassword(e.target.value);
                    }}
                    required
                  />
                </Box>
                {error && (
                  <Typography sx={{ color: "#EF4444", fontSize: 12 }}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  sx={{ bgcolor: "#0A1E38", color: "white", mt: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>
    </PageLayout>
  );
};

export default Profile;