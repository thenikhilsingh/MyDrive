import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
