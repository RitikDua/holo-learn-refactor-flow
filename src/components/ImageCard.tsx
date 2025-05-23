
import type { ResourceCard, ImageContent } from '@/types/courseTypes';

interface ImageCardProps {
  card: ResourceCard;
}

const ImageCard = ({ card }: ImageCardProps) => {
  const imageContent = card.content as ImageContent;

  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <img 
        src={imageContent.image_url} 
        alt={imageContent.alt_text}
        className="w-full h-64 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/800x400/E0E7FF/4F46E5?text=Image+Not+Found&font=inter';
        }}
      />
      <div className="p-7 md:p-10">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
        <p className="text-slate-600">{imageContent.caption}</p>
      </div>
    </section>
  );
};

export default ImageCard;
