import axios from "axios";
import { getToken } from "./localStorageService";
const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

export const saveQRCode = async (qrData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/qrcodes`,
      qrData,
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
          message: "Can't save QRCode",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const getQRCodes = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/qrcodes`,

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
          message: "Can't get QRCodes",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const deleteQRCode = async (id: any) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/qrcodes/${id}`,

      {
        headers: {
          Authorization: `Bearer ${getToken(
            "authToken"
          )}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Can't delete this QRCodes",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const updateQRCodeLabel = async (
  id: any,
  data: any
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/qrcodes/${id}`,
      data,

      {
        headers: {
          Authorization: `Bearer ${getToken(
            "authToken"
          )}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Can't Edit this QRCodes",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};
