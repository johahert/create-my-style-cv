import { Plus, FileText, User, Briefcase, GraduationCap, Award, TestTube, Layout } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { CustomSectionForm } from "./forms/CustomSectionForm";
import { CVData } from "./types";
import { LayoutControls } from "./LayoutControls";

interface CVSidebarProps {
  cvData: CVData;
  updatePersonalInfo: (updates: Partial<CVData['personalInfo']>) => void;
  updateSections: (updates: Partial<CVData['sections']>) => void;
  updateLayout: (updates: Partial<CVData['layout']>) => void;
  loadSampleData: () => void;
}

export const CVSidebar = ({ cvData, updatePersonalInfo, updateSections, updateLayout, loadSampleData }: CVSidebarProps) => {
  return (
    <Sidebar className="w-[500px] border-r border-border"> 
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h1 className="font-semibold text-foreground">CV Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          <SidebarMenuButton 
            onClick={loadSampleData}
            className="h-8 w-8 p-0"
            title="Load Sample Data"
          >
            <TestTube className="h-4 w-4" />
          </SidebarMenuButton>
          <SidebarTrigger />
        </div>
      </div>
      
      <SidebarContent>
        <ScrollArea className="flex-1">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 px-4 my-2">
              <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
              <TabsTrigger value="sections" className="text-xs">Sections</TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="px-4 pb-4">
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  Personal Information
                  <User className="h-4 w-4" />
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <PersonalInfoForm 
                    personalInfo={cvData.personalInfo}
                    updatePersonalInfo={updatePersonalInfo}
                  />
                </SidebarGroupContent>
              </SidebarGroup>
            </TabsContent>
            
            <TabsContent value="sections" className="px-4 pb-4 space-y-4">
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Experience
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <ExperienceForm 
                    experience={cvData.sections.experience}
                    updateExperience={(experience) => updateSections({ experience })}
                  />
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <EducationForm 
                    education={cvData.sections.education}
                    updateEducation={(education) => updateSections({ education })}
                  />
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Skills
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SkillsForm 
                    skills={cvData.sections.skills}
                    updateSkills={(skills) => updateSections({ skills })}
                  />
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Custom Sections
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <CustomSectionForm 
                    customSections={cvData.sections.customSections}
                    updateCustomSections={(customSections) => updateSections({ customSections })}
                  />
                </SidebarGroupContent>
              </SidebarGroup>
            </TabsContent>

            <TabsContent value="layout" className="px-4 pb-4">
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  Layout & Sections
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <LayoutControls 
                    customSections={cvData?.sections?.customSections}
                    layout={cvData.layout}
                    updateLayout={updateLayout}
                  />
                </SidebarGroupContent>
              </SidebarGroup>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};