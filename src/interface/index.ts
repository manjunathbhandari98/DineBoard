export interface MenuItem {
  id: string; // Or number if backend uses numeric IDs
  name: string;
  description: string;
  price: number;
  itemImage: string | any;
  menuId: string; // Or number
  category: MenuCategory; // Or number
}

export interface MenuCategory {
  categoryId: string; // Or number
  categoryName: string;
  menuId: string; // Or number
}

export interface Menu {
  id: string; // Or number
  title: string;
  published: boolean;
  hotel:Hotel
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
  planId: string;
  name: string;
  description: string;
  price: number;
  allowsWhiteLabeling:boolean;
  highlighted:boolean;
  allowedMenus:number;
  features:string[]
}
