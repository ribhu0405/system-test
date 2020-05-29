export interface ITask {
    id: number;
    currentState: string,
    title: string;
    description: string;
    createdAt: Date;
    dueDate: Date;
    priority: string;
}
