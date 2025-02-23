import mongoose from "mongoose";

const Activity = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
  
    },

    duration: {
      type: String,
      required: [true, "Please provide the activity duration"],
      maxlength: 50,
      // enum: ["30 minutes", "1 hour", "1,5 hour", "2 hours", "2,5 hours"], 
      // default: "30 minutes", 
    },

    activity: {
      type: String,
      // enum: ["Walking", "Running", "Cycling", "Dance", "Swimming", "Football", "Yoga", "Boxing"],
    
    },

    createdByuser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", Activity);















