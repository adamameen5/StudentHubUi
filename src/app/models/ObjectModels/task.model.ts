import { Assignee } from "./assignee.model";

export interface Task {
    id: number;
    title: string;
    description: string;
    assignee: Assignee;
    tag: string;
    priority: string;
    workspaceId: number;
    status?: string;
    path?: string;
    dueDate?: Date;
    createdAt?: Date;
    isImportant?: boolean;
}