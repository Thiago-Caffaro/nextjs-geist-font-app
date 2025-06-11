import Tesseract from "tesseract.js";

export async function extractTextFromImage(imageDataUrl: string) {
  try {
    const result = await Tesseract.recognize(imageDataUrl, "por", {
      logger: (m) => console.log(m),
    });
    // Here you can parse result.data.text to extract relevant fields
    // For now, return raw text and confidence
    return {
      success: true,
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } catch (err) {
    console.error("OCR failed", err);
    return { success: false, error: err };
  }
}
