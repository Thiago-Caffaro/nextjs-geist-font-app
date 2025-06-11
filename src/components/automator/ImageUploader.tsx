"use client";

import React, { useState } from "react";

interface ImageUploaderProps {
  onComplete: (data: any) => void;
}

export default function ImageUploader({ onComplete }: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);

    const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews(previewsArray);

    // For now, just call onComplete with file info placeholder
    filesArray.forEach((file, index) => {
      onComplete({
        fileName: file.name,
        fileIndex: index,
        status: "uploaded",
      });
    });
  };

  return (
    <div className="mb-6">
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
      <div className="mt-4 grid grid-cols-4 gap-4">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="w-full h-32 object-contain rounded border"
          />
        ))}
      </div>
    </div>
  );
}
