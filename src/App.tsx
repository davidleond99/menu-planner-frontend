import { Provider } from "react-redux";
import "./App.css";
import store from "./shared/store";
import { NextUIProvider } from "@nextui-org/react";
import AppRouter from "./modules/app/router";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <NextUIProvider>
          <AppRouter />
        </NextUIProvider>
      </Provider>
    </div>
  );
}

export default App;
