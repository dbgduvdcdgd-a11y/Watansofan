
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
        الخطوة 2: صف التعديل الذي تريده
      </label>
      <textarea
        id="prompt"
        name="prompt"
        rows={4}
        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-500"
        placeholder="مثال: اجعل السماء ليلية ومليئة بالنجوم، أضف قطة سوداء على السياج..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PromptInput;
