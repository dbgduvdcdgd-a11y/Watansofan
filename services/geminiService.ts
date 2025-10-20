
import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Edits an image using a text prompt with the Gemini API.
 * @param base64ImageData The base64 encoded image data string (without the data: prefix).
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @param prompt The text prompt describing the desired edits.
 * @returns A promise that resolves to the base64 encoded string of the edited image.
 */
export const editImageWithPrompt = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    // Moved initialization inside the function to prevent app crash on load
    // if the environment variable is not available in the browser context.
    if (typeof process === 'undefined' || !process.env.API_KEY) {
      throw new Error("لم يتم تكوين مفتاح الواجهة البرمجية (API Key). يرجى التأكد من إعداده في بيئة الاستضافة.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Find the image part in the response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
        return part.inlineData.data;
      }
    }

    throw new Error('لم يتم العثور على صورة في استجابة النموذج.');

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API Key')) {
        throw error;
    }
    throw new Error('فشل تعديل الصورة. يرجى التحقق من وحدة التحكم لمزيد من التفاصيل.');
  }
};
