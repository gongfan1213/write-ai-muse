
import React, { useState, useRef, useEffect } from 'react';
import { X, Save, Copy, Download, Undo, Redo, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ContentEditCanvasProps {
  content: {
    id: number;
    title: string;
    content: string;
    platform: string;
    status: string;
  } | null;
  open: boolean;
  onClose: () => void;
  onSave: (content: any) => void;
}

const ContentEditCanvas: React.FC<ContentEditCanvasProps> = ({ content, open, onClose, onSave }) => {
  const [editableContent, setEditableContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (content) {
      setEditableContent(content.content);
      setTitle(content.title);
    }
  }, [content]);

  if (!content) return null;

  const handleTextSelection = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = editableContent.substring(start, end);
      if (selected) {
        setSelectedText(selected);
        setShowAIPanel(true);
      }
    }
  };

  const handleSave = () => {
    const updatedContent = {
      ...content,
      title,
      content: editableContent
    };
    onSave(updatedContent);
    toast({
      title: "保存成功",
      description: "内容已保存到草稿箱"
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    toast({
      title: "复制成功",
      description: "内容已复制到剪贴板"
    });
  };

  const handleDownload = () => {
    const blob = new Blob([editableContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const applyFormatting = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editableContent.substring(start, end);
    
    let formattedText = selectedText;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
    }

    const newContent = editableContent.substring(0, start) + formattedText + editableContent.substring(end);
    setEditableContent(newContent);
  };

  const handleAIRewrite = () => {
    // 模拟AI改写
    const rewrittenText = `${selectedText}（AI优化版本）`;
    const start = editableContent.indexOf(selectedText);
    const end = start + selectedText.length;
    const newContent = editableContent.substring(0, start) + rewrittenText + editableContent.substring(end);
    setEditableContent(newContent);
    setShowAIPanel(false);
    setAiPrompt('');
    toast({
      title: "AI改写完成",
      description: "选中内容已优化"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <Type className="w-6 h-6 text-purple-600" />
              <span>内容编辑器</span>
              <Badge variant="outline">{content.platform}</Badge>
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                复制
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                下载
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                保存
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex h-[calc(90vh-120px)]">
          {/* 编辑区域 */}
          <div className="flex-1 flex flex-col">
            {/* 工具栏 */}
            <div className="flex items-center space-x-2 p-3 border-b bg-gray-50">
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('bold')}>
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('italic')}>
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => applyFormatting('underline')}>
                <Underline className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm">
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Redo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Palette className="w-4 h-4" />
              </Button>
            </div>

            {/* 标题编辑 */}
            <div className="p-4 border-b">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="输入标题..."
                className="text-lg font-medium"
              />
            </div>

            {/* 内容编辑区 */}
            <div className="flex-1 p-4">
              <textarea
                ref={textareaRef}
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                onMouseUp={handleTextSelection}
                className="w-full h-full resize-none border-0 outline-none text-base leading-relaxed"
                placeholder="开始编辑内容..."
              />
            </div>
          </div>

          {/* 预览区域 */}
          <div className="w-96 border-l bg-gray-50">
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-900">实时预览</h3>
            </div>
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-sm border p-4 min-h-64">
                <h3 className="font-bold text-lg mb-3 text-gray-900">{title || '标题预览'}</h3>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {editableContent || '内容预览...'}
                </div>
              </div>
            </div>

            {/* 统计信息 */}
            <div className="p-4 border-t">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>字符数:</span>
                  <span>{editableContent.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>词数:</span>
                  <span>{editableContent.split('').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>段落数:</span>
                  <span>{editableContent.split('\n\n').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI改写面板 */}
        {showAIPanel && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">选中文本: "{selectedText}"</p>
                <Input
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="告诉AI如何改写这段文本..."
                  className="mb-2"
                />
              </div>
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleAIRewrite}>
                  AI改写
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowAIPanel(false)}>
                  取消
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContentEditCanvas;
