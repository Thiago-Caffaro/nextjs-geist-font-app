export interface TemplateData {
  bolaoNumber: string;
  cotas: string;
  dezenas: string;
  jogos: string;
  sorteioDate: string;
  valor: string;
  loteriaNome: string;
  loteriaLogoUrl: string;
  contato: string;
}

export async function generateTemplateImage(
  templateImageUrl: string,
  data: TemplateData
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject("Canvas context not available");
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the template background
      ctx.drawImage(image, 0, 0);

      // Set text styles
      ctx.fillStyle = "#000000";
      ctx.font = "bold 24px Arial";
      ctx.textBaseline = "top";

      // Draw bolao number at top left
      ctx.fillText(`Bolão Nº: ${data.bolaoNumber}`, 20, 20);

      // Draw other info at fixed positions (example positions)
      ctx.font = "20px Arial";
      ctx.fillText(`Cotas: ${data.cotas}`, 20, 60);
      ctx.fillText(`Dezenas: ${data.dezenas}`, 20, 90);
      ctx.fillText(`Jogos: ${data.jogos}`, 20, 120);
      ctx.fillText(`Sorteio: ${data.sorteioDate}`, 20, 150);
      ctx.fillText(`Valor: ${data.valor}`, 20, 180);

      // Draw loteria name and contato at bottom left
      ctx.font = "18px Arial";
      ctx.fillText(data.loteriaNome, 20, canvas.height - 80);
      ctx.fillText(`Contato: ${data.contato}`, 20, canvas.height - 50);

      // Draw loteria logo at bottom right
      if (data.loteriaLogoUrl) {
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.onload = () => {
          const logoWidth = 100;
          const logoHeight = 50;
          ctx.drawImage(
            logo,
            canvas.width - logoWidth - 20,
            canvas.height - logoHeight - 20,
            logoWidth,
            logoHeight
          );
          resolve(canvas.toDataURL("image/png"));
        };
        logo.onerror = () => {
          // If logo fails to load, still resolve without logo
          resolve(canvas.toDataURL("image/png"));
        };
        logo.src = data.loteriaLogoUrl;
      } else {
        resolve(canvas.toDataURL("image/png"));
      }
    };
    image.onerror = () => {
      reject("Failed to load template image");
    };
    image.src = templateImageUrl;
  });
}
