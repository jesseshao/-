import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronRight, AlertCircle } from 'lucide-react';
import { MOCK_STORES } from '../data/mockData';
import { Store, PRIORITIES, SOP_STEPS } from '../types';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function StoreList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredStores = MOCK_STORES.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          store.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || store.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || store.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getStatusColor = (status: Store['status']) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Blocked': return 'bg-red-100 text-red-700';
      case 'Dropped': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: Store['status']) => {
    switch (status) {
      case 'Active': return '进行中';
      case 'Completed': return '已完成';
      case 'Blocked': return '阻塞';
      case 'Dropped': return '放弃';
      default: return status;
    }
  };

  const getPriorityColor = (priority: Store['priority']) => {
      switch (priority) {
          case 'P1': return 'text-red-600 bg-red-50 border-red-200';
          case 'P2': return 'text-orange-600 bg-orange-50 border-orange-200';
          case 'P3': return 'text-blue-600 bg-blue-50 border-blue-200';
          default: return 'text-slate-600 bg-slate-50 border-slate-200';
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">门店台账</h1>
          <p className="text-slate-500">管理门店资质恢复状态与进度。</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm">
                新增门店
            </button>
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                导出报表
            </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="搜索门店名称或负责人..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
            <select 
                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
            >
                <option value="All">所有优先级</option>
                <option value="P1">P1 - 高价值 (有回款)</option>
                <option value="P2">P2 - 合作店</option>
                <option value="P3">P3 - 潜力店</option>
                <option value="P4">P4 - 已关 (有基础)</option>
                <option value="P5">P5 - 已关 (无基础)</option>
            </select>
            <select 
                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="All">所有状态</option>
                <option value="Active">进行中</option>
                <option value="Blocked">阻塞</option>
                <option value="Completed">已完成</option>
                <option value="Dropped">已放弃</option>
            </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">门店信息</th>
                <th className="px-6 py-4 font-semibold text-slate-700">优先级</th>
                <th className="px-6 py-4 font-semibold text-slate-700">当前步骤</th>
                <th className="px-6 py-4 font-semibold text-slate-700">状态</th>
                <th className="px-6 py-4 font-semibold text-slate-700">下次跟进</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStores.map((store) => (
                <tr key={store.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{store.name}</div>
                    <div className="text-slate-500 text-xs">{store.ownerName} • {store.platform}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", getPriorityColor(store.priority))}>
                        {store.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-medium">{store.currentStep}</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 rounded-full" 
                                style={{ width: `${(SOP_STEPS.indexOf(store.currentStep) + 1) / 8 * 100}%` }}
                            />
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", getStatusColor(store.status))}>
                      {getStatusLabel(store.status)}
                    </span>
                    {store.status === 'Blocked' && (
                        <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {store.blockerReason}
                        </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {store.nextFollowUpDate || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/stores/${store.id}`} className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <ChevronRight size={20} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStores.length === 0 && (
            <div className="p-8 text-center text-slate-500">
                没有找到符合条件的门店。
            </div>
        )}
      </div>
    </div>
  );
}
