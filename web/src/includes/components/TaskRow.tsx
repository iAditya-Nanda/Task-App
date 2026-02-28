import React from 'react';
import { Edit2, Trash2, Check } from 'lucide-react';

export default function TaskRow({ task, onEdit, onToggle, onDelete }: any) {
    const isCompleted = task.status === 'COMPLETED';
    const timeline = new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className={`group flex flex-col xl:flex-row xl:items-center justify-between p-6 py-6 bg-white border ${isCompleted ? 'border-gray-50 opacity-60' : 'border-gray-100'} shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] rounded-3xl hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] hover:opacity-100 hover:border-gray-200 transition-all gap-5 xl:gap-0`}>

            {/* Left: Checkbox & Titles */}
            <div className="flex-1 min-w-0 pr-4 flex items-center gap-4">
                <button
                    onClick={(e) => { e.stopPropagation(); onToggle(); }}
                    className={`w-6 h-6 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all ${isCompleted ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}
                >
                    {isCompleted && <Check size={14} strokeWidth={4} />}
                </button>
                <div className="flex flex-col">
                    <h3 className={`text-[19px] font-extrabold truncate mb-1.5 cursor-pointer transition-colors ${isCompleted ? 'text-gray-400 line-through' : 'text-black hover:text-purple-600'}`} onClick={onEdit}>
                        {task.title}
                    </h3>
                    <p className={`text-[14.5px] font-medium truncate ${isCompleted ? 'text-gray-300' : 'text-gray-500'}`}>
                        {task.description || 'No description provided'}
                    </p>
                </div>
            </div>

            {/* Right: Badges, Progress, Actions */}
            <div className="flex items-center gap-5 xl:gap-8 overflow-x-auto no-scrollbar pb-1 xl:pb-0">

                {/* Status Badge */}
                <div className="relative shrink-0 flex items-center">
                    <div className={`px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider ${isCompleted ? 'bg-gray-100 text-gray-500' : 'bg-[#F3E8FF] text-[#7E22CE]'}`}>
                        {isCompleted ? 'Done' : 'Active'}
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-400 shrink-0 min-w-[90px]">
                    {timeline}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-100 shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2.5 text-gray-500 hover:text-purple-600 bg-white rounded-full hover:bg-purple-50 transition-colors tooltip border border-gray-100 shadow-sm" title="Edit Task">
                        <Edit2 size={18} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2.5 text-gray-500 hover:text-rose-600 bg-white rounded-full hover:bg-rose-50 transition-colors tooltip border border-gray-100 shadow-sm" title="Delete Task">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
