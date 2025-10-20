import React from 'react'
import { MessageCircle, MessageSquare } from 'lucide-react';
import {  Waves } from 'lucide-react';

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
const WaveLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="relative">
        <MessageCircle className="w-20 h-20 text-blue-500 relative z-10" />
        <Waves className="absolute top-0 left-0 w-20 h-20 text-blue-200 animate-ping" />
      </div>
      <p className="mt-6 text-gray-700 font-medium">Connecting to chat...</p>
    </div>
  );
};
const ChatLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <MessageCircle className="w-16 h-16 text-blue-500 animate-bounce" />
        <MessageSquare 
          className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-300 animate-pulse" 
          style={{ animationDelay: '0.5s' }}
        />
      </div>
      <p className="mt-6 text-gray-600 font-medium">Starting conversation...</p>
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
