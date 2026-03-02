import React from 'react';
import { BookOpen, MessageCircle, ShieldAlert } from 'lucide-react';

export default function Resources() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SOP 与话术库</h1>
        <p className="text-slate-500">标准作业程序与沟通话术。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scripts Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-indigo-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <MessageCircle size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">话术方法论</h2>
            </div>
            <p className="text-sm text-slate-600">常见场景的标准应答。</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">标准开场</h3>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-700 italic">
                “您好，我是XX平台运营。您门店因平台资质规则升级需要补营业执照。我们可全程协助办理，完成后可恢复抖音和美图上线，减少订单损失。今天先帮您做资料预审，可以吗？”
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">异议处理</h3>
              <ul className="space-y-3">
                <li className="text-sm">
                  <span className="font-medium text-slate-900 block mb-1">“太麻烦”</span>
                  <span className="text-slate-600">我们按清单代办流程，您只需提供必要资料。</span>
                </li>
                <li className="text-sm">
                  <span className="font-medium text-slate-900 block mb-1">“没时间”</span>
                  <span className="text-slate-600">先发资料，能代填的我们先代填。</span>
                </li>
                <li className="text-sm">
                  <span className="font-medium text-slate-900 block mb-1">“成本高”</span>
                  <span className="text-slate-600">先恢复上线，通常可覆盖办证成本。</span>
                </li>
                <li className="text-sm">
                  <span className="font-medium text-slate-900 block mb-1">“再等等”</span>
                  <span className="text-slate-600">不补证会持续下线，越晚恢复损失越大。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SOP Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-emerald-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <BookOpen size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">单店标准 SOP</h2>
            </div>
            <p className="text-sm text-slate-600">8步恢复流程</p>
          </div>
          <div className="p-0">
            <ol className="divide-y divide-slate-100">
              {[
                { step: '1. 建档', desc: '确认门店ID、负责人、历史合作、回款、当前状态。' },
                { step: '2. 触达', desc: '说明下线原因、政策变化、恢复收益、办理时限。' },
                { step: '3. 诊断', desc: '识别阻塞类型（没时间/资料缺失/房东问题/不配合等）。' },
                { step: '4. 收资', desc: '按清单收齐身份证、地址证明、经营信息等。' },
                { step: '5. 办证', desc: '提交办理，跟踪节点与时效。' },
                { step: '6. 过审', desc: '拿证后提交平台资质审核。' },
                { step: '7. 上线', desc: '抖音+美图同步恢复上线。' },
                { step: '8. 回填', desc: '更新台账状态、日期、阻塞、下一步动作。' },
              ].map((item) => (
                <li key={item.step} className="p-4 flex gap-4 hover:bg-slate-50">
                  <span className="font-mono font-bold text-slate-400 text-sm">{item.step.split('.')[0]}</span>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{item.step.split('. ')[1]}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden md:col-span-2">
          <div className="p-6 border-b border-slate-200 bg-amber-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <ShieldAlert size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">风险与应对</h2>
            </div>
            <p className="text-sm text-slate-600">常见阻塞与处理方案。</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <h4 className="font-medium text-slate-900">房东不同意/地址证明缺失</h4>
                <p className="text-sm text-slate-600">提供替代材料路径，必要时转迁址方案。</p>
             </div>
             <div className="space-y-2">
                <h4 className="font-medium text-slate-900">身份证或法人信息迟迟不交</h4>
                <p className="text-sm text-slate-600">设置“48小时资料时限+二次催办”机制。</p>
             </div>
             <div className="space-y-2">
                <h4 className="font-medium text-slate-900">老板不配合</h4>
                <p className="text-sm text-slate-600">切换决策人或历史合作联系人，必要时升级负责人介入。</p>
             </div>
             <div className="space-y-2">
                <h4 className="font-medium text-slate-900">门店已关闭</h4>
                <p className="text-sm text-slate-600">先判断是否有重开计划，无重开则降级维护。</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
