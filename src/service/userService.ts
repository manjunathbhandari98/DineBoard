import axios from "axios";
import {
  getToken,
  setToken,
} from "./localStorageService";

const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

export const registerUser = async (user: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/register`,
      user
    );
    return response;
  } catch (e: unknown) {
    // Use `unknown` for better type safety
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Signup failed",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const loginUser = async (user: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/login`,
      user
    );

    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Login failed",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const getProfileInfo = async () => {
  try {
    const token = getToken("authToken");
    const response = await axios.get(
      `${BASE_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data || {
          message: "Failed to Fetch Profile",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};
