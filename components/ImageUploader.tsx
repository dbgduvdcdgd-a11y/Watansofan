
import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  preview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, preview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;
    onImageChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div>
      <label
        htmlFor="image-upload"
        className="block text-sm font-medium text-gray-400 mb-2"
      >
        الخطوة 1: قم بتحميل صورتك
      </label>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          relative flex justify-center items-center w-full h-48 px-4
          border-2 border-dashed border-gray-600 rounded-lg 
          cursor-pointer bg-gray-700/50 hover:bg-gray-700 
          transition-colors duration-300
          ${preview ? 'border-solid' : ''}
        `}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-500">
            <UploadIcon className="mx-auto h-12 w-12" />
            <p className="mt-2">اسحب وأفلت الصورة هنا، أو انقر للتصفح</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
        <input
          id="image-upload"
          name="image-upload"
          type="file"
          className="sr-only"
          accept="image/png, image/jpeg, image/webp"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
