
import { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { EngagementCard, QuizContent } from '@/types/courseTypes';

interface QuizCardProps {
  card: EngagementCard;
  onShowModal: (title: string, message: string, type?: 'notification' | 'aiQuestion' | 'aiResponse') => void;
  onCallAI: (prompt: string) => Promise<string | null>;
}

const QuizCard = ({ card, onShowModal, onCallAI }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const quizContent = card.content as QuizContent;

  const handleCheckAnswer = () => {
    if (!selectedAnswer) {
      onShowModal("Quiz Alert", "Please select an option.");
      return;
    }

    setAnswered(true);
    setShowExplanation(true);

    if (selectedAnswer === quizContent.correct_answer_value) {
      onShowModal("Quiz Result: Correct!", "Excellent work! Your AI Companion is impressed!");
    } else {
      onShowModal("Quiz Result: Opportunity to Revisit", "Not quite. The correct answer is highlighted. Your AI can explain why.");
    }
  };

  const handleAIExplanation = async () => {
    const correctOption = quizContent.options.find(opt => opt.id === quizContent.correct_answer_value);
    const optionsString = quizContent.options.map(opt => opt.text).join('\n');
    
    const prompt = `The quiz question is: "${quizContent.question_text}"\nThe options are:\n${optionsString}\nThe correct answer is: "${correctOption?.text}".\nPlease provide a brief, clear explanation why this is the correct answer.`;
    
    const explanation = await onCallAI(prompt);
    if (explanation) {
      onShowModal("AI Explanation for Quiz", explanation, "aiResponse");
    }
  };

  const getOptionStyle = (optionId: string) => {
    if (!answered) return "border-slate-200 bg-slate-50 hover:bg-slate-100";
    
    if (optionId === quizContent.correct_answer_value) {
      return selectedAnswer === optionId 
        ? "border-green-500 bg-green-50 text-green-800" 
        : "border-blue-500 bg-blue-50 text-blue-800";
    }
    
    if (selectedAnswer === optionId) {
      return "border-red-500 bg-red-50 text-red-800";
    }
    
    return "border-slate-200 bg-slate-50";
  };

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-7 md:p-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{card.title}</h3>
        <p className="text-slate-600 mb-6">Your AI Companion has prepared a quick question for you.</p>
        
        <div className="mb-6">
          <p className="text-lg font-semibold text-slate-800 mb-4">{quizContent.question_text}</p>
          
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={answered}>
            <div className="space-y-4">
              {quizContent.options.map((option) => (
                <div key={option.id} className={`flex items-center p-4 border-2 rounded-lg transition-all ${getOptionStyle(option.id)}`}>
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="ml-3 flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                  {answered && option.id === quizContent.correct_answer_value && (
                    <span className="text-green-600 font-semibold">✓</span>
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={handleCheckAnswer}
            disabled={answered}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Check Answer
          </Button>
          
          {showExplanation && (
            <Button 
              onClick={handleAIExplanation}
              className="bg-teal-500 hover:bg-teal-600"
            >
              <Info className="w-4 h-4 mr-2" />
              AI Explanation
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizCard;
