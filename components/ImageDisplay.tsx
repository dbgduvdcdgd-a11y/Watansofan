
import React from 'react';
import { ImageIcon } from './Icons';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-center font-semibold text-gray-400">{title}</h3>
      <div className="aspect-square w-full bg-gray-900/50 rounded-lg flex items-center justify-center border border-gray-700">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="text-gray-600 text-center p-4">
            <ImageIcon className="w-16 h-16 mx-auto" />
            <p className="mt-2 text-sm">ستظهر الصورة هنا</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
