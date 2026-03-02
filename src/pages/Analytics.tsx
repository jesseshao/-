import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { TrendingUp, Users, AlertTriangle } from 'lucide-react';

const WEEKLY_DATA = [
  { day: '周一', contacted: 12, collected: 5, completed: 2 },
  { day: '周二', contacted: 15, collected: 8, completed: 3 },
  { day: '周三', contacted: 10, collected: 12, completed: 5 },
  { day: '周四', contacted: 8, collected: 15, completed: 8 },
  { day: '周五', contacted: 5, collected: 10, completed: 12 },
  { day: '周六', contacted: 2, collected: 5, completed: 8 },
  { day: '周日', contacted: 0, collected: 2, completed: 4 },
];

const OPERATOR_PERFORMANCE = [
  { name: '抖音运营', contactRate: 95, collectionRate: 70, completionRate: 45 },
  { name: '美图运营', contactRate: 92, collectionRate: 65, completionRate: 40 },
];

const BLOCKER_TRENDS = [
  { name: '没时间', value: 35 },
  { name: '资料缺失', value: 25 },
  { name: '房东问题', value: 20 },
  { name: '不配合', value: 15 },
  { name: '其他', value: 5 },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">周复盘与数据分析</h1>
        <p className="text-slate-500">管理层绩效指标与阻塞分析。</p>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <TrendingUp size={20} />
                </div>
                <h3 className="font-semibold text-slate-900">转化率 (P1)</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">68%</p>
            <p className="text-sm text-slate-500 mt-1">目标: 14天内达到 80%</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Users size={20} />
                </div>
                <h3 className="font-semibold text-slate-900">运营人效</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">94%</p>
            <p className="text-sm text-slate-500 mt-1">任务完成率</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <AlertTriangle size={20} />
                </div>
                <h3 className="font-semibold text-slate-900">最大阻塞</h3>
            </div>
            <p className="text-xl font-bold text-slate-900">"没时间"</p>
            <p className="text-sm text-slate-500 mt-1">影响了 35% 的阻塞门店</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Progress Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">每日进度趋势 (近7天)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="contacted" name="触达数" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="collected" name="收资数" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" name="办结数" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operator Performance */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">运营人员绩效对比</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OPERATOR_PERFORMANCE} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="contactRate" name="触达率 %" fill="#6366f1" radius={[0, 4, 4, 0]} />
                <Bar dataKey="collectionRate" name="收资率 %" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                <Bar dataKey="completionRate" name="办结率 %" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blocker Analysis */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">阻塞分析与优化建议</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={BLOCKER_TRENDS} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip />
                            <Bar dataKey="value" name="数量" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">建议动作</h4>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                            <span><strong>"没时间" (35%):</strong> 简化表格。在首次通话中立即提供“我们帮您填”的服务。</span>
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                            <span><strong>"资料缺失" (25%):</strong> 制作“营业执照在哪里找”的一图流指南，并通过微信发送。</span>
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                            <span><strong>"房东问题" (20%):</strong> 准备“迁址方案”模板，针对无法获得房东批准的门店。</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
