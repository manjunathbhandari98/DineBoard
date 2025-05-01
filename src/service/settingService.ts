import axios from "axios";
import { getToken } from "./localStorageService";
const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

export const saveSettings = async (
  settingsData: any
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/settings`,
      settingsData,
      {
        headers: {
          Authorization: `Bearer ${getToken(
            "authToken"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Can't save Settings",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const getSettings = async (
  hotelId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/settings/hotel/${hotelId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken(
            "authToken"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Can't fetch Settings",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};
