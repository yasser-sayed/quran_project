import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./state-management/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";

const theme = extendTheme({
  colors: {
    main: "#101010",
    sec: {
      "100": "#d6f2de",
      "200": "#a8e5ba",
      "300": "#79d795",
      "400": "#4bc970",
      "500": "#1ebc4b",
      "600": "#1aa63e",
      "700": "#158131",
      "800": "#105c25",
      "900": "#0b3719",
    },
    third: "#2A2A2A",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
