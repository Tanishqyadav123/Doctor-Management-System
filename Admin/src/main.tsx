import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AdminContextProvider } from "./Context/adminContext.tsx";
import { ToastContainer } from "react-toastify";
import { DoctorContextProvider } from "./Context/doctorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminContextProvider>
      <DoctorContextProvider>
        <App />
      </DoctorContextProvider>
      <ToastContainer />
    </AdminContextProvider>
  </StrictMode>
);
