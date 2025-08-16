import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { CVData } from "./types";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: '2px solid #eeeeee',
    paddingBottom: 3,
  },
  // Add more styles for experience, education, etc.
});

interface MyCVDocumentProps {
  cvData: CVData;
}

// Create Document Component
export const MyCVDocument = ({ cvData }: MyCVDocumentProps) => {
    const { personalInfo, sections } = cvData;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.fullName}>{personalInfo.fullName}</Text>
                    <Text>{personalInfo.email} | {personalInfo.phone} | {personalInfo.address}</Text>
                    <Text>{personalInfo.summary}</Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional Experience</Text>
                    {(sections?.experience || []).map((job, index) => (
                        <View key={index} style={{ marginBottom: 10 }} wrap={false}>
                            <Text style={{ fontWeight: 'bold' }}>{job.position} at {job.company}</Text>
                            <Text>{job.startDate} - {job.endDate}</Text>
                            <Text>{job.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {(sections?.education || []).map((edu, index) => (
                        <View key={index} style={{ marginBottom: 10 }} wrap={false}>
                            <Text style={{ fontWeight: 'bold' }}>{edu.degree} at {edu.institution}</Text>
                            <Text>{edu.startDate} - {edu.endDate}</Text>
                            <Text>{edu.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <Text>{(sections?.skills?.map(skill => skill.name) || []).join(', ')}</Text>
                </View>

                {sections?.customSections?.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {(section.items || []).map((item, itemIdx) => (
                            <View key={itemIdx} style={{ marginBottom: 8 }} wrap={false}>
                                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                {item.description && <Text>{item.description}</Text>}
                            </View>
                        ))}
                    </View>
                ))}

            </Page>
        </Document>
    );
};