
import React from 'react';
import Loader from './Loader';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, disabled, isLoading, children }) => {
  return (
    <div>
       <label className="block text-sm font-medium text-gray-400 mb-2">
        الخطوة 3: أطلق العنان للإبداع
      </label>
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
      >
        {isLoading ? <Loader /> : children}
      </button>
    </div>
  );
};

export default ActionButton;
