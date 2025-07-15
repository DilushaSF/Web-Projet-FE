import { createTheme } from "@mui/material/styles";

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#AFCB3C",
    },
    secondary: {
      main: "#AFCB3C",
    },
  },
  typography: {
    fontFamily: ["SF Pro", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["SF Pro", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["SF Pro", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["SF Pro", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["SF Pro", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["SF Pro", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["SF Pro", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
  components: {},
});

export default CustomTheme;
