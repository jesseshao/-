import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText,
  Calendar
} from 'lucide-react';
import { MOCK_STORES } from '../data/mockData';
import { SOP_STEPS, PRIORITIES } from '../types';
import { cn } from '../lib/utils';

export default function StoreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = MOCK_STORES.find(s => s.id === id);

  if (!store) {
    return <div className="p-8 text-center">未找到门店</div>;
  }

  const currentStepIndex = SOP_STEPS.indexOf(store.currentStep);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/stores')}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{store.name}</h1>
          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
            <span className="font-medium text-slate-900">{store.ownerName}</span>
            <span>•</span>
            <span>ID: {store.id}</span>
            <span>•</span>
            <span className={cn(
                "px-2 py-0.5 rounded text-xs font-medium border",
                store.priority === 'P1' ? "bg-red-50 text-red-700 border-red-200" : "bg-slate-50 text-slate-700 border-slate-200"
            )}>
                {store.priority}
            </span>
          </div>
        </div>
        <div className="ml-auto flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
                <Phone size={18} />
                电话
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700">
                <MessageSquare size={18} />
                微信
            </button>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-6 uppercase tracking-wider">恢复进度</h3>
        <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
            <div 
                className="absolute top-1/2 left-0 h-1 bg-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(currentStepIndex) / (SOP_STEPS.length - 1) * 100}%` }}
            ></div>
            
            <div className="relative z-10 flex justify-between">
                {SOP_STEPS.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    
                    return (
                        <div key={step} className="flex flex-col items-center gap-2">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors bg-white",
                                isCompleted ? "border-indigo-500 bg-indigo-500 text-white" :
                                isCurrent ? "border-indigo-500 text-indigo-600" :
                                "border-slate-200 text-slate-400"
                            )}>
                                {isCompleted ? <CheckCircle2 size={16} /> : index + 1}
                            </div>
                            <span className={cn(
                                "text-xs font-medium whitespace-nowrap hidden sm:block",
                                isCurrent ? "text-indigo-600" : "text-slate-500"
                            )}>
                                {step.split('. ')[1]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Action Area */}
        <div className="lg:col-span-2 space-y-6">
            {/* Current Step Action */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">当前步骤: {store.currentStep}</h3>
                    <span className="text-sm text-slate-500">开始时间: {store.lastContactDate}</span>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
                    <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                        <FileText size={16} className="text-indigo-500" />
                        SOP 指引
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {store.currentStep === '2. 触达' && "说明下线原因（平台资质规则升级）。强调恢复收益。提供全程代办协助。目标是达成“资料预审”。"}
                        {store.currentStep === '3. 诊断' && "识别具体阻塞：没时间？资料缺失？房东问题？立即对阻塞进行分类。"}
                        {store.currentStep === '4. 收资' && "收集：身份证、地址证明、经营信息。使用清单核对。"}
                        {store.currentStep === '5. 办证' && "向当地主管部门提交申请。跟踪提交ID。"}
                        {/* Add more step specific guidance here */}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">活动记录 / 备注</label>
                        <textarea 
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                            placeholder="记录通话摘要、阻塞详情或下一步计划..."
                        ></textarea>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm">
                            完成步骤并推进
                        </button>
                        <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50">
                            报告阻塞
                        </button>
                    </div>
                </div>
            </div>

            {/* History / Timeline */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">活动历史</h3>
                <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    <div className="relative pl-8">
                        <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-indigo-100 border-2 border-indigo-500"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium text-slate-900">步骤 1: 建立档案</p>
                                <p className="text-sm text-slate-500 mt-1">从总表导入。优先级设为 {store.priority}。</p>
                            </div>
                            <span className="text-xs text-slate-400">10月20日 10:00</span>
                        </div>
                    </div>
                    {/* Mock history items */}
                    {store.lastContactDate && (
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-200 border-2 border-slate-400"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium text-slate-900">尝试联系</p>
                                    <p className="text-sm text-slate-500 mt-1">致电负责人。有意向但忙碌。已预约回访。</p>
                                </div>
                                <span className="text-xs text-slate-400">{store.lastContactDate}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">门店详情</h3>
                <dl className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-50">
                        <dt className="text-slate-500">所属平台</dt>
                        <dd className="font-medium text-slate-900">{store.platform}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-50">
                        <dt className="text-slate-500">是否有回款</dt>
                        <dd className="font-medium text-slate-900">{store.hasRevenue ? '是' : '否'}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-50">
                        <dt className="text-slate-500">历史合作</dt>
                        <dd className="font-medium text-slate-900">{store.hasHistory ? '是' : '否'}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-50">
                        <dt className="text-slate-500">优先级</dt>
                        <dd className="font-medium text-slate-900">{PRIORITIES[store.priority].split(' ')[0]}</dd>
                    </div>
                </dl>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">日程安排</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="text-slate-400 mt-0.5" size={18} />
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">下次跟进</p>
                            <p className="text-sm font-medium text-slate-900">{store.nextFollowUpDate || '未安排'}</p>
                        </div>
                    </div>
                    
                    {store.status === 'Blocked' && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                            <div className="flex items-center gap-2 text-red-700 font-medium mb-1">
                                <AlertCircle size={16} />
                                阻塞原因: {store.blockerReason}
                            </div>
                            <p className="text-xs text-red-600">
                                建议: 查看“SOP与话术”中关于 {store.blockerReason} 的异议处理。
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
