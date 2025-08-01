import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import PageLayout from "../layout/pageLayout";
import { Box, Card, CardContent, Button, Typography } from "@mui/material";
import { categoryNames } from "../../utils/consts";
// import { categoryNames } from "@/utils/consts";

const BRANDS = [
  {
    id: 1,
    name: "Yamaha",
    image: "/images/yamaha_logo.jpg",
    description: "Sound. Style. Precision.",
  },
  {
    id: 2,
    name: "Fender",
    image: "/images/Fender_logo.png",
    description: "Iconic. Bold. Timeless",
  },
  {
    id: 3,
    name: "Gibson",
    image: "/images/gibson_logo.jpg",
    description: "Pure Tone. Legendary.",
  },
  {
    id: 4,
    name: "Casio",
    image: "/images/Casio_logo.jpg",
    description: "Digital Music Magic",
  },
  {
    id: 5,
    name: "Rockstar",
    image: "/images/rockstar_logo.png",
    description: "Loud. Wild. Free.",
  },
  {
    id: 6,
    name: "Roland",
    image: "/images/Roland_logo.jpg",
    description: "Innovative Sound Tools",
  },
];

const BrandSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    if (category) {
      setCategoryId(parseInt(category, 10));
    } else {
      navigate("/home");
    }
  }, [location, navigate]);

  const getCategoryName = () => {
    return categoryId ? categoryNames[categoryId] || "Products" : "Products";
  };

  //filter brands by name or description search
  const filteredBrands = BRANDS.filter((brand) => {
    if (!searchParams.get("search")) return true;
    const search = searchParams.get("search")?.toLowerCase() || "";
    return (
      brand.name.toLowerCase().includes(search) ||
      brand.description?.toLowerCase().includes(search) ||
      false
    );
  });

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
              Category:
              <span style={{ fontWeight: "bold" }}>Show Category Name</span>
            </Typography>
            <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
              Choose Your Brand
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 4, pt: 2, pb: 5 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
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
