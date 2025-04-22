import axios from "axios";
import { getToken } from "./localStorageService";
const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

export const createMenu = async (menu: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/menus`,
      menu,
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

export const getMenu = async (hotelId: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/menus/hotel/${hotelId}`,
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
          message: "Menu Fetch Failed",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const updateMenu = async (
  menuId: any,
  updatedMenu: any
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/menus/${menuId}`,
      updatedMenu,
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
          message: "Can't Update Menu",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const addMenuCategory = async (
  categoryData: any
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/category`,
      categoryData,
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
    throw {
      message: "An unexpected error occured",
    };
  }
};

export const getCategoryByMenu = async (
  menuId: any
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/category/categories/${menuId}`,
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
    throw {
      message: "An unexpected error occured",
    };
  }
};

export const addMenuItem = async (
  menuItem: any
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/menu-item`,
      menuItem,
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
    throw {
      message: "An unexpected error occured",
    };
  }
};

export const getMenuItems = async (
  menuId: any,
  categoryId: any
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/menu-item/menu/${menuId}/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken(
            "authToken"
          )}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw {
      message: "An Unexpected error occured",
    };
  }
};
