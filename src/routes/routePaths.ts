const RoutePaths = {
  HOME: "/",
  PRICING: "/pricing",
  SUPPORT: "/support",
  ABOUT: "/about",
  LOGIN: "/auth?mode=login",
  REGISTER: "/auth?mode=register",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  MENUS: "/menus",
  QRCODES: "/qrcodes-setting",
  ORDERS: "/orders",
  CUSTOMERMENU: "/customer-menu",
  HOTELSETTINGS: "/hotel-settings",
  HOTELPROFILE: "/hotel-profile",
  SETTINGS: "/settings",
  PREVIEWMENU: "/customer-menu",
  PREVIEWMENU_WITH_ID: (id: string) =>
    `/customer-menu/${id}`,
};

export default RoutePaths;
