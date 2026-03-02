export type Priority = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

export type SOPStep = 
  | '1. 建档' 
  | '2. 触达' 
  | '3. 诊断' 
  | '4. 收资' 
  | '5. 办证' 
  | '6. 过审' 
  | '7. 上线' 
  | '8. 回填';

export type BlockerType = 
  | 'None'
  | 'No Time' 
  | 'Missing Docs' 
  | 'Landlord Issue' 
  | 'Uncooperative' 
  | 'Closed' 
  | 'Other';

export interface Store {
  id: string;
  name: string;
  ownerName: string;
  priority: Priority;
  currentStep: SOPStep;
  status: 'Active' | 'Blocked' | 'Completed' | 'Dropped';
  blockerReason?: BlockerType;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  platform: 'Douyin' | 'Meitu' | 'Both';
  hasRevenue: boolean;
  hasHistory: boolean;
  notes: string;
}

export interface KPI {
  totalStores: number;
  recoveredCount: number;
  licenseCompletedCount: number;
  docsCollectedCount: number;
  contactedCount: number;
  recoveryRate: number;
}

export const SOP_STEPS: SOPStep[] = [
  '1. 建档',
  '2. 触达',
  '3. 诊断',
  '4. 收资',
  '5. 办证',
  '6. 过审',
  '7. 上线',
  '8. 回填'
];

export const PRIORITIES: Record<Priority, string> = {
  P1: '可跟进+有回款 (72h办证)',
  P2: '可跟进+有合作 (5d收资)',
  P3: '可跟进+无合作 (低频)',
  P4: '已关闭+有基础 (核实重开)',
  P5: '已关闭+无合作 (暂缓)'
};
