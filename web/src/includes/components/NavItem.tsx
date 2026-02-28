import React from 'react';

export default function NavItem({ icon, label, active = false, badge, onClick, textClass, bgClass, iconClass }: any) {
    return (
        <button onClick={onClick} className={`group w-full flex items-center justify-between px-3 py-3 rounded-2xl transition-all duration-200 ${active ? 'bg-theme-sidebarActive text-theme-sidebarActiveText font-bold shadow-[0_4px_12px_rgba(126,34,206,0.06)]' : `${bgClass || 'hover:bg-white'} text-gray-500 font-medium hover:shadow-soft`}`}>
            <div className={`flex items-center gap-3 ${textClass || 'group-hover:text-black transition-colors'}`}>
                <div className={iconClass || (active ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-900 transition-colors')}>
                    {icon}
                </div>
                <span className="text-[14px]">{label}</span>
            </div>
            {badge !== undefined && (
                <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-purple-200 text-purple-800' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                    {badge}
                </div>
            )}
        </button>
    );
}
