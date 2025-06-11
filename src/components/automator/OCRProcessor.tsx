"use client";

import React, { useEffect, useState } from "react";
import { extractTextFromImage } from "@/lib/ocr";

interface OCRProcessorProps {
  imageDataUrl: string;
  onResult: (data: { success: boolean; text?: string; error?: any }) => void;
}

export default function OCRProcessor({ imageDataUrl, onResult }: OCRProcessorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    async function runOCR() {
      setLoading(true);
      setError(null);
      try {
        const result = await extractTextFromImage(imageDataUrl);
        if (result.success) {
          setText(result.text ?? "");
          onResult({ success: true, text: result.text });
        } else {
          setError("Falha na extração de texto.");
          onResult({ success: false, error: result.error });
        }
      } catch (err) {
        setError("Erro inesperado durante OCR.");
        onResult({ success: false, error: err });
      } finally {
        setLoading(false);
      }
    }
    runOCR();
  }, [imageDataUrl, onResult]);

  return (
    <div className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
      {loading && <p>Processando OCR...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <textarea
          className="w-full h-40 p-2 border rounded resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={text}
          readOnly
        />
      )}
    </div>
  );
}
