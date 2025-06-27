
import React, { useState } from 'react';
import { User, Settings, Palette, Target, TrendingUp, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '张小红',
    age: 25,
    occupation: '内容创作者',
    interests: ['美妆', '时尚', '生活方式', '旅行'],
    writingStyle: 'casual',
    tonePreference: [70], // 0-100 scale for formal to casual
    creativityLevel: [80],
    platform: 'xiaohongshu'
  });

  const writingStyles = [
    { value: 'formal', label: '正式商务', description: '专业、严谨的商务写作风格' },
    { value: 'casual', label: '轻松随意', description: '亲切、自然的日常交流风格' },
    { value: 'humorous', label: '幽默风趣', description: '轻松幽默的娱乐化风格' },
    { value: 'academic', label: '学术专业', description: '严谨的学术研究写作风格' },
    { value: 'trendy', label: '潮流时尚', description: '紧跟潮流的年轻化风格' }
  ];

  const platforms = [
    { value: 'xiaohongshu', label: '小红书', icon: '🔴' },
    { value: 'douyin', label: '抖音', icon: '🎵' },
    { value: 'weibo', label: '微博', icon: '🐦' },
    { value: 'wechat', label: '微信公众号', icon: '💬' }
  ];

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "您的个人画像已更新，AI将根据新设置优化内容生成"
    });
  };

  const addInterest = (interest) => {
    if (!profile.interests.includes(interest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">个人画像设置</h1>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  基本信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">年龄</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="occupation">职业</Label>
                  <Input
                    id="occupation"
                    value={profile.occupation}
                    onChange={(e) => setProfile(prev => ({ ...prev, occupation: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Writing Style */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  写作风格偏好
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>主要写作风格</Label>
                  <Select value={profile.writingStyle} onValueChange={(value) => setProfile(prev => ({ ...prev, writingStyle: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {writingStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div>
                            <div className="font-medium">{style.label}</div>
                            <div className="text-sm text-gray-500">{style.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>语调偏好 (正式 ← → 随意)</Label>
                  <div className="mt-2">
                    <Slider
                      value={profile.tonePreference}
                      onValueChange={(value) => setProfile(prev => ({ ...prev, tonePreference: value }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>正式</span>
                      <span>随意</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>创意程度 (保守 ← → 创新)</Label>
                  <div className="mt-2">
                    <Slider
                      value={profile.creativityLevel}
                      onValueChange={(value) => setProfile(prev => ({ ...prev, creativityLevel: value }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>保守</span>
                      <span>创新</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>主要平台</Label>
                  <Select value={profile.platform} onValueChange={(value) => setProfile(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center">
                            <span className="mr-2">{platform.icon}</span>
                            {platform.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  兴趣标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} variant="default" className="cursor-pointer" onClick={() => removeInterest(interest)}>
                        {interest} ×
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <Label>添加新标签</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input placeholder="输入兴趣标签" onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addInterest(e.target.value);
                          e.target.value = '';
                        }
                      }} />
                      <Button variant="outline">添加</Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['科技', '健康', '教育', '娱乐', '体育', '艺术', '音乐', '电影'].map((suggestion) => (
                      <Badge 
                        key={suggestion} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => addInterest(suggestion)}
                      >
                        + {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview & Stats */}
          <div className="space-y-6">
            {/* Profile Preview */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle>画像预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                    {profile.name?.[0] || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{profile.name}</h3>
                    <p className="text-gray-600">{profile.occupation}</p>
                    <p className="text-sm text-gray-500">{profile.age}岁</p>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>语调偏好:</span>
                      <span>{profile.tonePreference[0] > 50 ? '随意' : '正式'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>创意程度:</span>
                      <span>{profile.creativityLevel[0] > 50 ? '创新' : '保守'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Writing Stats */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  写作统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">总文案数</span>
                  <span className="font-bold">168</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">平均质量分</span>
                  <span className="font-bold text-green-600">8.7/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">常用平台</span>
                  <span className="font-bold">小红书</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">风格匹配度</span>
                  <span className="font-bold text-blue-600">92%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
