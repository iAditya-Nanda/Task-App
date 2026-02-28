'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, ArrowUpDown, Plus, Eye, Target, ListTodo, CheckCircle2, CircleDashed } from 'lucide-react';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask, useToggleTask, Task } from '@/includes/hooks/useTasks';
import Sidebar from '@/includes/components/Sidebar';
import Header from '@/includes/components/Header';
import TaskRow from '@/includes/components/TaskRow';
import TaskModal from '@/includes/components/TaskModal';
import ConfirmDeleteModal from '@/includes/components/ConfirmDeleteModal';
import { motion } from 'framer-motion';
export default function Dashboard() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deleteTaskItem, setDeleteTaskItem] = useState<Task | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const router = useRouter();

    const { data, isLoading, error } = useTasks(searchQuery, statusFilter, page, limit);
    const tasks = data?.tasks || [];
    const pagination = data?.pagination;

    const { mutate: createTask, isPending: isCreating } = useCreateTask();
    const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
    const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();
    const { mutate: toggleTask } = useToggleTask();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/login');
    };

    const handleCreateOrUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const onSuccessCb = () => {
            setIsModalOpen(false);
            setEditingTask(null);
            setTitle('');
            setDescription('');
        };

        if (editingTask) {
            updateTask({ id: editingTask.id, title, description }, { onSuccess: onSuccessCb });
        } else {
            createTask({ title, description }, { onSuccess: onSuccessCb });
        }
    };

    const handleDelete = () => {
        if (!deleteTaskItem) return;
        deleteTask(deleteTaskItem.id, {
            onSuccess: () => setDeleteTaskItem(null),
        });
    };

    const handleSearchEnter = (query: string) => {
        if (!query.trim()) return;
        setActiveTab('TASKS');
        setEditingTask(null);
        setTitle(query);
        setDescription('');
        setIsModalOpen(true);
    };

    const openEditModal = (task: Task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description || '');
        setIsModalOpen(true);
    };

    const isPending = isCreating || isUpdating;

    const openTasks = tasks?.filter((t) => t.status === 'OPEN') || [];
    const completedTasks = tasks?.filter((t) => t.status === 'COMPLETED') || [];
    const totalTasks = tasks?.length || 0;

    return (
        <div className="flex h-screen bg-theme-bg font-sans overflow-hidden selection:bg-purple-100 selection:text-purple-900">
            <Sidebar openTasksCount={openTasks.length} handleLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 flex flex-col h-full bg-white md:rounded-l-[2.5rem] shadow-[-10px_0_30px_rgba(0,0,0,0.02)] overflow-hidden relative">
                {/* Fixed Decorative Corner Blob */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none -z-0" />

                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchEnter={handleSearchEnter} />

                <div className="flex-1 overflow-y-auto px-8 lg:px-12 pb-12 w-full max-w-6xl mx-auto no-scrollbar relative z-10">

                    {activeTab === 'DASHBOARD' && (
                        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pt-4">
                            <motion.div variants={item}>
                                <h1 className="text-3xl font-extrabold text-black tracking-tight mb-2 flex items-center gap-3">
                                    Welcome Back!
                                </h1>
                                <p className="text-gray-500 font-medium text-[15px]">Here is what's happening in your workspace today.</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.div variants={item} className="p-6 bg-purple-50/50 rounded-[2rem] border border-purple-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                    <div className="absolute right-0 top-0 w-36 h-36 bg-purple-100/60 rounded-bl-full -z-10 group-hover:scale-120 transition-transform duration-500"></div>
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm"><ListTodo size={24} /></div>
                                    <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Total Tasks</h3>
                                    <p className="text-4xl font-black text-black">{totalTasks}</p>
                                </motion.div>
                                <motion.div variants={item} className="p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                    <div className="absolute right-0 top-0 w-36 h-36 bg-emerald-100/60 rounded-bl-full -z-10 group-hover:scale-120 transition-transform duration-500"></div>
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm"><CheckCircle2 size={24} /></div>
                                    <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Completed</h3>
                                    <p className="text-4xl font-black text-black">{completedTasks.length}</p>
                                </motion.div>
                                <motion.div variants={item} className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                    <div className="absolute right-0 top-0 w-36 h-36 bg-blue-100/60 rounded-bl-full -z-10 group-hover:scale-120 transition-transform duration-500"></div>
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm"><CircleDashed size={24} /></div>
                                    <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Open Tasks</h3>
                                    <p className="text-4xl font-black text-black">{openTasks.length}</p>
                                </motion.div>
                            </div>

                            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button onClick={() => { setEditingTask(null); setTitle(''); setDescription(''); setIsModalOpen(true); }} className="flex-1 py-5 bg-black text-white rounded-2xl font-extrabold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                                    <Plus size={20} /> Create New Task
                                </button>
                                <button onClick={() => setActiveTab('TASKS')} className="flex-1 py-5 bg-white border-2 border-gray-100 text-black rounded-2xl font-extrabold flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all">
                                    <Eye size={20} /> View All Tasks
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeTab === 'TASKS' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Action Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 mt-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setStatusFilter(statusFilter === 'OPEN' ? '' : 'OPEN')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all ${statusFilter === 'OPEN' ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-gray-200 text-black hover:bg-gray-50'}`}
                                    >
                                        <Filter size={16} /> Filter
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-black text-sm font-bold hover:bg-gray-50 transition-all">
                                        <ArrowUpDown size={16} /> Sort
                                    </button>
                                </div>

                                <button onClick={() => { setEditingTask(null); setTitle(''); setDescription(''); setIsModalOpen(true); }} className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-bold shadow-md hover:scale-105 transition-all flex items-center gap-2">
                                    <Plus size={16} /> New Task
                                </button>
                            </div>

                            {/* Task Lists */}
                            {isLoading ? (
                                <div className="py-20 text-center text-gray-400 font-medium tracking-wide animate-pulse">Synchronizing workspace...</div>
                            ) : error ? (
                                <div className="py-20 text-center text-rose-500 font-bold bg-rose-50/50 rounded-3xl border border-rose-100">Connection error. Please restart the backend server.</div>
                            ) : tasks.length === 0 ? (
                                <div className="py-32 text-center flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                        <Target className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 font-medium text-lg">Your workspace is incredibly clean.</p>
                                    <button onClick={() => setIsModalOpen(true)} className="mt-4 text-purple-600 font-bold hover:underline">Add your first task</button>
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    {/* TODO SECTION */}
                                    {openTasks.length > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between mb-4 px-2">
                                                <h4 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Todo Tasks</h4>
                                            </div>
                                            <div className="space-y-3">
                                                {openTasks.map((task: Task) => <TaskRow key={task.id} task={task} onEdit={() => openEditModal(task)} onToggle={() => toggleTask(task.id)} onDelete={() => setDeleteTaskItem(task)} />)}
                                            </div>
                                        </div>
                                    )}

                                    {/* COMPLETED SECTION */}
                                    {completedTasks.length > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between mb-4 px-2">
                                                <h4 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">Completed</h4>
                                            </div>
                                            <div className="space-y-3">
                                                {completedTasks.map((task: Task) => <TaskRow key={task.id} task={task} onEdit={() => openEditModal(task)} onToggle={() => toggleTask(task.id)} onDelete={() => setDeleteTaskItem(task)} />)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Pagination Controls */}
                                    {pagination && pagination.totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-50">
                                            <button
                                                disabled={page === 1}
                                                onClick={() => setPage(p => p - 1)}
                                                className="px-6 py-2 rounded-xl border border-gray-100 font-bold text-sm disabled:opacity-30 hover:bg-gray-50 transition-all"
                                            >
                                                Previous
                                            </button>
                                            <span className="text-sm font-bold text-gray-400">
                                                Page {page} of {pagination.totalPages}
                                            </span>
                                            <button
                                                disabled={page === pagination.totalPages}
                                                onClick={() => setPage(p => p + 1)}
                                                className="px-6 py-2 rounded-xl border border-gray-100 font-bold text-sm disabled:opacity-30 hover:bg-gray-50 transition-all"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </main>

            <ConfirmDeleteModal
                isOpen={!!deleteTaskItem}
                onClose={() => setDeleteTaskItem(null)}
                onConfirm={handleDelete}
                isDeleting={isDeletingTask}
            />

            <TaskModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleCreateOrUpdate={handleCreateOrUpdate}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                isPending={isPending}
                editingTask={editingTask}
            />
        </div>
    );
}
