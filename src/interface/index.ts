export interface MenuItem {
  id: string; // Or number if backend uses numeric IDs
  name: string;
  description: string;
  price: number;
  itemImage: string | any;
  menuId: string; // Or number
  categoryId: string; // Or number
}

export interface MenuCategory {
  categoryId: string; // Or number
  categoryName: string;
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
  planId: number;
  // other hotel fields...
}


export interface Plan {
  id: any;
  name: string;
  description: string;
  price: any;
}
