export type ProjectStatus =
  | "Inquiry"
  | "Proposal"
  | "InProgress"
  | "Review"
  | "Completed";

export interface Task {
  _id?: string;
  text: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id: string;
  userId: string;
  title: string;
  clientName: string;
  budget: number;
  deadline: string;
  notes: string;
  status: ProjectStatus;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}