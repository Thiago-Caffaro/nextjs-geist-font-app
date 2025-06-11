interface ProcessedTicketData {
  bolaoNumber: string;
  cotas: string;
  dezenas: string;
  valor: string;
  data: string;
  terminal: string;
  combinacao: string;
}

export function processOCRText(text: string): ProcessedTicketData {
  const lines = text.split('\n').map(line => line.trim());
  
  // Initialize data object
  const data: ProcessedTicketData = {
    bolaoNumber: '',
    cotas: '',
    dezenas: '',
    valor: '',
    data: '',
    terminal: '',
    combinacao: ''
  };

  // Process each line to extract information
  lines.forEach(line => {
    // Extract cotas (e.g., "COTA 4/9")
    if (line.includes('COTA')) {
      data.cotas = line.replace('COTA', '').trim();
    }
    
    // Extract dezenas (numbers after "A" and before "SU")
    if (line.includes('A') && line.includes('SU')) {
      data.dezenas = line
        .substring(line.indexOf('A') + 1, line.indexOf('SU'))
        .trim()
        .replace(/\s+/g, ',');
    }

    // Extract valor (price)
    if (line.includes('VALOR DA COTA:')) {
      data.valor = line
        .replace('VALOR DA COTA:', '')
        .replace('R$', '')
        .trim();
    }

    // Extract date and time
    if (line.includes('JUN2025')) {
      data.data = line.split('HORA')[0].trim();
    }

    // Extract terminal number
    if (line.includes('TERMINAL')) {
      data.terminal = line.split('TERMINAL')[1].trim();
    }

    // Extract combinação
    if (line.includes('COMBINADA')) {
      data.combinacao = line.replace('COMBINADA', '').trim();
    }
  });

  return data;
}
