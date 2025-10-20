
import React from 'react';

interface PromptInputProps {
  value: string;
  onValueChange: (newValue: string) => void;
}

const examplePrompts = [
  'اجعل الخلفية مدينة مستقبلية في الليل',
  'غير النمط ليبدو كلوحة مائية',
  'أضف روبوتًا ودودًا يقف بجانب العنصر الرئيسي',
  'حول الفصل إلى شتاء وأضف ثلجًا يتساقط',
];

const PromptInput: React.FC<PromptInputProps> = ({ value, onValueChange }) => {
  const handleExampleClick = (prompt: string) => {
    onValueChange(prompt);
  };

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
        onChange={(e) => onValueChange(e.target.value)}
      />
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-2">أو جرب أحد هذه الأمثلة:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(prompt)}
              className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
              aria-label={`Try prompt: ${prompt}`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
