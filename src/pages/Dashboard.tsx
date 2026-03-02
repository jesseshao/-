import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AlertCircle, CheckCircle2, Clock, FileCheck, TrendingUp } from 'lucide-react';
import { MOCK_STORES } from '../data/mockData';
import { Store } from '../types';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#94a3b8'];

export default function Dashboard() {
  const stores = MOCK_STORES;
  
  // KPI Calculations
  const totalStores = stores.length;
  const recovered = stores.filter(s => s.status === 'Completed').length;
  const inProgress = stores.filter(s => s.status === 'Active').length;
  const blocked = stores.filter(s => s.status === 'Blocked').length;
  const p1Count = stores.filter(s => s.priority === 'P1').length;
  const p1Recovered = stores.filter(s => s.priority === 'P1' && s.status === 'Completed').length;

  const statusData = [
    { name: '进行中', value: inProgress },
    { name: '已完成', value: recovered },
    { name: '阻塞中', value: blocked },
    { name: '已放弃', value: stores.filter(s => s.status === 'Dropped').length },
  ];

  const priorityData = [
    { name: 'P1', total: stores.filter(s => s.priority === 'P1').length, completed: stores.filter(s => s.priority === 'P1' && s.status === 'Completed').length },
    { name: 'P2', total: stores.filter(s => s.priority === 'P2').length, completed: stores.filter(s => s.priority === 'P2' && s.status === 'Completed').length },
    { name: 'P3', total: stores.filter(s => s.priority === 'P3').length, completed: stores.filter(s => s.priority === 'P3' && s.status === 'Completed').length },
    { name: 'P4', total: stores.filter(s => s.priority === 'P4').length, completed: stores.filter(s => s.priority === 'P4' && s.status === 'Completed').length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">工作台</h1>
        <p className="text-slate-500">资质恢复进度总览</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">恢复上线率</h3>
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{Math.round((recovered / totalStores) * 100)}%</span>
            <span className="text-sm text-slate-500">{recovered}/{totalStores} 家门店</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">P1 重点门店进度</h3>
            <AlertCircle className="text-indigo-500" size={20} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{Math.round((p1Recovered / p1Count) * 100)}%</span>
            <span className="text-sm text-slate-500">{p1Recovered}/{p1Count} 已完成</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">当前阻塞</h3>
            <Clock className="text-amber-500" size={20} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{blocked}</span>
            <span className="text-sm text-slate-500">家门店卡顿</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">资料已收齐</h3>
            <FileCheck className="text-blue-500" size={20} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
                {stores.filter(s => ['5. 办证', '6. 过审', '7. 上线', '8. 回填'].includes(s.currentStep)).length}
            </span>
            <span className="text-sm text-slate-500">待办理/办理中</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">门店状态分布</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
              {statusData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-sm text-slate-600">{entry.name} ({entry.value})</span>
                  </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">分层级进度</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" name="已完成" stackId="a" fill="#10b981" />
                <Bar dataKey="total" name="门店总数" stackId="b" fill="#e2e8f0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Daily Focus / Todo */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">今日待办 (Action Items)</h3>
              <span className="text-sm text-slate-500">基于14天推进计划</span>
          </div>
          <div className="p-0">
              <ul className="divide-y divide-slate-100">
                  <li className="p-4 hover:bg-slate-50 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                          <AlertCircle size={20} />
                      </div>
                      <div className="flex-1">
                          <p className="font-medium text-slate-900">跟进 P1 门店 (72h 时限)</p>
                          <p className="text-sm text-slate-500">3 家门店即将到达 72小时 资料收集截止时间。</p>
                      </div>
                      <button className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                          查看列表
                      </button>
                  </li>
                  <li className="p-4 hover:bg-slate-50 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <Clock size={20} />
                      </div>
                      <div className="flex-1">
                          <p className="font-medium text-slate-900">解决阻塞 (Blockers)</p>
                          <p className="text-sm text-slate-500">处理 2 家状态为“资料缺失”的门店。</p>
                      </div>
                      <button className="px-3 py-1 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100">
                          查看列表
                      </button>
                  </li>
                  <li className="p-4 hover:bg-slate-50 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={20} />
                      </div>
                      <div className="flex-1">
                          <p className="font-medium text-slate-900">每日进度汇报</p>
                          <p className="text-sm text-slate-500">请在 14:00 前提交今日进度中报。</p>
                      </div>
                      <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                          标记完成
                      </button>
                  </li>
              </ul>
          </div>
      </div>
    </div>
  );
}
