"use client";

import React, { useState } from "react";
import ImageUploader from "@/components/automator/ImageUploader";
import CSVExporter from "@/components/automator/CSVExporter";
import ThemeToggle from "@/components/ThemeToggle";

export default function AutomatorPage() {
  const [processedData, setProcessedData] = useState([]);

  const handleProcessingComplete = (data) => {
    setProcessedData((prev) => [...prev, data]);
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Automação de Bolões</h1>
        <ThemeToggle />
      </div>
      <ImageUploader onComplete={handleProcessingComplete} />
      <CSVExporter data={processedData} />
    </div>
  );
}
