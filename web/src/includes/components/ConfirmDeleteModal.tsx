import React from 'react';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, isDeleting }: any) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 transform transition-all text-center">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-6">
                    <span className="text-rose-500 text-2xl font-bold">!</span>
                </div>
                <h2 className="text-2xl font-extrabold text-black mb-2 tracking-tight">Delete Task?</h2>
                <p className="text-sm font-medium text-gray-500 mb-8">This action cannot be undone. Are you sure you want to permanently delete this task?</p>

                <div className="flex gap-4">
                    <button type="button" onClick={onClose} disabled={isDeleting} className="flex-1 py-3.5 bg-gray-50 text-gray-600 font-bold rounded-full hover:bg-gray-100 transition-colors">
                        Cancel
                    </button>
                    <button type="button" onClick={onConfirm} disabled={isDeleting} className="flex-1 py-3.5 bg-rose-600 text-white font-bold rounded-full shadow-lg hover:bg-rose-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
