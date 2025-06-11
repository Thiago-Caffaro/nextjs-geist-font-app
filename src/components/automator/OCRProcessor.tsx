"use client";

import React, { useEffect, useState } from "react";
import { extractTextFromImage } from "@/lib/ocr";
import { processOCRText } from "@/lib/dataProcessor";

interface OCRProcessorProps {
  imageDataUrl: string;
  onResult: (data: { success: boolean; text?: string; processedData?: any; error?: any }) => void;
}

export default function OCRProcessor({ imageDataUrl, onResult }: OCRProcessorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [processedData, setProcessedData] = useState<any>(null);

  useEffect(() => {
    async function runOCR() {
      setLoading(true);
      setError(null);
      try {
        const result = await extractTextFromImage(imageDataUrl);
        if (result.success) {
          setText(result.text ?? "");
          const processed = processOCRText(result.text ?? "");
          setProcessedData(processed);
          onResult({ 
            success: true, 
            text: result.text,
            processedData: processed
          });
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
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Dados Extraídos:</h3>
            {processedData && (
              <div className="grid grid-cols-2 gap-2">
                <div>Cotas: <span className="font-medium">{processedData.cotas}</span></div>
                <div>Valor: <span className="font-medium">R$ {processedData.valor}</span></div>
                <div>Data: <span className="font-medium">{processedData.data}</span></div>
                <div>Terminal: <span className="font-medium">{processedData.terminal}</span></div>
                <div>Combinação: <span className="font-medium">{processedData.combinacao}</span></div>
                <div>Dezenas: <span className="font-medium">{processedData.dezenas}</span></div>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Texto Original:</h3>
            <textarea
              className="w-full h-40 p-2 border rounded resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={text}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}
