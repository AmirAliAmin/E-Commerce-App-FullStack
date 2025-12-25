import mongoose from "mongoose";

const homeBannerSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const HomeBannerModel = mongoose.model("HomeBanner", homeBannerSchema);
export default HomeBannerModel;
