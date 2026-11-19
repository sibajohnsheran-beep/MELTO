
/* ==========================================
   MELTO - SHARED PRODUCT DATA
========================================== */

export type ProductCategory =
  | "Fruity"
  | "Classic"
  | "Fresh";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  image: string;
  tag: string;
  tint: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

/* ==========================================
   SIX MELTO ICE CREAM PRODUCTS
========================================== */

export const products: Product[] = [
  {
    id: "melto-strawberry",
    name: "Strawberry Bliss",
    description:
      "Creamy strawberry ice cream with sweet strawberry goodness.",
    category: "Fruity",
    price: 850,
    image: "/images/melto-collection-strawberry.png",
    tag: "Sweet Pick",
    tint: "#ffe0ec",
  },

  {
    id: "melto-chocolate",
    name: "Chocolate Fudge",
    description:
      "Rich chocolate ice cream with indulgent chocolate flavour.",
    category: "Classic",
    price: 900,
    image: "/images/melto-collection-chocolate.png",
    tag: "Choco Love",
    tint: "#f5dfd7",
  },

  {
    id: "melto-mango",
    name: "Mango Delight",
    description:
      "A tropical mango treat full of juicy flavour.",
    category: "Fruity",
    price: 850,
    image: "/images/melto-collection-mango.png",
    tag: "Tropical",
    tint: "#fff0c9",
  },

  {
    id: "melto-blueberry",
    name: "Blueberry Swirl",
    description:
      "Sweet blueberry ice cream with a creamy swirl.",
    category: "Fruity",
    price: 900,
    image: "/images/melto-collection-blueberry.png",
    tag: "Berry Love",
    tint: "#eee0ff",
  },

  {
    id: "melto-vanilla",
    name: "Vanilla Cloud",
    description:
      "Classic vanilla flavour with a dreamy creamy finish.",
    category: "Classic",
    price: 450,
    image: "/images/melto-collection-vanilla.png",
    tag: "Classic",
    tint: "#fff2dc",
  },

  {
    id: "melto-mint",
    name: "Minty Fresh",
    description:
      "Cool mint ice cream with delicious chocolate chips.",
    category: "Fresh",
    price: 500,
    image: "/images/melto-collection-mint.png",
    tag: "Refreshing",
    tint: "#dff5e6",
  },
];
