import React, { useState, useEffect } from 'react';
import { Send, Copy, Edit3, Save, Trash2, Plus, Brain, TrendingUp, FileText, Users, MessageSquare, Loader, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import AgentDetailDialog from '@/components/AgentDetailDialog';
import ContentEditCanvas from '@/components/ContentEditCanvas';

const Workspace = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContents, setGeneratedContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [showEditCanvas, setShowEditCanvas] = useState(false);
  const [agentStats, setAgentStats] = useState({
    contentAgent: { tokens: 1234, time: 2.3, status: 'active' },
    hotspotAgent: { tokens: 890, time: 1.8, status: 'active' },
    optimizeAgent: { tokens: 567, time: 1.2, status: 'idle' },
    researchAgent: { tokens: 234, time: 0.8, status: 'active' },
    profileAgent: { tokens: 445, time: 1.5, status: 'active' },
    qualityAgent: { tokens: 678, time: 2.1, status: 'active' }
  });

  const agents = [
    {
      id: 'content',
      name: '内容生成智能体',
      icon: '✍️',
      color: 'bg-blue-500',
      description: '专门负责根据用户画像和热点分析生成高质量的文案内容，能够适应不同平台的写作风格和要求。',
      capabilities: [
        '多平台文案生成',
        '情感化表达优化',
        '品牌语调适配',
        '创意标题制作',
        '产品描述撰写',
        '故事化内容创作'
      ],
      workflow: [
        '分析用户画像和目标受众',
        '结合热点话题和趋势',
        '生成初版文案内容',
        '根据平台特点调整风格',
        '优化语言表达和结构',
        '输出最终文案作品'
      ],
      metrics: {
        totalTasks: 245,
        tokensUsed: 45672,
        avgResponseTime: 2.3,
        successRate: 97.8,
        efficiency: 89
      },
      recentTasks: [
        {
          id: '1',
          task: '生成小红书美妆种草文案',
          status: 'completed',
          duration: 2.1,
          tokensUsed: 234,
          timestamp: '2分钟前'
        },
        {
          id: '2',
          task: '创作品牌故事文案',
          status: 'completed',
          duration: 3.5,
          tokensUsed: 445,
          timestamp: '5分钟前'
        }
      ]
    },
    {
      id: 'hotspot',
      name: '热点分析智能体',
      icon: '🔥',
      color: 'bg-red-500',
      description: '实时监控各大社交平台的热点话题，分析趋势走向，为内容创作提供时效性强的素材和灵感。',
      capabilities: [
        '实时热点监控',
        '趋势分析预测',
        '话题热度评估',
        '受众情感分析',
        '竞品内容跟踪',
        '病毒传播预测'
      ],
      workflow: [
        '扫描各大平台热搜榜',
        '收集相关话题数据',
        '分析热点传播趋势',
        '评估话题影响力',
        '生成热点报告',
        '推荐创作角度'
      ],
      metrics: {
        totalTasks: 189,
        tokensUsed: 32456,
        avgResponseTime: 1.8,
        successRate: 95.6,
        efficiency: 92
      },
      recentTasks: [
        {
          id: '3',
          task: '分析#秋季穿搭#话题热度',
          status: 'running',
          duration: 0,
          tokensUsed: 0,
          timestamp: '正在进行'
        }
      ]
    },
    {
      id: 'optimize',
      name: '文案优化智能体',
      icon: '✨',
      color: 'bg-purple-500',
      description: '对生成的文案进行优化，提升吸引力和转化率',
      capabilities: [
        '关键词优化',
        '情感色彩增强',
        '结构调整',
        '润色',
        'Call to Action优化'
      ],
      workflow: [
        '分析文案',
        '提取关键词',
        '优化情感色彩',
        '调整结构',
        '润色'
      ],
      metrics: {
        totalTasks: 167,
        tokensUsed: 28934,
        avgResponseTime: 1.5,
        successRate: 98.2,
        efficiency: 94
      },
      recentTasks: [
        {
          id: '4',
          task: '优化标题吸引力',
          status: 'completed',
          duration: 1.2,
          tokensUsed: 123,
          timestamp: '10分钟前'
        }
      ]
    },
    {
      id: 'research',
      name: '学术研究智能体',
      icon: '📚',
      color: 'bg-green-500',
      description: '深度研究学术文献，生成专业报告和分析',
      capabilities: [
        '文献检索',
        '数据分析',
        '报告生成'
      ],
      workflow: [
        '检索文献',
        '分析数据',
        '生成报告'
      ],
      metrics: {
        totalTasks: 89,
        tokensUsed: 67823,
        avgResponseTime: 4.2,
        successRate: 96.7,
        efficiency: 78
      },
      recentTasks: [
        {
          id: '5',
          task: '撰写市场分析报告',
          status: 'in_progress',
          duration: 2.5,
          tokensUsed: 567,
          timestamp: '5分钟前'
        }
      ]
    },
    {
      id: 'profile',
      name: '用户画像智能体',
      icon: '👤',
      color: 'bg-yellow-500',
      description: '分析用户行为和偏好，个性化内容生成策略',
      capabilities: [
        '用户行为分析',
        '偏好分析',
        '内容生成策略'
      ],
      workflow: [
        '分析用户行为',
        '分析偏好',
        '生成内容策略'
      ],
      metrics: {
        totalTasks: 134,
        tokensUsed: 23567,
        avgResponseTime: 1.2,
        successRate: 99.1,
        efficiency: 96
      },
      recentTasks: [
        {
          id: '6',
          task: '更新用户兴趣标签',
          status: 'completed',
          duration: 0.8,
          tokensUsed: 89,
          timestamp: '3分钟前'
        }
      ]
    },
    {
      id: 'quality',
      name: '质量评估智能体',
      icon: '🎯',
      color: 'bg-indigo-500',
      description: '评估内容质量，提供改进建议和评分',
      capabilities: [
        '内容质量评估',
        '改进建议',
        '内容评分'
      ],
      workflow: [
        '评估内容质量',
        '提供改进建议',
        '内容评分'
      ],
      metrics: {
        totalTasks: 198,
        tokensUsed: 34521,
        avgResponseTime: 1.9,
        successRate: 97.4,
        efficiency: 91
      },
      recentTasks: [
        {
          id: '7',
          task: '评估文案质量得分',
          status: 'completed',
          duration: 1.5,
          tokensUsed: 156,
          timestamp: '2分钟前'
        }
      ]
    }
  ];

  const sampleContents = [
    {
      id: 1,
      title: '小红书爆款标题',
      content: '🔥惊了！这个护肤秘诀让我皮肤嫩到发光！✨\n\n姐妹们，今天要分享一个让我皮肤状态逆天改命的护肤心得！真的不是夸张，用了一个月，同事都问我是不是去做了什么医美项目...',
      platform: '小红书',
      status: '已完成'
    },
    {
      id: 2,
      title: '抖音带货文案',
      content: '💥震撼价格！原价299的爆款面膜，今天只要99！\n\n⚡限时3小时，抢完就没了！\n这款面膜真的是我用过最好用的，补水效果绝了...',
      platform: '抖音',
      status: '生成中'
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsGenerating(true);

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: '正在分析您的需求，调用多个智能体协作生成内容...',
        sender: 'ai',
        timestamp: new Date(),
        agents: ['content', 'hotspot', 'optimize']
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // 模拟内容生成
      setTimeout(() => {
        const newContent = {
          id: Date.now(),
          title: '根据热点生成的小红书文案',
          content: '🌟今日热搜话题：AI写作助手火爆全网！\n\n作为一个深度体验用户，我必须来分享一下这个神器！\n真的太好用了，几分钟就能生成高质量文案...',
          platform: '小红书',
          status: '已完成'
        };
        setGeneratedContents(prev => [...prev, newContent]);
        setIsGenerating(false);
        toast({
          title: "内容生成完成",
          description: "新的文案已添加到内容列表中"
        });
      }, 3000);
    }, 1000);
  };

  const copyContent = (content) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "复制成功",
      description: "内容已复制到剪贴板"
    });
  };

  const handleAgentClick = (agentId) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setSelectedAgent(agent);
      setShowAgentDialog(true);
    }
  };

  const handleContentEdit = (content) => {
    setSelectedContent(content);
    setShowEditCanvas(true);
  };

  const handleContentSave = (updatedContent) => {
    // 更新内容列表
    const updatedSample = sampleContents.map(item =>
      item.id === updatedContent.id ? updatedContent : item
    );
    const updatedGenerated = generatedContents.map(item =>
      item.id === updatedContent.id ? updatedContent : item
    );
    setGeneratedContents(updatedGenerated);
    setShowEditCanvas(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">AI写作工作台</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                保存项目
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                新建内容
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Left Panel - Content Output Area */}
          <div className="col-span-7 space-y-4">
            {/* Generated Contents */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>生成内容</span>
                  <Badge variant="secondary">{generatedContents.length + sampleContents.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="grid gap-4">
                  {[...sampleContents, ...generatedContents].map((content) => (
                    <div 
                      key={content.id} 
                      className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md cursor-pointer bg-white"
                      onClick={() => setSelectedContent(content)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900 text-lg">{content.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={content.status === '已完成' ? 'default' : 'secondary'}>
                            {content.status}
                          </Badge>
                          <Badge variant="outline">{content.platform}</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">{content.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">平台: {content.platform}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" onClick={(e) => {
                            e.stopPropagation();
                            copyContent(content.content);
                          }}>
                            <Copy className="w-4 h-4 mr-1" />
                            复制
                          </Button>
                          <Button size="sm" variant="ghost" onClick={(e) => {
                            e.stopPropagation();
                            handleContentEdit(content);
                          }}>
                            <Edit3 className="w-4 h-4 mr-1" />
                            编辑
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Chat & Agent Monitoring */}
          <div className="col-span-5 space-y-4">
            {/* Chat Interface */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 h-3/5 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>AI助手对话</span>
                  <div className="flex items-center space-x-2">
                    {isGenerating && <Loader className="w-4 h-4 animate-spin" />}
                    <Badge variant={isGenerating ? 'default' : 'secondary'}>
                      {isGenerating ? '生成中' : '就绪'}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-3 bg-gray-50/50 rounded-xl">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <Brain className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                      <p>开始与AI助手对话，创造精彩内容</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-3 py-2 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          {message.agents && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {message.agents.map((agentId) => {
                                const agent = agents.find(a => a.id === agentId);
                                return (
                                  <Badge key={agentId} variant="outline" className="text-xs">
                                    {agent?.icon} {agent?.name}
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Loader className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-gray-600">智能体正在协作生成内容...</span>
                        </div>
                        <Progress value={60} className="w-full mt-2 h-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="输入您的写作需求..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim() || isGenerating}
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Agent Monitoring */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 h-2/5">
              <CardHeader>
                <CardTitle>智能体监控</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 overflow-y-auto">
                {agents.map((agent) => {
                  const stats = agentStats[agent.id.replace('content', 'contentAgent').replace('hotspot', 'hotspotAgent').replace('optimize', 'optimizeAgent').replace('research', 'researchAgent').replace('profile', 'profileAgent').replace('quality', 'qualityAgent')];
                  return (
                    <div 
                      key={agent.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleAgentClick(agent.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${agent.color} ${stats?.status === 'active' ? 'animate-pulse' : ''}`}></div>
                        <span className="text-sm font-medium">{agent.name}</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-xs text-gray-600">
                        {stats?.tokens || 0} tokens • {stats?.time || 0}s
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Agent Detail Dialog */}
      <AgentDetailDialog
        agent={selectedAgent}
        open={showAgentDialog}
        onClose={() => setShowAgentDialog(false)}
      />

      {/* Content Edit Canvas */}
      <ContentEditCanvas
        content={selectedContent}
        open={showEditCanvas}
        onClose={() => setShowEditCanvas(false)}
        onSave={handleContentSave}
      />
    </div>
  );
};

export default Workspace;
