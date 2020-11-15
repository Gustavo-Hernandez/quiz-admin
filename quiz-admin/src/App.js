import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import useAuthentication from "./hooks/useAuthentication";
import AuthNavigator from "./navigation/AuthNavigator";
import DashboardNavigator from "./navigation/DashboardNavigator";
import VerificationNavigator from "./navigation/VerificationNavigator";

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(118, 216, 253, 1)",
      main: "rgba(0, 177, 245, 1)",
      dark: "rgba(0, 144, 221, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(74, 144, 226, 0.67)",
      main: "rgba(74, 144, 226, 1)",
      dark: "rgba(45, 127, 223, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

function App() {
  const [isAuthenticated, isVerified] = useAuthentication();

  const setNavigator = () => {
    if (isAuthenticated) {
      if (isVerified) {
        return <DashboardNavigator />;
      }
      return <VerificationNavigator />;
    }
    return <AuthNavigator />;
  };
  const routes = setNavigator();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{routes}</ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
