
import React from 'react';
import { X, Brain, Activity, Clock, Zap, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface AgentDetailDialogProps {
  agent: {
    id: string;
    name: string;
    icon: string;
    status: string;
    description: string;
    capabilities: string[];
    workflow: string[];
    metrics: {
      totalTasks: number;
      tokensUsed: number;
      avgResponseTime: number;
      successRate: number;
      efficiency: number;
    };
    recentTasks: Array<{
      id: string;
      task: string;
      status: 'completed' | 'running' | 'failed';
      duration: number;
      tokensUsed: number;
      timestamp: string;
    }>;
  } | null;
  open: boolean;
  onClose: () => void;
}

const AgentDetailDialog: React.FC<AgentDetailDialogProps> = ({ agent, open, onClose }) => {
  if (!agent) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'running': return <Activity className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <span className="text-3xl">{agent.icon}</span>
            <div>
              <h2 className="text-xl font-bold">{agent.name}</h2>
              <Badge className={`${getStatusColor(agent.status)} border-0`}>
                {agent.status === 'active' ? '运行中' : agent.status === 'idle' ? '空闲' : '错误'}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              智能体介绍
            </h3>
            <p className="text-gray-700 leading-relaxed">{agent.description}</p>
          </div>

          <Separator />

          {/* 核心能力 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              核心能力
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agent.capabilities.map((capability, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 工作流程 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              工作流程
            </h3>
            <div className="space-y-2">
              {agent.workflow.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 性能指标 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-orange-600" />
              性能指标
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{agent.metrics.totalTasks}</p>
                <p className="text-sm text-gray-600">总任务数</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{(agent.metrics.tokensUsed / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600">Token消耗</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{agent.metrics.avgResponseTime}s</p>
                <p className="text-sm text-gray-600">平均耗时</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{agent.metrics.efficiency}%</p>
                <p className="text-sm text-gray-600">工作效率</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>成功率</span>
                  <span>{agent.metrics.successRate}%</span>
                </div>
                <Progress value={agent.metrics.successRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>效率评分</span>
                  <span>{agent.metrics.efficiency}%</span>
                </div>
                <Progress value={agent.metrics.efficiency} className="h-2" />
              </div>
            </div>
          </div>

          <Separator />

          {/* 最近任务 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              最近任务
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {agent.recentTasks.map((task) => (
                <div key={task.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTaskStatusIcon(task.status)}
                      <span className="font-medium">{task.task}</span>
                    </div>
                    <span className="text-xs text-gray-500">{task.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>耗时: {task.duration}s</span>
                    <span>Tokens: {task.tokensUsed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentDetailDialog;
