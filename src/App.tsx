import { Provider } from "react-redux";
import "./App.css";
import store from "./shared/store";
import { NextUIProvider } from "@nextui-org/react";
import AppRouter from "./modules/app/router";

function App() {
  return (
    <div className="App">
      {/* <div className="relative flex gap-10 min-h-screen flex-col justify-center items-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <button className="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-full before:bg-red-300 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 before:transition-transform">
          <span className="relative">Bouton</span>
        </button>
        <button className="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-orange-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-orange-200 hover:before:animate-ping transition-all duration-300">
          <span className="relative">Bouton</span>
        </button>
        <button className="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
          <span className="relative">Bouton</span>
        </button>
      </div> */}
      <Provider store={store}>
        <NextUIProvider>
          <AppRouter />
        </NextUIProvider>
      </Provider>
    </div>
  );
}

export default App;
