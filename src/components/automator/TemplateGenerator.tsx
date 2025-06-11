"use client";

import React, { useState } from "react";
import { TemplateData, generateTemplateImage } from "@/lib/templateGenerator";

interface TemplateGeneratorProps {
  templateImageUrl: string;
  data: TemplateData;
}

export default function TemplateGenerator({ templateImageUrl, data }: TemplateGeneratorProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    try {
      const imageDataUrl = await generateTemplateImage(templateImageUrl, data);
      setGeneratedImage(imageDataUrl);
    } catch (err) {
      setError("Erro ao gerar a imagem do template.");
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `bolao_${data.bolaoNumber}.png`;
    link.click();
  };

  return (
    <div className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
      <button
        onClick={handleGenerate}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Gerar Imagem do Bolão
      </button>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {generatedImage && (
        <div>
          <img
            src={generatedImage}
            alt="Imagem do Bolão Gerada"
            className="mb-4 max-w-full border rounded"
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Baixar Imagem
          </button>
        </div>
      )}
    </div>
  );
}
