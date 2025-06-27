
import React, { useState, useEffect } from 'react';
import { Send, Copy, Edit3, Save, Trash2, Plus, Brain, TrendingUp, FileText, Users, MessageSquare, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

const Workspace = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContents, setGeneratedContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [agentStats, setAgentStats] = useState({
    contentAgent: { tokens: 1234, time: 2.3, status: 'active' },
    hotspotAgent: { tokens: 890, time: 1.8, status: 'active' },
    optimizeAgent: { tokens: 567, time: 1.2, status: 'idle' },
    researchAgent: { tokens: 234, time: 0.8, status: 'active' },
    profileAgent: { tokens: 445, time: 1.5, status: 'active' },
    qualityAgent: { tokens: 678, time: 2.1, status: 'active' }
  });

  const agents = [
    { id: 'content', name: '内容生成智能体', icon: '✍️', color: 'bg-blue-500' },
    { id: 'hotspot', name: '热点分析智能体', icon: '🔥', color: 'bg-red-500' },
    { id: 'optimize', name: '文案优化智能体', icon: '✨', color: 'bg-purple-500' },
    { id: 'research', name: '学术研究智能体', icon: '📚', color: 'bg-green-500' },
    { id: 'profile', name: '用户画像智能体', icon: '👤', color: 'bg-yellow-500' },
    { id: 'quality', name: '质量评估智能体', icon: '🎯', color: 'bg-indigo-500' }
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
          {/* Left Panel - Generated Contents */}
          <div className="col-span-4 space-y-4">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>生成内容</span>
                  <Badge variant="secondary">{generatedContents.length + sampleContents.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {[...sampleContents, ...generatedContents].map((content) => (
                  <div 
                    key={content.id} 
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => setSelectedContent(content)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{content.title}</h3>
                      <Badge variant={content.status === '已完成' ? 'default' : 'secondary'}>
                        {content.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{content.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">{content.platform}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" onClick={(e) => {
                          e.stopPropagation();
                          copyContent(content.content);
                        }}>
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Agent Stats */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle>智能体监控</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => {
                  const stats = agentStats[agent.id.replace('content', 'contentAgent').replace('hotspot', 'hotspotAgent').replace('optimize', 'optimizeAgent').replace('research', 'researchAgent').replace('profile', 'profileAgent').replace('quality', 'qualityAgent')];
                  return (
                    <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${agent.color} ${stats?.status === 'active' ? 'animate-pulse' : ''}`}></div>
                        <span className="text-sm font-medium">{agent.name}</span>
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

          {/* Right Panel - Chat Interface */}
          <div className="col-span-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 h-full flex flex-col">
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
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50/50 rounded-xl">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>开始与AI助手对话，创造精彩内容</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
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
                      <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
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
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
