import React from 'react';
import QuickActions from '../components/Dashboard/QuickActions';
import EventsWidget from '../components/Dashboard/EventsWidget';
import NewsFeed from '../components/Dashboard/NewsFeed';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          <NewsFeed />
        </div>
        <div className="lg:col-span-1">
          <EventsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
