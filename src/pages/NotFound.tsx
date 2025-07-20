// material
import { Box, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function NotFound() {
  return (
    <>
      <Box sx={{ px: "20px", pb: 4, pt: 2.5 }}>
        <Typography variant="h2" gutterBottom>
          404 Page Not Found
        </Typography>
      </Box>
    </>
  );
}
