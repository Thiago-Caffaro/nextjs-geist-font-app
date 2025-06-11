# Lottery Ticket Automation Tool

This is a web-based automation tool for processing lottery tickets, built with Next.js and React. It features batch image processing, OCR text extraction, template generation, and CSV export capabilities.

## Prerequisites

- Node.js (version 16 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lottery-automation
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

Note: We use `--legacy-peer-deps` to handle some dependency conflicts.

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:8000
```

## Features

- Batch image upload for lottery tickets
- Image cropping and alignment tools
- OCR text extraction from tickets
- Template-based image generation
- CSV export of processed data
- Light/Dark mode support

## Project Structure

```
src/
├── app/
│   ├── automator/
│   │   └── page.tsx         # Main automation page
│   └── globals.css          # Global styles
├── components/
│   └── automator/
│       ├── ImageUploader.tsx    # Batch image upload
│       ├── ImageCropper.tsx     # Image cropping
│       ├── OCRProcessor.tsx     # OCR processing
│       ├── TemplateGenerator.tsx # Template generation
│       └── CSVExporter.tsx      # CSV export
├── lib/
│   ├── ocr.ts              # OCR service
│   └── templateGenerator.ts # Template generation service
```

## Usage

1. Upload lottery ticket images using the batch upload feature
2. Crop and align images as needed
3. OCR will automatically extract text from the images
4. Review and edit extracted data if necessary
5. Generate template-based images with the extracted data
6. Export all processed data to CSV

## Development

To add new features or modify existing ones:

1. Make your changes in the relevant components
2. Test using `npm run dev`
3. Build for production using `npm run build`

## Building for Production

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Dependencies

Main dependencies include:
- Next.js
- React
- Tesseract.js (OCR)
- react-easy-crop (Image cropping)
- file-saver (CSV export)

For a complete list, see `package.json`.
