import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      index: true,
    },

    category: {
      type: String,
      required: true, // Men, Women, Kids
      index: true,
    },

    subCategory: {
      type: String, // T-Shirts, Hoodies, Jeans etc
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    sizes: [
      {
        type: String, // S, M, L, XL
      },
    ],

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    ratings: {
      type: Number,
      default: 0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
