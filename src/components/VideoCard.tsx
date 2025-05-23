
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResourceCard, VideoContent } from '@/types/courseTypes';

interface VideoCardProps {
  card: ResourceCard;
}

const VideoCard = ({ card }: VideoCardProps) => {
  const videoContent = card.content as VideoContent;

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative group">
        <img 
          src={videoContent.thumbnail_url} 
          alt={`Video Thumbnail for ${videoContent.video_title_api}`}
          className="w-full h-auto object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/800x450/475569/CBD5E1?text=Video+Not+Found&font=inter';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-20 h-20 text-white opacity-90">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-7 md:p-10">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{card.title}</h3>
        <p className="text-slate-500 mb-3 text-sm">{videoContent.source_info || 'Curated by Your AI'}</p>
        <p className="text-slate-600 mb-5">{videoContent.description}</p>
        
        <Button 
          asChild
          variant="outline"
          className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
        >
          <a 
            href={`https://www.youtube.com/watch?v=${videoContent.video_id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            Watch Video 
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default VideoCard;
