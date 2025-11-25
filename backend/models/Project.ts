import mongoose, { Schema, Document } from "mongoose";

export interface ITask {
  _id: string;
  text: string;
  done: boolean;
}

export interface IProject extends Document {
  userId: string;
  title: string;
  clientName: string;
  budget: number;
  deadline: string;
  notes: string;
  status: "Inquiry" | "Proposal" | "InProgress" | "Review" | "Completed";
  tasks: ITask[];
}

const TaskSchema = new Schema<ITask>({
  _id: { type: String, required: true },
  text: { type: String, required: true },
  done: { type: Boolean, default: false }
});

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
      enum: ["Inquiry", "Proposal", "InProgress", "Review", "Completed"],
      default: "Inquiry",
    },
    tasks: { type: [TaskSchema], default: [] },
  },
  
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
