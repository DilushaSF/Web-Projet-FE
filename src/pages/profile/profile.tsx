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