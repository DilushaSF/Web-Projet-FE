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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Banner Section */}
      <Box mb={12}>
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
    </Container>
  );
};

export default HomePage;
