export interface TaskGroup {
    group_name: string;
    group_id?: string;
}

export interface Task {
    task_id?: string;
    task_name: string;
    task_notes?: string;
    task_due_date?: string;
    task_done?: boolean;
    task_group?: TaskGroup;
    task_owner?: string;
}
