"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedAreaPixels: Area) => void;
}

export default function ImageCropper({ imageSrc, onCropComplete }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropCompleteCallback = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  return (
    <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropCompleteCallback}
        cropShape="rect"
        showGrid={true}
      />
      <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
