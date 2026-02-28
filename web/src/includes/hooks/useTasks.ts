import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import { toast } from 'sonner';

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: string;
    createdAt?: string;
}

export const useTasks = (search: string, status: string, page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ['tasks', search, status, page, limit],
        queryFn: async () => {
            const query = new URLSearchParams({ search, status, page: page.toString(), limit: limit.toString() }).toString();
            const res = await apiRequest(`/tasks?${query}`);
            if (!res.ok) throw new Error('Failed to fetch tasks');
            const data = await res.json();
            return data as { tasks: Task[], pagination: { total: number, page: number, limit: number, totalPages: number } };
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task created successfully');
        },
        onError: (err: any) => {
            toast.error(err.message || 'Error creating task');
        }
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }: { id: string; title?: string; description?: string; status?: string }) => {
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
            toast.success('Task updated successfully');
        },
        onError: (err: any) => {
            toast.error(err.message || 'Error updating task');
        }
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
            toast.success('Task deleted successfully');
        },
        onError: (err: any) => {
            toast.error(err.message || 'Error deleting task');
        }
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
            toast.success('Status updated');
        },
        onError: (err: any) => {
            toast.error(err.message || 'Error updating status');
        }
    });
};
