import React from 'react';
import { Webinar } from '../types';
import { PlayCircle, Clock, Calendar } from 'lucide-react';

interface WebinarCardProps {
  webinar: Webinar;
  isActive: boolean;
  onClick: (webinar: Webinar) => void;
}

export const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, isActive, onClick }) => {
  return (
    <div 
      onClick={() => onClick(webinar)}
      className={`
        relative overflow-hidden rounded-xl border p-3 cursor-pointer transition-all duration-300
        ${isActive 
          ? 'bg-primary-50 border-primary-500 shadow-md transform scale-[1.02]' 
          : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-sm'
        }
      `}
    >
      <div className="flex gap-3">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200 group">
          <img 
            src={webinar.thumbnail} 
            alt={webinar.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="text-white w-8 h-8" />
          </div>
        </div>
        
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <h3 className={`font-bold text-sm leading-tight truncate ${isActive ? 'text-primary-800' : 'text-slate-800'}`}>
            {webinar.title}
          </h3>
          
          <div className="space-y-1 mt-1">
            <div className="flex items-center text-xs text-slate-500">
              <Calendar className="w-3 h-3 ml-1" />
              <span>{webinar.date}</span>
            </div>
            <div className="flex items-center text-xs text-slate-500">
              <Clock className="w-3 h-3 ml-1" />
              <span>{webinar.duration}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {webinar.topics.slice(0, 2).map((topic, idx) => (
              <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};