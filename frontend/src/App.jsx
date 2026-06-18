import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext();

const storeTokenInLS = (serverToken) => {
  return localStorage.setItem("token", serverToken);
};

function App() {
  return (
    <>
      <AuthContext.Provider value={storeTokenInLS}>
        <Outlet />
      </AuthContext.Provider>
    </>
  );
}

export default App;
