
import React, { useState } from 'react';
import { Activity, Brain, Clock, Cpu, BarChart3, Settings, Play, Pause, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Agents = () => {
  const [agents, setAgents] = useState([
    {
      id: 'content-generator',
      name: '内容生成智能体',
      icon: '✍️',
      status: 'active',
      description: '基于用户画像和热点分析生成高质量文案内容',
      metrics: {
        totalTasks: 245,
        tokensUsed: 45672,
        avgResponseTime: 2.3,
        successRate: 97.8,
        efficiency: 89
      },
      recentActivity: [
        { time: '2分钟前', task: '生成小红书美妆文案', status: 'completed' },
        { time: '5分钟前', task: '优化品牌宣传文案', status: 'completed' },
        { time: '8分钟前', task: '创建产品描述', status: 'completed' }
      ]
    },
    {
      id: 'hotspot-analyzer',
      name: '热点分析智能体',
      icon: '🔥',
      status: 'active',
      description: '实时监控和分析网络热点，为内容创作提供灵感',
      metrics: {
        totalTasks: 189,
        tokensUsed: 32456,
        avgResponseTime: 1.8,
        successRate: 95.6,
        efficiency: 92
      },
      recentActivity: [
        { time: '1分钟前', task: '分析微博热搜榜', status: 'completed' },
        { time: '3分钟前', task: '抓取小红书热门话题', status: 'completed' },
        { time: '6分钟前', task: '监控抖音流行趋势', status: 'in_progress' }
      ]
    },
    {
      id: 'content-optimizer',
      name: '文案优化智能体',
      icon: '✨',
      status: 'idle',
      description: '对生成的文案进行优化，提升吸引力和转化率',
      metrics: {
        totalTasks: 167,
        tokensUsed: 28934,
        avgResponseTime: 1.5,
        successRate: 98.2,
        efficiency: 94
      },
      recentActivity: [
        { time: '10分钟前', task: '优化标题吸引力', status: 'completed' },
        { time: '15分钟前', task: '调整文案语调', status: 'completed' },
        { time: '20分钟前', task: '增强Call-to-Action', status: 'completed' }
      ]
    },
    {
      id: 'research-agent',
      name: '学术研究智能体',
      icon: '📚',
      status: 'active',
      description: '深度研究学术文献，生成专业报告和分析',
      metrics: {
        totalTasks: 89,
        tokensUsed: 67823,
        avgResponseTime: 4.2,
        successRate: 96.7,
        efficiency: 78
      },
      recentActivity: [
        { time: '5分钟前', task: '撰写市场分析报告', status: 'in_progress' },
        { time: '30分钟前', task: '整理学术文献引用', status: 'completed' },
        { time: '1小时前', task: '生成研究摘要', status: 'completed' }
      ]
    },
    {
      id: 'profile-analyzer',
      name: '用户画像智能体',
      icon: '👤',
      status: 'active',
      description: '分析用户行为和偏好，个性化内容生成策略',
      metrics: {
        totalTasks: 134,
        tokensUsed: 23567,
        avgResponseTime: 1.2,
        successRate: 99.1,
        efficiency: 96
      },
      recentActivity: [
        { time: '3分钟前', task: '更新用户兴趣标签', status: 'completed' },
        { time: '12分钟前', task: '分析写作风格偏好', status: 'completed' },
        { time: '25分钟前', task: '计算个性化权重', status: 'completed' }
      ]
    },
    {
      id: 'quality-evaluator',
      name: '质量评估智能体',
      icon: '🎯',
      status: 'active',
      description: '评估内容质量，提供改进建议和评分',
      metrics: {
        totalTasks: 198,
        tokensUsed: 34521,
        avgResponseTime: 1.9,
        successRate: 97.4,
        efficiency: 91
      },
      recentActivity: [
        { time: '2分钟前', task: '评估文案质量得分', status: 'completed' },
        { time: '7分钟前', task: '检查内容原创性', status: 'completed' },
        { time: '14分钟前', task: '分析受众匹配度', status: 'completed' }
      ]
    }
  ]);

  const toggleAgentStatus = (agentId) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'idle' : 'active' }
        : agent
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return '运行中';
      case 'idle': return '空闲';
      case 'error': return '错误';
      default: return '未知';
    }
  };

  const totalTokens = agents.reduce((sum, agent) => sum + agent.metrics.tokensUsed, 0);
  const totalTasks = agents.reduce((sum, agent) => sum + agent.metrics.totalTasks, 0);
  const avgEfficiency = agents.reduce((sum, agent) => sum + agent.metrics.efficiency, 0) / agents.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">智能体管理中心</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新状态
              </Button>
              <Button size="sm">
                <Settings className="w-4 h-4 mr-2" />
                全局设置
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">活跃智能体</p>
                  <p className="text-3xl font-bold text-green-600">
                    {agents.filter(a => a.status === 'active').length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总任务数</p>
                  <p className="text-3xl font-bold text-blue-600">{totalTasks}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Token消耗</p>
                  <p className="text-3xl font-bold text-purple-600">{(totalTokens / 1000).toFixed(1)}K</p>
                </div>
                <Cpu className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">平均效率</p>
                  <p className="text-3xl font-bold text-orange-600">{avgEfficiency.toFixed(0)}%</p>
                </div>
                <Brain className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{agent.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-gray-600">{agent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} ${agent.status === 'active' ? 'animate-pulse' : ''}`}></div>
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {getStatusText(agent.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="metrics" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metrics">性能指标</TabsTrigger>
                    <TabsTrigger value="activity">最近活动</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="metrics" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{agent.metrics.totalTasks}</p>
                        <p className="text-sm text-gray-600">总任务数</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{(agent.metrics.tokensUsed / 1000).toFixed(1)}K</p>
                        <p className="text-sm text-gray-600">Token消耗</p>
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
                          <span>效率</span>
                          <span>{agent.metrics.efficiency}%</span>
                        </div>
                        <Progress value={agent.metrics.efficiency} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>平均响应时间</span>
                        <span>{agent.metrics.avgResponseTime}s</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-3 mt-4">
                    {agent.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium">{activity.task}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                          {activity.status === 'completed' ? '已完成' : '进行中'}
                        </Badge>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleAgentStatus(agent.id)}
                  >
                    {agent.status === 'active' ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        暂停
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        启动
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    配置
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agents;
