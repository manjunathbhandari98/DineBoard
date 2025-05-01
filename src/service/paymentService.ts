import axios from "axios";
import { getToken } from "./localStorageService";

const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

export const handlePayment = async (
  amount: number
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/create-order`,
      { amount },
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
          message: "Payment Failed",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};
