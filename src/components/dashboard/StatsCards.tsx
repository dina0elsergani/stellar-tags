
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePosts } from '@/services/api';

export const StatsCards: React.FC = () => {
  const { data: posts = [] } = usePosts();
  
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.published).length;
  const draftPosts = totalPosts - publishedPosts;
  const averageWordsPerPost = Math.round(
    posts.reduce((acc, post) => acc + post.body.split(' ').length, 0) / (totalPosts || 1)
  );

  const stats = [
    {
      title: 'Total Posts',
      value: totalPosts,
      change: '+12%',
      changeType: 'positive' as const,
      color: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
      title: 'Published',
      value: publishedPosts,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'bg-gradient-to-r from-green-600 to-green-700'
    },
    {
      title: 'Drafts',
      value: draftPosts,
      change: '+4%',
      changeType: 'positive' as const,
      color: 'bg-gradient-to-r from-yellow-600 to-yellow-700'
    },
    {
      title: 'Avg. Words',
      value: averageWordsPerPost,
      change: '+2%',
      changeType: 'positive' as const,
      color: 'bg-gradient-to-r from-purple-600 to-purple-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
