import axios, { AxiosResponse } from 'axios';
import { Task, TaskGroup } from '@/model';
import Cookies from 'js-cookie';

axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

type ApiResponse<T> = AxiosResponse<T>;

interface ApiOptions<T> {
    url: string;
    method: string;
    data?: T | null;
}

function useApi<T>({
    url,
    method,
    data = null,
}: ApiOptions<T>): Promise<ApiResponse<T> | null> {
    return axios({
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + (Cookies.get('token') || ''),
        },
        method,
        url,
        data,
    });
}

export const createTaskGroup = async (taskGroup: TaskGroup) => {
    // setTimeout(() => {
    const response = useApi<TaskGroup>({
        url: '/api/tasks/create-group',
        method: 'POST',
        data: taskGroup,
    });

    return response;
    // }, 5000);
};

export const getTaskGroups = async () => {
    const response = await useApi<TaskGroup[]>({
        url: '/api/tasks/group',
        method: 'GET',
    });

    return response?.data;
};