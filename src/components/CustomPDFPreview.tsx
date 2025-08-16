import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { pdf } from '@react-pdf/renderer';
// New, correct paths
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the PDF.js worker
// You might need to copy the worker file from 'pdfjs-dist/build/pdf.worker.min.js' to your public folder
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;


export const CustomPDFPreview = ({ documentComponent }) => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);

  // 1. Generate the PDF blob whenever the document component changes
  useEffect(() => {
    const generateBlob = async () => {
      const blob = await pdf(documentComponent).toBlob();
      setPdfBlob(blob);
    };
    generateBlob();
  }, [documentComponent]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!pdfBlob) {
    return <div className='h-screen w-full bg-red-400'> Loading preview...</div>;
  }

  return (
    // 2. This is your custom frame. Style it however you want!
    <div className="inline-block bg-white border-2">
      <Document
        file={pdfBlob}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* 3. Loop through and render all pages */}
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false} // Improves performance for preview
            renderAnnotationLayer={false} // Hides annotations
          />
        ))}
      </Document>
    </div>
  );
};