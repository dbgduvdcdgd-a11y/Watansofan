
import React, { useState, useCallback } from 'react';
import { editImageWithPrompt } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import PromptInput from './components/PromptInput';
import ActionButton from './components/ActionButton';
import Loader from './components/Loader';
import { DownloadIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setOriginalImage(file);
    setEditedImage(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setOriginalImagePreview(null);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('يرجى تحميل صورة وكتابة وصف للتعديل.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const generatedImageBase64 = await editImageWithPrompt(base64, mimeType, prompt);
      setEditedImage(`data:${mimeType};base64,${generatedImageBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="flex flex-col space-y-6">
              <ImageUploader onImageChange={handleImageChange} preview={originalImagePreview} />
              <PromptInput value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              <ActionButton
                onClick={handleGenerateClick}
                disabled={!originalImage || !prompt || isLoading}
                isLoading={isLoading}
              >
                <SparklesIcon className="w-5 h-5 mr-2" />
                {isLoading ? 'جاري التعديل...' : 'تعديل الصورة'}
              </ActionButton>
              {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</div>}
            </div>

            {/* Image Display */}
            <div className="relative">
              {isLoading && (
                  <div className="absolute inset-0 bg-gray-900/80 flex flex-col justify-center items-center rounded-xl z-10">
                    <Loader />
                    <p className="mt-4 text-lg">يقوم الذكاء الاصطناعي بسحره...</p>
                  </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageDisplay title="الصورة الأصلية" imageUrl={originalImagePreview} />
                <div className="relative group">
                  <ImageDisplay title="الصورة المعدلة" imageUrl={editedImage} />
                  {editedImage && !isLoading && (
                    <a
                      href={editedImage}
                      download="edited-image.png"
                      className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="Download edited image"
                    >
                      <DownloadIcon className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>مدعوم بواسطة Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
