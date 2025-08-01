import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import Router from "./pages/router";
import CustomTheme from "./pages/themes/theme";

const App = () => (
  <ThemeProvider theme={CustomTheme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Router />
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
