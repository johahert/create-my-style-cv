import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { CVDocument } from "./CVDocument"; // Your HTML preview component
import { MyCVDocument } from "./MyCVDocument"; // Your new PDF document component
import { CVData } from "./types";
import { CustomPDFPreview } from "../CustomPDFPreview";
import { useDebounce } from "@/hooks/use-debounce";
import { useMemo } from "react";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview = ({ cvData }: CVPreviewProps) => {
  const fileName = `${cvData.personalInfo.fullName || "CV"}.pdf`;

  const debouncedCVData = useDebounce(cvData, 1000);

  const cvDocumentInstance = useMemo(() => (
    <MyCVDocument cvData={debouncedCVData} />
  ), [debouncedCVData]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">CV Preview</h2>

        {/* This creates a download button that generates the PDF on the fly */}
        <PDFDownloadLink document={<MyCVDocument cvData={cvData} />} fileName={fileName}>
          {({ loading }) => (
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          )}
        </PDFDownloadLink>

      </div>
      
      {/* Your existing HTML preview for the screen */}
       <div className="flex-1 overflow-auto p-8 bg-muted/20">
        <div className="max-w-2xl mx-auto">
          <CustomPDFPreview documentComponent={cvDocumentInstance} />
        </div>
      </div>
    </div>
  );
};