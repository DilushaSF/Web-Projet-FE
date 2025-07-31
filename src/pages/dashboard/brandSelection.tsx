import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import PageLayout from "../layout/pageLayout";
import { Box, Card, CardContent, Button, Typography } from "@mui/material";
// import { categoryNames } from "@/utils/consts";

const BrandSelection = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Box
        sx={{
          width: "100%",
          height: 320,
          bgcolor: "#0A1E38",
          mb: 10,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography sx={{ color: "#D3D3D3", mb: 1 }}>
              Category:{" "}
              <span style={{ fontWeight: "bold" }}>Show Category Name</span>
            </Typography>
            <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
              Choose Your Brand
            </Typography>
            <Typography sx={{ color: "#D3D3D3", maxWidth: 960, mx: "auto" }}>
              Select from our collection of premium cricket brands
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 4, py: 10 }}>
        <Typography
          variant="h4"
          sx={{ color: "#0A1E38", mb: 4, textAlign: "center" }}
        >
          Select a Brand for Show Category Name
        </Typography>

        <Button
          variant="outlined"
          sx={{ borderColor: "#0A1E38", color: "#0A1E38", mb: 4 }}
          onClick={() => navigate("/category-selection")}
        >
          Back to Categories
        </Button>
      </Box>
    </PageLayout>
  );
};

export default BrandSelection;
