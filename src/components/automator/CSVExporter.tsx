"use client";

import React from "react";
import { saveAs } from "file-saver";

interface CSVExporterProps {
  data: any[];
}

export default function CSVExporter({ data }: CSVExporterProps) {
  const exportCSV = () => {
    if (!data || data.length === 0) {
      alert("Nenhum dado para exportar.");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((fieldName) => JSON.stringify(row[fieldName] ?? "")).join(",")
      ),
    ];

    const csvString = csvRows.join("\r\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "bolao_data.csv");
  };

  return (
    <div className="mt-6">
      <button
        onClick={exportCSV}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Exportar CSV
      </button>
    </div>
  );
}
