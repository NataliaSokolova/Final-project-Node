import mongoose from "mongoose";

const ExsSchema = new mongoose.Schema(
  {
    bodyPart: {
      type: String,
      required: [true, "Please provide bodypart name"],
      maxlength: 255,
    },
    equipment: {
      type: String,
      required: [true, "Please provide equipment"],
      maxlength: 255,
    },
    exsId: {
      type: String,
      required: true,
      maxlength: 255,
    },
    name:{
      type: String,
      required: true,
      maxlength: 255,
    },
    
    target: {
      type: String,
      required: true,
      maxlength: 255,
    },

    secondaryMuscles:{
      type: [String],
      required: [true],
    },

    instructions: {
      type: [String],
      required: [true],
    },

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Exercise", ExsSchema);





