
import React, { useState } from 'react';
import { User, Edit, Save, Camera, Brain, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '张小明',
    email: 'zhangming@example.com',
    avatar: '/placeholder.svg',
    bio: '专注于数字营销和内容创作的自媒体人',
    writingStyle: '活泼生动',
    targetAudience: '18-35岁都市女性',
    interests: ['美妆', '时尚', '生活方式', '旅行'],
    tone: '轻松幽默',
    specialty: '小红书种草文案'
  });

  const [stats] = useState({
    totalContent: 245,
    totalWords: 156780,
    avgEngagement: 8.9,
    bestPerforming: '夏日防晒指南'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // 这里可以添加保存到后端的逻辑
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">个人资料</h1>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  编辑资料
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：个人信息 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 头像和基本信息 */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader className="text-center">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <img 
                    src={profile.avatar} 
                    alt="头像" 
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700">
                      <Camera className="w-4 h-4" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                    </label>
                  )}
                </div>
                
                <CardTitle>
                  {isEditing ? (
                    <Input 
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-center"
                    />
                  ) : (
                    profile.name
                  )}
                </CardTitle>
                
                <p className="text-gray-600">
                  {isEditing ? (
                    <Input 
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="text-center"
                    />
                  ) : (
                    profile.email
                  )}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">个人简介</label>
                    {isEditing ? (
                      <Textarea 
                        value={profile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-600 mt-1">{profile.bio}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">兴趣标签</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 数据统计 */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  创作统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{stats.totalContent}</p>
                    <p className="text-sm text-gray-600">总文案数</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-600">{(stats.totalWords / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-gray-600">总字数</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>平均互动率</span>
                    <span>{stats.avgEngagement}%</span>
                  </div>
                  <Progress value={stats.avgEngagement * 10} className="h-2" />
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">最佳表现文案</p>
                  <p className="font-medium text-gray-900">{stats.bestPerforming}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：写作偏好设置 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  写作偏好设置
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 写作风格 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">写作风格</label>
                    {isEditing ? (
                      <Input 
                        value={profile.writingStyle}
                        onChange={(e) => handleInputChange('writingStyle', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-purple-700 font-medium">{profile.writingStyle}</p>
                      </div>
                    )}
                  </div>

                  {/* 目标受众 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">目标受众</label>
                    {isEditing ? (
                      <Input 
                        value={profile.targetAudience}
                        onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-pink-50 rounded-lg">
                        <p className="text-pink-700 font-medium">{profile.targetAudience}</p>
                      </div>
                    )}
                  </div>

                  {/* 语调风格 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">语调风格</label>
                    {isEditing ? (
                      <Input 
                        value={profile.tone}
                        onChange={(e) => handleInputChange('tone', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-700 font-medium">{profile.tone}</p>
                      </div>
                    )}
                  </div>

                  {/* 专业领域 */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">专业领域</label>
                    {isEditing ? (
                      <Input 
                        value={profile.specialty}
                        onChange={(e) => handleInputChange('specialty', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-green-700 font-medium">{profile.specialty}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI 个性化建议 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-600" />
                    AI 个性化建议
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">根据您的写作历史，建议在文案中增加更多情感化表达</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">您的目标受众对"种草"类内容反应最好</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">建议在周末发布内容，互动率提升30%</p>
                    </div>
                  </div>
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
