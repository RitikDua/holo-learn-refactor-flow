
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { EngagementCard, ScenarioContent } from '@/types/courseTypes';

interface ScenarioCardProps {
  card: EngagementCard;
  onShowModal: (title: string, message: string, type?: 'notification' | 'aiQuestion' | 'aiResponse') => void;
  onCallAI: (prompt: string) => Promise<string | null>;
}

const ScenarioCard = ({ card, onShowModal, onCallAI }: ScenarioCardProps) => {
  const [response, setResponse] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const scenarioContent = card.content as ScenarioContent;

  const handleSubmitReflection = () => {
    if (!response.trim()) {
      onShowModal("Input Needed", "Please write your reflection.");
      return;
    }
    onShowModal("Reflection Logged", "Your thoughts are logged. (Demo: No data saved).");
  };

  const handleAIFeedback = async () => {
    if (!response.trim()) {
      onShowModal("Input Needed", "Please write your reflection first.");
      return;
    }

    const prompt = `Scenario:\n${scenarioContent.scenario_text}\n\nUser's Recommendation:\n${response}\n\nProvide constructive, concise feedback. Highlight strengths and suggest 1-2 areas for improvement.`;
    
    const feedback = await onCallAI(prompt);
    if (feedback) {
      setAiFeedback(feedback);
      setShowFeedback(true);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-7 md:p-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{card.title}</h3>
        <p className="text-slate-600 mb-6">Your AI challenges you to apply your knowledge.</p>
        
        <div className="bg-slate-100 p-6 rounded-lg mb-6 border border-slate-200">
          <p className="text-slate-800 font-semibold text-lg mb-2">The Scenario:</p>
          <p className="text-slate-700">{scenarioContent.scenario_text}</p>
        </div>

        <div className="mb-6">
          <label htmlFor={`scenario_response_${card.id}`} className="block text-lg font-semibold text-slate-800 mb-2">
            {scenarioContent.prompt_question}
          </label>
          <Textarea
            id={`scenario_response_${card.id}`}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Outline your key recommendation..."
            className="min-h-[120px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleSubmitReflection}
            className="bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none"
          >
            Submit Reflection
          </Button>
          
          <Button 
            onClick={handleAIFeedback}
            className="bg-teal-500 hover:bg-teal-600 flex-1 sm:flex-none"
          >
            <Send className="w-4 h-4 mr-2" />
            Get AI Feedback
          </Button>
        </div>

        {showFeedback && aiFeedback && (
          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Send className="w-5 h-5 text-teal-500" />
              AI Feedback:
            </h4>
            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {aiFeedback}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScenarioCard;
