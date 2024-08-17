import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
      shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

export default URL;
