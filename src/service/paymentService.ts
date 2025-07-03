import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const createOrder = async (amount: number) => {
  const res = await axios.post(
    `${BASE_URL}/payment/create-order`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
  return res.data;
};

export const verifyOrder = async () => {
  const res = await axios.post(`${BASE_URL}/payment/verify-test`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return res.data;
};
