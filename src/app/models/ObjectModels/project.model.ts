export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    workspaceId: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    role: string;
    status?: string;
    teamMembers?: number;
    collaborators: Collaborator[];
    imageUrl: string;
}

export interface Collaborator{
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    imagePath: string;
    email: string;
    role: string;
}