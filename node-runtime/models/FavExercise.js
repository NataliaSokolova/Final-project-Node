import mongoose from "mongoose";

const FavExsSchema = new mongoose.Schema(
  {
    favExs: {
      type: [String],
    },


    createdByuser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("FavExercise", FavExsSchema);





