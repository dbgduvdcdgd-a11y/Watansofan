
/**
 * Converts a File object to a base64 string.
 * @param file The file to convert.
 * @returns A promise that resolves with an object containing the base64 string and mimeType.
 */
export const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result includes the data URI prefix (e.g., "data:image/jpeg;base64,"), 
      // which we need to remove for the API call.
      const base64 = result.split(',')[1];
      if (base64) {
        resolve({ base64, mimeType: file.type });
      } else {
        reject(new Error("Failed to extract base64 data from file."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
