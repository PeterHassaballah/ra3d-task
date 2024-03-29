// Define the ITask interface
export interface ITask extends Document {
  title: string;
  description?: string;
  userId: string;
  assignedBy: string;
  status: 'pending' | 'inProgress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}