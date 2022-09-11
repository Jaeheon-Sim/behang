import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import Router from "./Router";
import Login from "./routes/Login";

function App() {
  return (
    <>
      {/* <ThemeProvider theme={isDark ? darkTheme : lightTheme}> */}

      <GlobalStyle />
      <Router />

      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
