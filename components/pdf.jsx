'use client'
import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf} from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeader: {
    textAlign: 'center',
    marginBottom: 5,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSubtitle: {
    marginBottom: 5,
  },
  bulletPoint: {
    marginBottom: 5,
  },
  text:{
    fontFamily:"Times-Roman"
  }
});

const BulletPoint = ({ text }) => (
  <Text style={styles.bulletPoint}>• {text}</Text>
);

const Item = ({ item }) => (
  <View>
    <Text style={styles.itemTitle}>
      {item.company} - {item.location}
    </Text>
    <Text style={styles.itemSubtitle}>
      {item.title} ({item.start} - {item.end})
    </Text>
    {item.description.map((text, index) => (
      <BulletPoint key={index} text={text} />
    ))}
  </View>
);

const EducationSection = ({ info }) => (
  <View>
    <Text style={styles.itemTitle}>
      {info.institution} - {info.location}
    </Text>
    <Text style={styles.itemSubtitle}>
      {info.degree} in {info.major} ({info.start} - {info.end})
    </Text>
    <Text>
      Relevant Coursework: {info.relevantCoursework.join(', ')}
    </Text>
  </View>
);

const ResumePDF = ({ data, bio }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{bio.Bio.name}</Text>
      <Text style={styles.subHeader}>{bio.Bio.address}</Text>
      <Text style={styles.subHeader}>
        {bio.Bio.phone} | {bio.Bio.email}
        {bio.Bio.website && ` | ${bio.Bio.website}`}
      </Text>

      <Text style={styles.sectionHeader}>EDUCATION</Text>
      <EducationSection info={bio.Education} />

      {Object.keys(data).map((sectionKey) => (
        <View key={sectionKey}>
          <Text style={styles.sectionHeader}>{sectionKey.toUpperCase()}</Text>
          {data[sectionKey].map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export default ResumePDF;
