
import type { Product } from "./products";

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  badge: string;
  theme: "berry" | "chocolate" | "mint";
  regularPrice: number;
  offerPrice: number;
  images: {
    name: string;
    src: string;
  }[];
  cartProduct: Product;
}

export const specialOffers: SpecialOffer[] = [
  {
    id: "offer-fruity-duo",
    title: "Fruity Fun Duo",
    description:
      "Double the happiness with Strawberry Bliss and Mango Sunshine.",
    badge: "Fruity Favourite",
    theme: "berry",
    regularPrice: 1010,
    offerPrice: 890,

    images: [
      {
        name: "Strawberry Ice Cream",
        src: "/images/scoop-strawberry.png",
      },
      {
        name: "Mango Ice Cream",
        src: "/images/scoop-mango.png",
      },
    ],

    cartProduct: {
      id: "offer-fruity-duo",
      name: "Strawberry + Mango Duo",
      description:
        "One Strawberry Bliss and one Mango Sunshine.",
      category: "Fruity",
      price: 890,
      image: "/images/scoop-strawberry.png",
      tag: "Combo Offer",
      tint: "#ffe3ef",
    },
  },

  {
    id: "offer-classic-duo",
    title: "Classic Love Duo",
    description:
      "The perfect creamy pairing of Choco Dream and Vanilla Cloud.",
    badge: "Classic Combo",
    theme: "chocolate",
    regularPrice: 1000,
    offerPrice: 850,

    images: [
      {
        name: "Chocolate Ice Cream",
        src: "/images/scoop-chocolate.png",
      },
      {
        name: "Vanilla Ice Cream",
        src: "/images/scoop-vanilla.png",
      },
    ],

    cartProduct: {
      id: "offer-classic-duo",
      name: "Choco + Vanilla Duo",
      description:
        "One Choco Dream and one Vanilla Cloud.",
      category: "Classic",
      price: 850,
      image: "/images/scoop-chocolate.png",
      tag: "Combo Offer",
      tint: "#f4e4d8",
    },
  },

  {
    id: "offer-fresh-duo",
    title: "Berry Fresh Duo",
    description:
      "A delicious combination of Berry Magic and Minty Fresh.",
    badge: "Cool & Refreshing",
    theme: "mint",
    regularPrice: 1040,
    offerPrice: 910,

    images: [
      {
        name: "Blueberry Ice Cream",
        src: "/images/scoop-blueberry.png",
      },
      {
        name: "Mint Ice Cream",
        src: "/images/scoop-mint.png",
      },
    ],

    cartProduct: {
      id: "offer-fresh-duo",
      name: "Berry + Mint Duo",
      description:
        "One Berry Magic and one Minty Fresh.",
      category: "Fresh",
      price: 910,
      image: "/images/scoop-blueberry.png",
      tag: "Combo Offer",
      tint: "#e5f4ec",
    },
  },
];
