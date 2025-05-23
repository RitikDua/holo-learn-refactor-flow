
import { useState } from 'react';
import { MessageCircle, Star, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { TocItem } from '@/types/courseTypes';

interface TocSectionProps {
  item: TocItem;
  index: number;
  onShowModal: (title: string, message: string, type?: 'notification' | 'aiQuestion' | 'aiResponse', cardId?: string) => void;
  onCallAI: (prompt: string) => Promise<string | null>;
  setCurrentContent: (content: string) => void;
}

const TocSection = ({ item, index, onShowModal, onCallAI, setCurrentContent }: TocSectionProps) => {
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [showAiResult, setShowAiResult] = useState(false);

  const handleAskAI = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = item.content;
    const contentText = tempDiv.textContent || tempDiv.innerText || '';
    setCurrentContent(contentText);
    onShowModal("Ask Your AI Companion", "What would you like to know about this section?", "aiQuestion", item.id);
  };

  const handleGenerateContent = async (type: 'takeaways' | 'insights') => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = item.content;
    const contentText = tempDiv.textContent || tempDiv.innerText || '';
    
    const prompt = type === 'takeaways' 
      ? `Extract 3-5 key takeaways from this text, presented as a concise bulleted list (use '*' for bullets). Text:\n\n"${contentText}"`
      : `Provide 2-3 brief, actionable "Quick Insights" related to the following text. Focus on practical tips or deeper considerations. Present as a bulleted list (use '*' for bullets). Text:\n\n"${contentText}"`;
    
    const result = await onCallAI(prompt);
    if (result) {
      setAiResult(result);
      setShowAiResult(true);
    }
  };

  const formatAIResult = (result: string) => {
    return result.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('* ')) {
        return <li key={index} className="mb-2">{trimmedLine.substring(2)}</li>;
      }
      return trimmedLine ? <li key={index} className="mb-2">{trimmedLine}</li> : null;
    }).filter(Boolean);
  };

  return (
    <section id={item.id} className="bg-white p-7 md:p-10 rounded-xl shadow-lg">
      <p className="text-sm text-slate-500 mb-4">Est. Time: {item.est_minutes} minutes</p>
      <div 
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
      
      <div className="mt-8 flex flex-wrap gap-4">
        <Button 
          onClick={handleAskAI}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Ask AI About This
        </Button>
        
        <Button 
          onClick={() => handleGenerateContent(index === 0 ? 'takeaways' : 'insights')}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          {index === 0 ? (
            <>
              <Star className="w-4 h-4 mr-2" />
              Generate Key Takeaways
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              Get AI Quick Insights
            </>
          )}
        </Button>
      </div>

      {showAiResult && aiResult && (
        <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-teal-500" />
            AI Output:
          </h4>
          <ul className="text-slate-700 text-sm leading-relaxed space-y-1">
            {formatAIResult(aiResult)}
          </ul>
        </div>
      )}
    </section>
  );
};

export default TocSection;
