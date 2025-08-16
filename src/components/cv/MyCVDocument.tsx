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
export const MyCVDocument = ({ cvData }: MyCVDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.fullName}>{cvData.personalInfo.fullName}</Text>
        <Text>{cvData.personalInfo.email} | {cvData.personalInfo.phone}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {(cvData?.sections?.experience || []).map((job, index) => (
          // Add wrap={false} to a View to prevent it from splitting across pages
          <View key={index} style={{ marginBottom: 10 }} wrap={false}>
            <Text style={{ fontWeight: 'bold' }}>{job.position} at {job.company}</Text>
            <Text>{job.startDate} - {job.endDate}</Text>
            <Text>{job.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {(cvData?.sections?.experience || []).map((job, index) => (
          // Add wrap={false} to a View to prevent it from splitting across pages
          <View key={index} style={{ marginBottom: 10 }} wrap={false}>
            <Text style={{ fontWeight: 'bold' }}>{job.position} at {job.company}</Text>
            <Text>{job.startDate} - {job.endDate}</Text>
            <Text>{job.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {(cvData?.sections?.experience || []).map((job, index) => (
          // Add wrap={false} to a View to prevent it from splitting across pages
          <View key={index} style={{ marginBottom: 10 }} wrap={false}>
            <Text style={{ fontWeight: 'bold' }}>{job.position} at {job.company}</Text>
            <Text>{job.startDate} - {job.endDate}</Text>
            <Text>{job.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {(cvData?.sections?.experience || []).map((job, index) => (
          // Add wrap={false} to a View to prevent it from splitting across pages
          <View key={index} style={{ marginBottom: 10 }} wrap={false}>
            <Text style={{ fontWeight: 'bold' }}>{job.position} at {job.company}</Text>
            <Text>{job.startDate} - {job.endDate}</Text>
            <Text>{job.description}</Text>
          </View>
        ))}
      </View>

      {/* Add other sections like Education, Skills, etc. */}
    </Page>
  </Document>
);