import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ListTodo, FileText, BarChart3, Settings, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: '工作台' },
    { to: '/stores', icon: ListTodo, label: '门店台账' },
    { to: '/resources', icon: FileText, label: 'SOP与话术' },
    { to: '/analytics', icon: BarChart3, label: '数据复盘' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className={cn("flex items-center gap-2 font-bold text-xl", !isSidebarOpen && "lg:hidden")}>
            <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              SC
            </div>
            <span className="whitespace-nowrap">皮肤云·恢复专项</span>
          </div>
          {/* Logo icon only when collapsed */}
           <div className={cn("hidden h-8 w-8 rounded-lg bg-indigo-500 items-center justify-center mx-auto", !isSidebarOpen && "lg:flex")}>
              SC
            </div>
          
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8 px-2 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  !isSidebarOpen && "lg:justify-center"
                )
              }
            >
              <item.icon size={20} />
              <span className={cn(!isSidebarOpen && "lg:hidden")}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className={cn("bg-slate-800 rounded-xl p-3", !isSidebarOpen && "hidden")}>
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">当前角色</p>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold">
                        YOU
                    </div>
                    <div>
                        <p className="text-sm font-medium">项目负责人</p>
                        <p className="text-xs text-slate-500">管理员权限</p>
                    </div>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-600"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
                <p className="font-medium text-slate-900">今日重点</p>
                <p className="text-slate-500">D3：集中推进资料收齐</p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">v1.0</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
