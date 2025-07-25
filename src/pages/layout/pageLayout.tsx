import React from "react";
import { Box, Container } from "@mui/material";
import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, mt: { xs: 8, sm: 9 } }}>
        {/* Wrap children in a responsive container */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default PageLayout;
