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
import Dashboard, { DashboardHome } from "../pages/Dashboard.jsx";
import Error from "../pages/Error.jsx";
import Logout from "../components/Logout.jsx";
import FolderDetails from "../components/FolderDetails.jsx";
import FileDetails from "../components/FileDetails.jsx";
import SharedFolder from "../components/SharedFolder.jsx";
import Trash from "../components/Trash.jsx";
import Folders from "../components/Folders.jsx";
import Profile from "../components/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="folders" element={<Folders />} />
        <Route path="folder/:folderId" element={<FolderDetails />} />
        <Route path="file/:fileId" element={<FileDetails />} />
        <Route path="trash" element={<Trash />} />
      </Route>
      <Route path="share/:shareId" element={<SharedFolder />} />
      <Route path="logout" element={<Logout />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
