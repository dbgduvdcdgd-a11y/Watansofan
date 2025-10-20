
import React from 'react';
import { MagicWandIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <MagicWandIcon className="w-8 h-8 text-blue-400 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          محرر الصور بالذكاء الاصطناعي
        </h1>
      </div>
    </header>
  );
};

export default Header;
