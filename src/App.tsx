import {ThemeProvider} from "@emotion/react";
import "./App.css";
import HomeTabs from "./pages/home-page/tabs";
import theme from "./themes/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomeTabs></HomeTabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
