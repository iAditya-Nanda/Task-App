import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onSearchEnter }: any) {
    return (
        <header className="flex items-center justify-between px-8 py-6 lg:px-12 lg:py-8">
            <h2 className="text-[22px] font-bold text-black">My Tasks</h2>

            <div className="flex-1 max-w-xl mx-8 hidden sm:block">
                <div className="relative flex items-center">
                    <Search className="absolute left-4 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks or type to create new..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && onSearchEnter) {
                                onSearchEnter(searchQuery);
                            }
                        }}
                        className="w-full bg-[#F9FAFB] border border-gray-100 placeholder-gray-400 text-sm font-medium text-black rounded-full pl-11 pr-16 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#F3E8FF] transition-all"
                    />
                    <div className="absolute right-4 text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                        ⌘ F
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative cursor-pointer hover:text-purple-600 transition-colors">
                    <Bell size={22} className="text-gray-600" />
                    <div className="absolute 0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 p-[2px] cursor-pointer ring-2 ring-white shadow-soft">
                    <div className="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden flex items-center justify-center">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aditya&backgroundColor=f8fafc" alt="Avatar" />
                    </div>
                </div>
            </div>
        </header>
    );
}
