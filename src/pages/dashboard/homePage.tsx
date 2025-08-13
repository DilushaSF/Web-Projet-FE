import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageLayout from "../layout/pageLayout";
import { CATEGORIES } from "../../utils/consts";

const SLIDER_IMAGES = [
  "/images/slider_1.jpg",
  "/images/slider_2.jpg",
  "/images/slider_3.png",
  "/images/slider_4.jpg",
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleCategorySelect = (categoryId: number) => {
    navigate(`/dashboard/brand-selection?category=${categoryId}`);
    console.log("IDDDD IS", categoryId);
  };

  // Add a filter to filter categories by search
  const filteredCategories = CATEGORIES.filter((category) => {
    if (!searchParams.get("search")) return true;
    const search = searchParams.get("search")?.toLowerCase() || "";
    return (
      category.name.toLowerCase().includes(search) ||
      category.description.toLowerCase().includes(search)
    );
  });

  return (
    <PageLayout>
      {/* Banner Section */}
      <Box mb={12} sx={{ display: {md: 'block', sm: 'none', xs: 'none' } }}>
        {/* TODO: Fix slider arrow colors */}
        <Slider {...sliderSettings}>
          {SLIDER_IMAGES.map((image, index) => (
            <div key={index}>
              <Card sx={{ boxShadow: "none" }}>
                <CardMedia
                  component="img"
                  height="360"
                  image={image}
                  alt={`carousel-image-${index}`}
                  sx={{ objectFit: "cover", borderRadius: 1 }}
                />
              </Card>
            </div>
          ))}
        </Slider>
      </Box>

      {/* Category Section */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0A1E38" }}
      >
        Select a Category
      </Typography>
      <Grid container spacing={3}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Card
                onClick={() => handleCategorySelect(category.id)}
                sx={{
                  cursor: "pointer",
                  transition: "box-shadow 0.3s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <CardMedia
                  component="img"
                  height="192"
                  image={category.image}
                  alt={category.name}
                  sx={{
                    objectFit: "cover",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s",
                    },
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#0A1E38" }}
                  >
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">
              No categories found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </PageLayout>
  );
};

export default HomePage;
