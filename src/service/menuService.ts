import axios from "axios";
import { getToken } from "./localStorageService";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const createMenu = async (menu: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/menus`, menu, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.data.success === false) {
      throw {
        errorMessage: response.data.message || "Failed to Create Menu",
      };
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          errorMessage: "Can't Create New Menu",
        }
      );
    }
    throw {
      errorMessage: "An unexpected error occured",
    };
  }
};

export const getMenu = async (hotelId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/menus/hotel/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
        "Content-Type": "application/json",
      },
    });
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

export const getMenuById = async (id: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/menus/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
        "Content-Type": "application/json",
      },
    });
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

export const updateMenu = async (menuId: any, updatedMenu: any) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/menus/${menuId}`,
      updatedMenu,
      {
        headers: {
          Authorization: `Bearer ${getToken("authToken")}`,
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

export const deleteMenu = async (menuId: any) => {
  try {
    const response = await axios.delete(`${BASE_URL}/menus/${menuId}`, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Can't Delete Menu",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};

export const trackMenuView = async (menuId: string) => {
  try {
    await axios.post(`${BASE_URL}/menus/analytics/${menuId}/track-view`);
  } catch (error) {
    console.error("Failed to increment menu views", error);
  }
};

export const addMenuCategory = async (categoryData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/category`, categoryData, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
      },
    });
    return response.data;
  } catch (e) {
    throw {
      message: "An unexpected error occured",
    };
  }
};

export const getCategoryByMenu = async (menuId: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/category/categories/${menuId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken("authToken")}`,
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

export const updateCategory = async (categoryId: any, data: any) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/category/${categoryId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken("authToken")}`,
          "Content-Type": "application/json",
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

export const deleteCategory = async (categoryId: any) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/category/${categoryId}`,

      {
        headers: {
          Authorization: `Bearer ${getToken("authToken")}`,
          "Content-Type": "application/json",
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

export const addMenuItem = async (menuItemData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/menu-items`, menuItemData, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    
    // Check for success flag in response
    if (response.data.success === false) {
      throw {
        errorMessage: response.data.message || "Failed to add menu item",
      };
    }
    
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Axios error adding menu item:", e.response?.data);
      throw (
        e.response?.data || {
          errorMessage: "Can't add menu item",
        }
      );
    }
    console.error("Unexpected error adding menu item:", e);
    throw {
      errorMessage: "An unexpected error occurred while adding menu item",
    };
  }
};

export const getMenuItems = async (menuId: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/menu-items/menu/${menuId}`, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw {
      message: "An unexpected error occurred while fetching menu items",
    };
  }
};

export const getMenuItemsByCategory = async (menuId: any, categoryId: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/menu-items/menu/${menuId}/category/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by category:", error);
    throw {
      message: "An unexpected error occurred while fetching menu items",
    };
  }
};

export const updateMenuItemService = async (menuItemId: any, data: any) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/menu-items/${menuItemId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    // Check for success flag in response
    if (response.data.success === false) {
      throw {
        errorMessage: response.data.message || "Failed to update menu item",
      };
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error updating menu item:", error.response?.data);
      throw (
        error.response?.data || {
          errorMessage: "Can't update menu item",
        }
      );
    }
    console.error("Unexpected error updating menu item:", error);
    throw {
      errorMessage: "An unexpected error occurred while updating menu item",
    };
  }
};

export const deleteMenuItemService = async (menuItemId: any) => {
  try {
    const response = await axios.delete(`${BASE_URL}/menu-items/${menuItemId}`, {
      headers: {
        Authorization: `Bearer ${getToken("authToken")}`,
      },
    });
    
    // Check for success flag in response
    if (response.data.success === false) {
      throw {
        errorMessage: response.data.message || "Failed to delete menu item",
      };
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error deleting menu item:", error.response?.data);
      throw (
        error.response?.data || {
          errorMessage: "Can't delete menu item",
        }
      );
    }
    console.error("Unexpected error deleting menu item:", error);
    throw {
      errorMessage: "An unexpected error occurred while deleting menu item",
    };
  }
};
