
import React, { useState } from 'react';
import { Search, Plus, TrendingUp, Users, BookOpen, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    { id: 1, title: '小红书爆款文案合集', type: '社交媒体', status: '进行中', createdAt: '2024-01-15' },
    { id: 2, title: '品牌营销策略分析', type: '营销文案', status: '已完成', createdAt: '2024-01-10' },
    { id: 3, title: '学术论文写作助手', type: '学术写作', status: '草稿', createdAt: '2024-01-12' }
  ];

  const agents = [
    { name: '内容生成智能体', icon: '✍️', status: 'active', tasks: 45 },
    { name: '热点分析智能体', icon: '🔥', status: 'active', tasks: 23 },
    { name: '文案优化智能体', icon: '✨', status: 'active', tasks: 38 },
    { name: '学术研究智能体', icon: '📚', status: 'idle', tasks: 12 },
    { name: '用户画像智能体', icon: '👤', status: 'active', tasks: 19 },
    { name: '质量评估智能体', icon: '🎯', status: 'active', tasks: 31 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI写作助手
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/profile')}>
                <Users className="w-4 h-4 mr-2" />
                个人中心
              </Button>
              <Button onClick={() => navigate('/workspace')}>
                <Plus className="w-4 h-4 mr-2" />
                新建项目
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            AI驱动的<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">智能写作平台</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            基于多智能体协作的AI写作助手，帮你创造爆款文案、学术报告和各类内容
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="输入关键词开始创作..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-500 transition-colors"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl"
                onClick={() => navigate('/workspace')}
              >
                开始创作
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">活跃项目</p>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">生成文案</p>
                  <p className="text-3xl font-bold text-blue-600">168</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">智能体活跃</p>
                  <p className="text-3xl font-bold text-green-600">5/6</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">本月Token</p>
                  <p className="text-3xl font-bold text-orange-600">2.4K</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects and Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>我的项目</span>
                <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>
                  查看全部
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                       onClick={() => navigate(`/workspace/${project.id}`)}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <Badge variant={project.status === '进行中' ? 'default' : project.status === '已完成' ? 'secondary' : 'outline'}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{project.type}</span>
                      <span>{project.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Agents Status */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>智能体状态</span>
                <Button variant="outline" size="sm" onClick={() => navigate('/agents')}>
                  管理智能体
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.map((agent, index) => (
                  <div key={index} className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{agent.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-600">已完成 {agent.tasks} 个任务</p>
                        </div>
                      </div>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status === 'active' ? '运行中' : '空闲'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
