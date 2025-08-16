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
  },
  layout: {
    columns: 1,
    sectionOrder: ["experience", "education", "skills", "customSections"],
    leftColumnSections: [],
    rightColumnSections: []
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

  const updateLayout = (updates: Partial<CVData['layout']>) => {
    setCVData(prev => ({
      ...prev,
      layout: { ...prev.layout, ...updates }
    }));
  };

  const loadSampleData = () => {
    const sampleData: CVData = {
      personalInfo: {
        fullName: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Tech Street, San Francisco, CA 94102",
        summary: "Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring junior developers."
      },
      sections: {
        experience: [
          {
            id: crypto.randomUUID(),
            position: "Senior Software Engineer",
            company: "TechCorp Inc.",
            startDate: "2020",
            endDate: "2024",
            current: false,
            description: "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored 5 junior developers and established coding standards."
          },
          {
            id: crypto.randomUUID(),
            position: "Full Stack Developer",
            company: "StartupXYZ",
            startDate: "2018",
            endDate: "2020",
            current: false,
            description: "Built responsive web applications using React and Node.js. Integrated third-party APIs and payment systems. Collaborated with design team to implement pixel-perfect UIs."
          },
          {
            id: crypto.randomUUID(),
            position: "Software Developer",
            company: "DevSolutions LLC",
            startDate: "2016",
            endDate: "2018",
            current: false,
            description: "Developed REST APIs and database schemas. Implemented automated testing reducing bugs by 40%. Participated in agile development processes and code reviews."
          }
        ],
        education: [
          {
            id: crypto.randomUUID(),
            degree: "Bachelor of Science in Computer Science",
            institution: "Stanford University",
            startDate: "2012",
            endDate: "2016",
            current: false,
            description: "Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Computer Networks."
          },
          {
            id: crypto.randomUUID(),
            degree: "AWS Solutions Architect Certification",
            institution: "Amazon Web Services",
            startDate: "2021",
            endDate: "2021",
            current: false,
            description: "Certified in designing distributed systems on AWS. Expert knowledge in EC2, S3, RDS, Lambda, and CloudFormation."
          }
        ],
        skills: [
          { id: crypto.randomUUID(), name: "JavaScript/TypeScript", level: "Expert" },
          { id: crypto.randomUUID(), name: "React/Next.js", level: "Expert" },
          { id: crypto.randomUUID(), name: "Node.js", level: "Advanced" },
          { id: crypto.randomUUID(), name: "Python", level: "Advanced" },
          { id: crypto.randomUUID(), name: "AWS/Cloud Architecture", level: "Advanced" },
          { id: crypto.randomUUID(), name: "Docker/Kubernetes", level: "Advanced" },
          { id: crypto.randomUUID(), name: "PostgreSQL/MongoDB", level: "Advanced" },
          { id: crypto.randomUUID(), name: "Git/CI/CD", level: "Expert" },
          { id: crypto.randomUUID(), name: "Agile/Scrum", level: "Advanced" },
          { id: crypto.randomUUID(), name: "System Design", level: "Advanced" }
        ],
        customSections: [
          {
            id: crypto.randomUUID(),
            title: "Projects",
            items: [
              {
                id: crypto.randomUUID(),
                title: "E-commerce Platform",
                subtitle: "Full-stack web application",
                date: "2023",
                description: "Built a scalable e-commerce platform handling 10K+ concurrent users. Implemented real-time inventory management and payment processing using Stripe API."
              },
              {
                id: crypto.randomUUID(),
                title: "AI Chat Application",
                subtitle: "Machine Learning Integration",
                date: "2023",
                description: "Developed a chat application with AI-powered responses using OpenAI API. Implemented real-time messaging with WebSocket connections."
              }
            ]
          },
          {
            id: crypto.randomUUID(),
            title: "Achievements",
            items: [
              {
                id: crypto.randomUUID(),
                title: "Employee of the Year",
                subtitle: "TechCorp Inc.",
                date: "2023",
                description: "Recognized for outstanding performance and leadership in delivering critical projects ahead of schedule."
              },
              {
                id: crypto.randomUUID(),
                title: "Hackathon Winner",
                subtitle: "SF Tech Challenge",
                date: "2022",
                description: "Led team to first place in 48-hour hackathon, developing innovative solution for sustainable transportation."
              }
            ]
          }
        ]
      },
      layout: {
        columns: 1,
        sectionOrder: ["experience", "education", "skills", "customSections"],
        leftColumnSections: [],
        rightColumnSections: []
      }
    };
    setCVData(sampleData);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CVSidebar 
          cvData={cvData}
          updatePersonalInfo={updatePersonalInfo}
          updateSections={updateSections}
          updateLayout={updateLayout}
          loadSampleData={loadSampleData}
        />
        <main className="flex-1 bg-muted/20">
          <CVPreview cvData={cvData} />
        </main>
      </div>
    </SidebarProvider>
  );
};