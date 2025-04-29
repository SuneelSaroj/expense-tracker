// App.js
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { SessionProvider } from "./context/SessionContext";
import { PopupContextProvider } from "./context/PopupMessage";
import LoadingScreen from "./components/UI/LoadingScreen";
import Footer from "./components/UI/Footer";

function App() {
  return (
    <SessionProvider>
      <PopupContextProvider>
        {/* LoadingScreen should be on top level */}
        <LoadingScreen />

        <div className="flex flex-col min-h-screen">
          {/* Main App Content */}
          <div className="flex-grow">
            <RouterProvider router={router} />
          </div>

          {/* Footer */}
          {/* <Footer /> */}
        </div>
      </PopupContextProvider>
    </SessionProvider>
  );
}

export default App;
