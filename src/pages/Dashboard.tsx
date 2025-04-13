
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { PostsTable } from '@/components/dashboard/PostsTable';

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your content today.
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Analytics Charts */}
        <AnalyticsChart />

        {/* Posts Management */}
        <PostsTable />
      </div>
    </DashboardLayout>
  );
};
