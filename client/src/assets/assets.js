import calvinKlein from "./calvinKlein.png";
import coverImage from "./coverImage.png";
import gucci from "./gucci.png";
import prada from "./prada.png";
import varsace from "./varsace.png";
import zara from "./zara.png";
import vectorSmall from "./vectorSmall.png";
import vectorBig from "./vectorBig.png";
import coverImage2 from "./coverImage2.png";

import product1 from "./product1.png";
import product2 from "./product2.png";
import product3 from "./product3.png";
import product4 from "./product4.png";
import product5 from "./product5.png";
import product6 from "./product6.png";
import product7 from "./product7.png";
import product8 from "./product8.png";

export const assets = {
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  calvinKlein,
  coverImage,
  coverImage2,
  gucci,
  prada,
  varsace,
  zara,
  vectorSmall,
  vectorBig,
};

export const products = [
  {
    _id: "1",
    name: "Checkered Shirt",
    description: "Comfortable cotton checkered shirt for casual wear.",
    brand: "Zenvy",
    category: "Men",
    subCategory: "Shirts",
    price: 260,
    discountPrice: 240,
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
    images: [product1],
    ratings: 4.5,
    numOfReviews: 12,
    reviews: [],
    isFeatured: true,
  },

  {
    _id: "2",
    name: "Checkered Shirt",
    description:
      "Stylish cotton checkered shirt perfect for casual and semi-formal wear.",
    brand: "Zenvy",
    category: "Men",
    subCategory: "Shirts",
    price: 260,
    discountPrice: 240,
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
    images: [product6],
    ratings: 4.4,
    numOfReviews: 10,
    reviews: [],
    isFeatured: false,
  },

  {
    _id: "3",
    name: "Slim Fit Jeans",
    description: "Stylish slim fit jeans with stretch denim fabric.",
    brand: "Zenvy",
    category: "Men",
    subCategory: "Jeans",
    price: 400,
    discountPrice: 360,
    sizes: ["30", "32", "34", "36"],
    stock: 40,
    images: [product7],
    ratings: 4.7,
    numOfReviews: 15,
    reviews: [],
    isFeatured: true,
  },

  {
    _id: "4",
    name: "Basic T-Shirt",
    description: "Minimal cotton t-shirt for everyday wear.",
    brand: "Zenvy",
    category: "Men",
    subCategory: "T-Shirts",
    price: 150,
    discountPrice: 120,
    sizes: ["S", "M", "L"],
    stock: 100,
    images: [product3],
    ratings: 4.0,
    numOfReviews: 5,
    reviews: [],
    isFeatured: false,
  },
];
