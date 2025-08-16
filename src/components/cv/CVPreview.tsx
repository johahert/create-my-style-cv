import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { CVDocument } from "./CVDocument";
import { CVData } from "./types";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview = ({ cvData }: CVPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      toast("Generating PDF...");
      
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Calculate how many pages we need
      const totalHeight = imgHeight * ratio;
      const pagesNeeded = Math.ceil(totalHeight / pdfHeight);

      for (let i = 0; i < pagesNeeded; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const sourceY = i * (imgHeight / pagesNeeded);
        const sourceHeight = imgHeight / pagesNeeded;
        
        // Create a new canvas for each page
        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;
        
        if (pageCtx) {
          pageCtx.drawImage(
            canvas, 
            0, sourceY, imgWidth, sourceHeight,
            0, 0, imgWidth, sourceHeight
          );
          
          const pageImgData = pageCanvas.toDataURL("image/png");
          pdf.addImage(pageImgData, "PNG", imgX, imgY, imgWidth * ratio, sourceHeight * ratio);
        }
      }

      const fileName = `${cvData.personalInfo.fullName || "CV"}.pdf`;
      pdf.save(fileName);
      toast("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">CV Preview</h2>
        </div>
        <Button onClick={downloadPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-8 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={previewRef}
            className="bg-white shadow-lg min-h-[297mm] w-[210mm] mx-auto p-8"
            style={{ 
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "12px",
              lineHeight: "1.4"
            }}
          >
            <CVDocument cvData={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
};