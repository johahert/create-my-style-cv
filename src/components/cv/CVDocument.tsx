import { CVData, CVSections } from "./types";

interface CVDocumentProps {
  cvData: CVData;
}

export const CVDocument = ({ cvData }: CVDocumentProps) => {
  const { personalInfo, sections, layout } = cvData;

  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'experience':
        return sections.experience.length > 0 && (
          <div key="experience" className="cv-section">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {sections.experience.map((exp) => (
                <div key={exp.id} className="cv-item">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                      <h4 className="text-gray-600">{exp.company}</h4>
                    </div>
                    <div className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return sections.education.length > 0 && (
          <div key="education" className="cv-section">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {sections.education.map((edu) => (
                <div key={edu.id} className="cv-item">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <h4 className="text-gray-600">{edu.institution}</h4>
                    </div>
                    <div className="text-sm text-gray-600">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return sections.skills.length > 0 && (
          <div key="skills" className="cv-section">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {sections.skills.map((skill) => (
                <div key={skill.id} className="flex justify-between">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'customSections':
        return sections.customSections.map((section) => (
          <div key={section.id} className="cv-section">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id} className="cv-item">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      {item.subtitle && (
                        <h4 className="text-gray-600">{item.subtitle}</h4>
                      )}
                    </div>
                    {item.date && (
                      <div className="text-sm text-gray-600">{item.date}</div>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ));

      default:
        return null;
    }
  };

  if (layout.columns === 1) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-4 cv-section">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="cv-section">
            <h2 className="text-xl font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Render sections in order */}
        {layout.sectionOrder.map(sectionKey => renderSection(sectionKey))}
      </div>
    );
  }

  // Two column layout
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 cv-section">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="cv-section">
          <h2 className="text-xl font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Two column content */}
      <div className="grid grid-cols-2 gap-8 cv-section">
        <div className="space-y-6">
          {layout.leftColumnSections.map(sectionKey => renderSection(sectionKey))}
        </div>
        <div className="space-y-6">
          {layout.rightColumnSections.map(sectionKey => renderSection(sectionKey))}
        </div>
      </div>
    </div>
  );
};