export interface Project {
  _id: string;
  userId: string;
  title: string;
  clientName: string;
  budget: number;
  deadline: string;
  notes: string;
  status: "Inquiry" | "Proposal" | "In Progress" | "Review" | "Completed";
  createdAt: string;
  updatedAt: string;
}
