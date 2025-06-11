"use client";

import React, { useState } from "react";
import OCRProcessor from "./OCRProcessor";

interface ImageUploaderProps {
  onComplete: (data: any) => void;
}

export default function ImageUploader({ onComplete }: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);

    const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews(previewsArray);
  };

  const handleProcessImages = () => {
    if (selectedFiles.length > 0) {
      setIsProcessing(true);
      setCurrentImageIndex(0);
    }
  };

  const handleImageProcessed = (result: any) => {
    onComplete({
      fileName: selectedFiles[currentImageIndex!].name,
      fileIndex: currentImageIndex,
      ...result
    });

    if (currentImageIndex! < selectedFiles.length - 1) {
      setCurrentImageIndex(currentImageIndex! + 1);
    } else {
      setIsProcessing(false);
      setCurrentImageIndex(null);
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div>
        <label className="block mb-2 font-semibold">Upload de Imagens (Múltiplas)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
      </div>

      {selectedFiles.length > 0 && !isProcessing && (
        <button
          onClick={handleProcessImages}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Processar {selectedFiles.length} {selectedFiles.length === 1 ? 'Imagem' : 'Imagens'}
        </button>
      )}

      <div className="mt-4 grid grid-cols-4 gap-4">
        {previews.map((src, idx) => (
          <div key={idx} className="relative">
            <img
              src={src}
              alt={`preview-${idx}`}
              className={`w-full h-32 object-contain rounded border ${
                currentImageIndex === idx ? 'border-blue-500 border-2' : ''
              }`}
            />
            {idx < currentImageIndex! && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                <span className="text-white">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {isProcessing && currentImageIndex !== null && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold mb-2">
            Processando imagem {currentImageIndex + 1} de {selectedFiles.length}
          </h3>
          <OCRProcessor
            imageDataUrl={previews[currentImageIndex]}
            onResult={handleImageProcessed}
          />
        </div>
      )}
    </div>
  );
}
