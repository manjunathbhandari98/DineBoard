import axios from "axios";

const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

export const getAllPlans = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/plans`
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Can't Fetch Plans",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};
