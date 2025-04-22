export interface MenuItem {
  id: string; // Or number if backend uses numeric IDs
  name: string;
  description: string;
  price: number;
  itemImage?: string;
  menuId: string; // Or number
  categoryId: string; // Or number
}

export interface MenuCategory {
  id: string; // Or number
  name: string;
  menuId: string; // Or number
}

export interface Menu {
  id: string; // Or number
  title: string;
  isPublished: boolean;
  hotelId: string; // Or number
}

export interface Profile {
  id: string; // Or number
  // other profile fields...
}

export interface Hotel {
  id: string; // Or number
  // other hotel fields...
}
