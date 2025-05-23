
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EngagementCard, SimulationContent } from '@/types/courseTypes';

interface SimulationCardProps {
  card: EngagementCard;
}

const SimulationCard = ({ card }: SimulationCardProps) => {
  const simulationContent = card.content as SimulationContent;

  const handleLaunchSimulation = () => {
    // Placeholder for simulation launch logic
    console.log('Launching simulation:', card.id);
  };

  return (
    <section className="bg-gradient-to-br from-purple-700 via-indigo-700 to-fuchsia-700 text-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="p-8 md:p-12 text-center">
        <div className="mb-5">
          <Play className="w-20 h-20 mx-auto text-purple-300 opacity-80" />
        </div>
        
        <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
        <p className="text-purple-200 mb-8 text-lg leading-relaxed max-w-xl mx-auto">
          {simulationContent.description}
        </p>
        
        <Button 
          onClick={handleLaunchSimulation}
          className="bg-white hover:bg-purple-100 text-indigo-700 font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
        >
          Launch Simulation
        </Button>
      </div>
    </section>
  );
};

export default SimulationCard;
