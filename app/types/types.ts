export interface Project {
    id: string;
    name: string;
    status: string;
    progress: number;
    deadline: string;
}

export interface Task {
    id: string;
    title: string;
    status: string;
    assignedTo: string;
    dueDate: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    tasksAssigned: number;
}