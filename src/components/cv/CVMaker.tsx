import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CVSidebar } from "./CVSidebar";
import { CVPreview } from "./CVPreview";
import { CVData } from "./types";

const initialCVData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: ""
  },
  sections: {
    experience: [],
    education: [],
    skills: [],
    customSections: []
  }
};

export const CVMaker = () => {
  const [cvData, setCVData] = useState<CVData>(initialCVData);

  const updateCVData = (updates: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...updates }));
  };

  const updatePersonalInfo = (updates: Partial<CVData['personalInfo']>) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }));
  };

  const updateSections = (updates: Partial<CVData['sections']>) => {
    setCVData(prev => ({
      ...prev,
      sections: { ...prev.sections, ...updates }
    }));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CVSidebar 
          cvData={cvData}
          updatePersonalInfo={updatePersonalInfo}
          updateSections={updateSections}
        />
        <main className="flex-1 bg-muted/20">
          <CVPreview cvData={cvData} />
        </main>
      </div>
    </SidebarProvider>
  );
};