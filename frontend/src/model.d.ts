export interface TaskGroup {
    group_name: string;
}

export interface Task {
    id?: string;
    task_name: string;
    task_notes?: string;
    task_due_date?: string;
    task_done?: boolean;
    task_group?: string;
    task_owner?: string;
}
