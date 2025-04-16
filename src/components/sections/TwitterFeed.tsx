'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface Tweet {
  id: string;
  text: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  date: string;
  likes: number;
  retweets: number;
}

const TweetCard = ({ tweet, index }: { tweet: Tweet; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-white/5"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xl font-bold">DS</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-primary">{tweet.author.name}</h3>
            <span className="text-muted-foreground">@{tweet.author.handle}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{tweet.date}</span>
          </div>
          <p className="mt-2 text-foreground">{tweet.text}</p>
          <div className="mt-4 flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{tweet.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>{tweet.retweets}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TwitterFeed() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Note: In a production environment, you would need to set up a backend proxy
        // to handle Twitter API authentication and rate limiting
        const response = await fetch('/api/tweets');
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();
        setTweets(data);
      } catch (_) {
        setError('Failed to load tweets. Please try again later.');
        // Fallback to static tweets if API fails
        setTweets([
          {
            id: '1',
            text: 'Just deployed a new feature to production! 🚀 Excited to see how users will interact with it.',
            author: {
              name: 'Divyanshu Srivastava',
              handle: '@Divyans19896602',
              avatar: '/avatars/divyanshu.jpg'
            },
            date: '2h ago',
            likes: 42,
            retweets: 12
          },
          {
            id: '2',
            text: 'Learning TypeScript has been a game-changer for my development workflow. The type safety is incredible!',
            author: {
              name: 'Divyanshu Srivastava',
              handle: '@Divyans19896602',
              avatar: '/avatars/divyanshu.jpg'
            },
            date: '5h ago',
            likes: 89,
            retweets: 23
          },
          {
            id: '3',
            text: 'Working on a new open-source project. Can&apos;t wait to share it with the community!',
            author: {
              name: 'Divyanshu Srivastava',
              handle: '@Divyans19896602',
              avatar: '/avatars/divyanshu.jpg'
            },
            date: '1d ago',
            likes: 156,
            retweets: 45
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      fetchTweets();
      // Refresh tweets every 5 minutes
      const interval = setInterval(fetchTweets, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <section id="twitter" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">Latest Tweets</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow my journey and thoughts on technology and development
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {tweets.map((tweet, index) => (
            <TweetCard key={tweet.id} tweet={tweet} index={index} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <a
          href="https://x.com/Divyans19896602"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          View all tweets
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
} 