import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface TweetCardProps {
  author: {
    name: string;
    handle: string;
    avatar?: string;
  };
  content: string;
  date: Date;
  likes: number;
  retweets: number;
}

const TweetCard: React.FC<TweetCardProps> = ({ 
  author, 
  content, 
  date, 
  likes, 
  retweets 
}) => {
  const timeAgo = formatDistanceToNow(date, { addSuffix: false });

  return (
    <div className="bg-black border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/5 transition-colors duration-200">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {author.avatar ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg font-bold">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-x-1 mb-1">
            <h3 className="text-base font-bold text-white truncate">
              {author.name}
            </h3>
            <span className="text-sm text-gray-400 truncate">
              @{author.handle}
            </span>
            <div className="text-gray-400 text-sm whitespace-nowrap">
              <span className="mx-1">·</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          {/* Tweet content */}
          <p className="text-white text-sm md:text-base mb-3 break-words">
            {content}
          </p>

          {/* Engagement */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-400 group">
              <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-pink-900/20 group-hover:text-pink-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xs md:text-sm">{likes}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 group">
              <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-green-900/20 group-hover:text-green-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-xs md:text-sm">{retweets}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard; 