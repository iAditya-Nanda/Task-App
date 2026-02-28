import React from 'react';
import { Loader2 } from 'lucide-react';

export default function TaskModal({
    isModalOpen,
    setIsModalOpen,
    handleCreateOrUpdate,
    title,
    setTitle,
    description,
    setDescription,
    isPending,
    editingTask
}: any) {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 transform transition-all">
                <h2 className="text-3xl font-extrabold text-black mb-8 tracking-tight">{editingTask ? 'Edit Task' : 'New Task'}</h2>
                <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2 ml-1">Task Name</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g. Schedule Me An Appointment"
                            className="w-full bg-[#F9FAFB] border border-gray-200 text-black px-5 py-4 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 transition-all font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2 ml-1">Category / Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="Add details about this task..."
                            className="w-full bg-[#F9FAFB] border border-gray-200 text-black px-5 py-4 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 transition-all resize-none font-medium"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-50 text-gray-600 font-bold rounded-full hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isPending} className="flex-1 py-4 bg-black text-white font-bold rounded-full shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isPending ? 'Saving...' : (editingTask ? 'Save Changes' : 'Create Task')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
