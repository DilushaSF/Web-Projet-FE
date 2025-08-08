import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link} from "react-router-dom";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{backgroundColor: "#0A1E38", color: "white", pt: 6, pb: 3}}>
      <Container>
        <Grid container spacing={4}>
          {/* About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{color: "#C39D63", mb: 2}}>
              TuneCart
            </Typography>
            <Typography variant="body2" color="gray">
              Your premium destination for quality music equipment. We provide
              professional grade gear for music enthusiasts of all levels.
            </Typography>
            <Box mt={2}>
              <IconButton
                href="#"
                sx={{color: "gray", "&:hover": {color: "#C39D63"}}}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                sx={{color: "gray", "&:hover": {color: "#C39D63"}}}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                sx={{color: "gray", "&:hover": {color: "#C39D63"}}}>
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{color: "#C39D63", mb: 2}}>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <MuiLink component={Link} to="/" color="gray" underline="hover">
                Home
              </MuiLink>
              <MuiLink
                component={Link}
                to="/products"
                color="gray"
                underline="hover">
                Products
              </MuiLink>
              <MuiLink
                component={Link}
                to="/about"
                color="gray"
                underline="hover">
                About Us
              </MuiLink>
              <MuiLink
                component={Link}
                to="/contact"
                color="gray"
                underline="hover">
                Contact
              </MuiLink>
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{color: "#C39D63", mb: 2}}>
              Categories
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <MuiLink
                component={Link}
                to="/products?category=bats"
                color="gray"
                underline="hover">
                Guitars
              </MuiLink>
              <MuiLink
                component={Link}
                to="/products?category=balls"
                color="gray"
                underline="hover">
                Organs
              </MuiLink>
              <MuiLink
                component={Link}
                to="/products?category=gloves"
                color="gray"
                underline="hover">
                Flutes
              </MuiLink>
              <MuiLink
                component={Link}
                to="/products?category=pads"
                color="gray"
                underline="hover">
                Violins
              </MuiLink>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{color: "#C39D63", mb: 2}}>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="flex-start" gap={1} mb={1}>
              <LocationOnIcon fontSize="small" sx={{color: "#C39D63"}} />
              <Typography variant="body2" color="gray">
                78K Joseph Lane, Sandymount, Ireland
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <PhoneIcon fontSize="small" sx={{color: "#C39D63"}} />
              <Typography variant="body2" color="gray">
                +44 123 456 9870
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" sx={{color: "#C39D63"}} />
              <Typography variant="body2" color="gray">
                info@tunecart.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4} pt={2} borderTop="1px solid #4a4a4a">
          <Typography variant="body2" align="center" color="gray">
            © {new Date().getFullYear()} TuneCart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
