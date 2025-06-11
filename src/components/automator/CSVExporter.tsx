"use client";

import React from "react";

interface CSVExporterProps {
  data: any[];
}

export default function CSVExporter({ data }: CSVExporterProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    // Define the order of fields we want in the CSV
    const fields = [
      'cotas',
      'valor',
      'data',
      'terminal',
      'combinacao',
      'dezenas',
      'fileName'
    ];

    // Create headers with friendly names
    const headers = [
      'Cotas',
      'Valor',
      'Data',
      'Terminal',
      'Combinação',
      'Dezenas',
      'Arquivo'
    ].join(',');

    // Create rows with processed data
    const rows = data.map(item => {
      const processedData = item.processedData || {};
      return fields.map(field => {
        // Handle special cases
        if (field === 'fileName') return item.fileName || '';
        if (field === 'valor' && processedData[field]) return `R$ ${processedData[field]}`;
        return processedData[field] || '';
      }).join(',');
    });

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bolao_data_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <button
      onClick={handleExport}
      disabled={data.length === 0}
      className={`px-4 py-2 rounded ${
        data.length === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white`}
    >
      Exportar {data.length} {data.length === 1 ? 'Bolão' : 'Bolões'} para CSV
    </button>
  );
}
