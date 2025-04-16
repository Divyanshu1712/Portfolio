import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Note: In a production environment, you would need to:
    // 1. Set up Twitter API credentials
    // 2. Implement proper authentication
    // 3. Handle rate limiting
    // 4. Cache responses

    // For now, we'll return static tweets
    const tweets = [
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
        text: 'Working on a new open-source project. Can\'t wait to share it with the community!',
        author: {
          name: 'Divyanshu Srivastava',
          handle: '@Divyans19896602',
          avatar: '/avatars/divyanshu.jpg'
        },
        date: '1d ago',
        likes: 156,
        retweets: 45
      }
    ];

    return NextResponse.json(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tweets' },
      { status: 500 }
    );
  }
} 