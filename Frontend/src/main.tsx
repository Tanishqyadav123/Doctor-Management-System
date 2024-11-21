import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import DoctorContextProvider from "./Context/doctorContext.tsx";
import { UserContextProvider } from "./Context/userContext.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DoctorContextProvider>
      <UserContextProvider>
        <App />
        <ToastContainer />
      </UserContextProvider>
    </DoctorContextProvider>
  </StrictMode>
);
