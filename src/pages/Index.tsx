
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import ModuleHeader from '@/components/ModuleHeader';
import TocSection from '@/components/TocSection';
import QuizCard from '@/components/QuizCard';
import ScenarioCard from '@/components/ScenarioCard';
import SimulationCard from '@/components/SimulationCard';
import ImageCard from '@/components/ImageCard';
import VideoCard from '@/components/VideoCard';
import LoadingOverlay from '@/components/LoadingOverlay';
import MessageModal from '@/components/MessageModal';
import { mockApiData } from '@/data/mockData';
import type { ModuleData } from '@/types/courseTypes';

const Index = () => {
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'notification' | 'aiQuestion' | 'aiResponse'>('notification');
  const [currentContentForAI, setCurrentContentForAI] = useState('');
  const [currentCardId, setCurrentCardId] = useState('');

  // Simulate API fetch
  const fetchModuleData = async (): Promise<ModuleData> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(mockApiData);
      }, 500);
    });
  };

  const showModal = (title: string, message: string, type: 'notification' | 'aiQuestion' | 'aiResponse' = 'notification', cardId?: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    if (cardId) {
      setCurrentCardId(cardId);
    }
    setModalOpen(true);
  };

  const callGeminiAPI = async (prompt: string): Promise<string | null> => {
    setLoading(true);
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock AI responses based on prompt type
      if (prompt.includes('takeaways')) {
        return `* Understanding your audience requires analyzing their digital behaviors and platform preferences
* Demographics alone are insufficient - focus on pain points and motivations  
* Creating detailed buyer personas enables targeted messaging strategies
* Building relationships and providing value should precede selling attempts`;
      } else if (prompt.includes('insights')) {
        return `* Leverage social listening tools to monitor audience conversations and trending topics
* Test different content formats to discover what resonates most with your specific audience
* Use analytics to identify optimal posting times and engagement patterns`;
      } else if (prompt.includes('explanation')) {
        return `Understanding online behaviors and preferred platforms is crucial because it directly impacts how you reach and engage your audience. Unlike static demographics, behavioral data reveals how people actually interact with content, what motivates them to engage, and where they spend their digital time. This insight allows for more targeted and effective marketing strategies.`;
      } else {
        return `Based on the content provided, here's a helpful response tailored to your question. The AI analyzes the context and provides relevant insights to enhance your learning experience.`;
      }
    } catch (error) {
      toast({
        title: "AI Communication Error",
        description: "Could not fetch AI response. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModuleData().then(setModuleData);
  }, []);

  if (!moduleData) {
    return <LoadingOverlay />;
  }

  // Interleave content sections with engagement and resource cards
  const renderContent = () => {
    const content = [];
    let engagementIndex = 0;
    let resourceIndex = 0;

    moduleData.toc_items.forEach((tocItem, index) => {
      content.push(
        <TocSection
          key={tocItem.id}
          item={tocItem}
          index={index}
          onShowModal={showModal}
          onCallAI={callGeminiAPI}
          setCurrentContent={setCurrentContentForAI}
        />
      );

      // Add engagement card after each TOC section
      if (engagementIndex < moduleData.engagement_cards.length) {
        const card = moduleData.engagement_cards[engagementIndex++];
        if (card.type === 'quiz') {
          content.push(
            <QuizCard
              key={card.id}
              card={card}
              onShowModal={showModal}
              onCallAI={callGeminiAPI}
            />
          );
        } else if (card.type === 'scenario') {
          content.push(
            <ScenarioCard
              key={card.id}
              card={card}
              onShowModal={showModal}
              onCallAI={callGeminiAPI}
            />
          );
        } else if (card.type === 'simulation') {
          content.push(
            <SimulationCard
              key={card.id}
              card={card}
            />
          );
        }
      }

      // Add resource card
      if (resourceIndex < moduleData.resource_cards.length) {
        const card = moduleData.resource_cards[resourceIndex++];
        if (card.type === 'image_illustration') {
          content.push(
            <ImageCard
              key={card.id}
              card={card}
            />
          );
        } else if (card.type === 'youtube_video') {
          content.push(
            <VideoCard
              key={card.id}
              card={card}
            />
          );
        }
      }
    });

    return content;
  };

  return (
    <>
      <div className="min-h-screen bg-slate-100 py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader data={moduleData} />
          
          <div className="space-y-12 md:space-y-16">
            {renderContent()}
          </div>

          <footer className="mt-20 md:mt-28 pt-10 border-t border-slate-300 text-center">
            <p className="text-slate-600">© 2042 HoloLearn Dynamics. Your Personalized Future of Education.</p>
            <p className="text-sm text-slate-500 mt-1.5">AI Core Version: 4.0 | Last Synced: Just Now</p>
          </footer>
        </div>
      </div>

      {loading && <LoadingOverlay />}
      
      <MessageModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
        currentContent={currentContentForAI}
        onSubmitAIQuestion={callGeminiAPI}
      />
    </>
  );
};

export default Index;
