import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";
import { HomePage } from "./pages";

function App() {
  const { theme } = useThemeContext();

 

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomePage/>
      </ThemeProvider>
    </>
  );
}

export default App;
