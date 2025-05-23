
import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  type: 'notification' | 'aiQuestion' | 'aiResponse';
  currentContent: string;
  onSubmitAIQuestion: (prompt: string) => Promise<string | null>;
}

const MessageModal = ({ 
  open, 
  onOpenChange, 
  title, 
  message, 
  type, 
  currentContent, 
  onSubmitAIQuestion 
}: MessageModalProps) => {
  const [question, setQuestion] = useState('');

  const handleSubmitQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    const prompt = `Contextual Content:\n"${currentContent}"\n\nUser's Question:\n"${question}"\n\nBased on the contextual content, answer the user's question concisely. If the question cannot be answered from the context, politely state that.`;
    
    const response = await onSubmitAIQuestion(prompt);
    if (response) {
      // The parent component will handle showing the response
      setQuestion('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {type === 'aiResponse' ? (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {message}
              </div>
            </div>
          ) : (
            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed mb-4">
              {message}
            </div>
          )}

          {type === 'aiQuestion' && (
            <div className="space-y-4">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your AI a question about this content..."
                className="min-h-[80px]"
              />
              <Button 
                onClick={handleSubmitQuestion}
                className="w-full bg-teal-500 hover:bg-teal-600"
                disabled={!question.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Send to AI
              </Button>
            </div>
          )}

          {type !== 'aiQuestion' && (
            <Button 
              onClick={() => onOpenChange(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4"
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
