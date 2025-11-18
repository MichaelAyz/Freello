import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  userId: string;
  title: string;
  clientName: string;
  budget: number;
  deadline: string;
  notes: string;
  status: "Inquiry" | "Proposal" | "In Progress" | "Review" | "Completed";
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    budget: { type: Number, required: true },
    deadline: { type: String, required: true },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Inquiry", "Proposal", "In Progress", "Review", "Completed"],
      default: "Inquiry",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
