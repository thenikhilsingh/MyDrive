import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import WaitingForBackend from "../components/WaitingForBackend";

export const AuthContext = createContext();

function App() {
  const [backendReady, setBackendReady] = useState(false);
  const [checkingBackend, setCheckingBackend] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const [user, setUser] = useState();
  //to get the currently logged in  user data
  const getLoggedInUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.userData);
      if (response.status === 200) {
        setUser(response.data.userData);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (token) {
      getLoggedInUserData();
    }
  }, [token]);

  const checkBackendHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);

      if (response.status === 200) {
        setBackendReady(true);
        setCheckingBackend(false);
      }
    } catch (error) {
      console.log(error?.response?.data || error.message);
      setBackendReady(false);
      setCheckingBackend(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();

    if (backendReady) return;

    const interval = setInterval(() => {
      checkBackendHealth();
    }, 5000);

    return () => clearInterval(interval);
  }, [backendReady]);

  if (checkingBackend || !backendReady) {
    return <WaitingForBackend />;
  }
  return (
    <>
      <AuthContext.Provider
        value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, token }}
      >
        <Outlet />
      </AuthContext.Provider>
    </>
  );
}

export default App;
