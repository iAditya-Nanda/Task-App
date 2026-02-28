import React from 'react';
import { LayoutDashboard, CheckSquare, Settings, HelpCircle, LogOut } from 'lucide-react';
import NavItem from './NavItem';

export default function Sidebar({
    openTasksCount,
    handleLogout,
    activeTab,
    setActiveTab
}: {
    openTasksCount: number,
    handleLogout: () => void,
    activeTab: string,
    setActiveTab: (tab: string) => void
}) {
    return (
        <aside className="w-64 bg-theme-bg flex flex-col pt-8 pb-6 px-6 overflow-y-auto no-scrollbar hidden md:flex shrink-0">
            {/* Brand */}
            <div className="flex items-center gap-2 mb-10 pl-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-black">TaskFlow.</h1>
            </div>

            {/* Menu Items */}
            <div className="text-xs font-semibold text-gray-400 mb-4 pl-2 tracking-wider">Menu</div>
            <nav className="flex-1 space-y-1">
                <NavItem
                    icon={<LayoutDashboard size={20} />}
                    label="Dashboard"
                    active={activeTab === 'DASHBOARD'}
                    onClick={() => setActiveTab('DASHBOARD')}
                />
                <NavItem
                    icon={<CheckSquare size={20} />}
                    label="My Tasks"
                    active={activeTab === 'TASKS'}
                    badge={openTasksCount}
                    onClick={() => setActiveTab('TASKS')}
                />
            </nav>

            {/* Bottom Menu */}
            <nav className="space-y-1 mt-auto">
                <NavItem icon={<Settings size={20} />} label="Settings" />
                <NavItem icon={<HelpCircle size={20} />} label="Help & Support" />
                <NavItem icon={<LogOut size={20} />} label="Log Out" onClick={handleLogout} textClass="text-rose-600 group-hover:text-rose-700" bgClass="hover:bg-rose-50" iconClass="text-rose-500 group-hover:text-rose-600" />
            </nav>
        </aside>
    );
}
