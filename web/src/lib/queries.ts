import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from './api';

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: string;
}

export const useTasks = (search: string, status: string) => {
    return useQuery({
        queryKey: ['tasks', search, status],
        queryFn: async () => {
            const query = new URLSearchParams({ search, status }).toString();
            const res = await apiRequest(`/tasks?${query}`);
            if (!res.ok) throw new Error('Failed to fetch tasks');
            const data = await res.json();
            return data.tasks as Task[];
        },
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTask: { title: string; description?: string }) => {
            const res = await apiRequest('/tasks', {
                method: 'POST',
                body: JSON.stringify(newTask),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.errors && Array.isArray(data.errors)) {
                    throw new Error(data.errors.map((e: any) => e.message).join('. '));
                }
                throw new Error(data.message || 'Error creating task');
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }: { id: string; title?: string; description?: string }) => {
            const res = await apiRequest(`/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updateData),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.errors && Array.isArray(data.errors)) {
                    throw new Error(data.errors.map((e: any) => e.message).join('. '));
                }
                throw new Error(data.message || 'Error updating task');
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await apiRequest(`/tasks/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete task');
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useToggleTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await apiRequest(`/tasks/${id}/toggle`, { method: 'PATCH' });
            if (!res.ok) throw new Error('Failed to toggle task');
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};
