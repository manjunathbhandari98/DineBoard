import axios from "axios";
import { getToken } from "./localStorageService";
const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

export const createHotel = async (
  hotelData: any,
  ownerId: any
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/hotels/${ownerId}`,
      hotelData,
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
          message: "Can't create Hotel",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const getHotelByUser = async (
  ownerId: any
) => {
  try {
    const token = getToken("authToken");
    const response = await axios.get(
      `${BASE_URL}/hotels/by-user/${ownerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "There's No Hotels",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const updateHotel = async (
  hotelId: any,
  hotelData: any
) => {
  try {
    const token = getToken("authToken");
    const response = await axios.put(
      `${BASE_URL}/hotels/${hotelId}`,
      hotelData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "There's No Hotels",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};
