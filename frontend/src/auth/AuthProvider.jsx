import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axiosInstance";
import PropTypes from "prop-types";
import { API_URL } from "../utils.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const token = res.data.accessToken;
      setAccessToken(token);

      Cookies.set("refreshToken", res.data.refreshToken, {
        secure: false,
        sameSite: "None",
        expires: 5,
      });

      Cookies.set("uId", res.data.uId, {
        secure: false,
        sameSite: "None",
      });

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    Cookies.remove("refreshToken");
    Cookies.remove("uId");
    localStorage.removeItem("accessToken");

    return Promise.resolve();
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.get(`${API_URL}/token`);
      const token = res.data.accessToken;
      setAccessToken(token);
      return token;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuthContext = () => useContext(AuthContext);