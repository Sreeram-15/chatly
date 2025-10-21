import React from 'react'
import { MessageCircle, MessageSquare } from 'lucide-react';

const MinimalChatLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <MessageCircle className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
        <p className="text-blue-200 text-sm">Loading messages</p>
      </div>
    </div>
  );
};
const PageLoader = () => {
  return (
    <div>
        <MinimalChatLoader/>
    </div>
  )
}

export default PageLoader
