import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { CVData } from "./types";

// --- STYLES ---
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#333',
  },
  // Layout containers
  twoColumnContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  mainColumn: {
    flex: 2, // Takes up 2/3 of the space
  },
  sidebarColumn: {
    flex: 1, // Takes up 1/3 of the space
  },
  // Header styles
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottom: '2px solid #333',
    paddingBottom: 10,
  },
  fullName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9,
  },
  summary: {
    marginTop: 10,
    textAlign: 'left',
  },
  // Section styles
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: '1px solid #ccc',
    paddingBottom: 3,
  },
  // Item styles (for experience, education, etc.)
  item: {
    marginBottom: 10,
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 10,
  },
  itemDate: {
    fontSize: 9,
  },
  itemDescription: {
    fontSize: 10,
    marginTop: 4,
  },
  // Skills styles
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});


// --- HELPER COMPONENT TO RENDER A SINGLE SECTION ---
// This works just like your old `renderSection` function
const SectionRenderer = ({ sectionKey, cvData }: { sectionKey: string, cvData: CVData }) => {
  const { sections } = cvData;

  switch (sectionKey) {
    case 'experience':
      return sections.experience && sections.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {sections.experience.map((job) => (
            <View key={job.id} style={styles.item} wrap={false}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemTitle}>{job.position}</Text>
                  <Text style={styles.itemSubtitle}>{job.company}</Text>
                </View>
                <Text style={styles.itemDate}>{job.startDate} - {job.current ? "Present" : job.endDate}</Text>
              </View>
              {job.description && <Text style={styles.itemDescription}>{job.description}</Text>}
            </View>
          ))}
        </View>
      );

    case 'education':
      return sections.education && sections.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {sections.education.map((edu) => (
            <View key={edu.id} style={styles.item} wrap={false}>
              <View style={styles.itemHeader}>
                 <View>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                </View>
                <Text style={styles.itemDate}>{edu.startDate} - {edu.current ? "Present" : edu.endDate}</Text>
              </View>
               {edu.description && <Text style={styles.itemDescription}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      );

    case 'skills':
       return sections.skills && sections.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
             {sections.skills.map(skill => (
                <Text key={skill.id}>{skill.name}</Text>
             ))}
          </View>
        </View>
      );
    
    case 'customSections':
        return sections.customSections?.map((section) => (
            <View key={section.id} style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item) => (
                    <View key={item.id} style={styles.item} >
                        <View style={styles.itemHeader}>
                            <View>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                {item.subtitle && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
                            </View>
                            {item.date && <Text style={styles.itemDate}>{item.date}</Text>}
                        </View>
                        {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
                    </View>
                ))}
            </View>
        ));

    default:
      return null;
  }
};


// --- MAIN DOCUMENT COMPONENT ---
export const MyCVDocument = ({ cvData }: { cvData: CVData }) => {
  const { personalInfo, layout } = cvData;

  // Provide default empty arrays to prevent errors if the layout data is missing
  const sectionOrder = layout?.sectionOrder || [];
  const leftColumnSections = layout?.leftColumnSections || [];
  const rightColumnSections = layout?.rightColumnSections || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.fullName}>{personalInfo.fullName || "Your Name"}</Text>
          <Text style={styles.contactInfo}>
            {personalInfo.email}
            {personalInfo.phone && ` | ${personalInfo.phone}`}
            {personalInfo.address && ` | ${personalInfo.address}`}
          </Text>
        </View>

        {/* Summary (always full width) */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Conditional Layout Rendering */}
        {layout.columns === 2 ? (
          // --- TWO COLUMN LAYOUT ---
          <View style={styles.twoColumnContainer}>
            <View style={styles.mainColumn}>
              {leftColumnSections.map(key => <SectionRenderer key={key} sectionKey={key} cvData={cvData} />)}
            </View>
            <View style={styles.sidebarColumn}>
              {rightColumnSections.map(key => <SectionRenderer key={key} sectionKey={key} cvData={cvData} />)}
            </View>
          </View>
        ) : (
          // --- SINGLE COLUMN LAYOUT ---
          <View>
            {sectionOrder.map(key => <SectionRenderer key={key} sectionKey={key} cvData={cvData} />)}
          </View>
        )}
      </Page>
    </Document>
  );
};
