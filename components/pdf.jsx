'use client'
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, pdf} from '@react-pdf/renderer';

// Font.register({ family: 'Times-Roman', src: "https://fonts.cdnfonts.com/css/times-new-roman" });
Font.register({ family: 'Times-Roman', src:"https://fonts.cdnfonts.com/css/noto-serif"})
Font.register({ family: 'Times-Bold', src:"https://fonts.cdnfonts.com/css/noto-serif"})
Font.register({ family: 'Times-Italic', src:"https://fonts.cdnfonts.com/css/noto-serif"})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Times-Roman"
  },
  header: {
    fontFamily: "Times-Roman",
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 1,
  },
  subHeader: {
    fontFamily: "Times-Roman",
    textAlign: 'center',
    marginBottom: 1,
  },
  sectionHeader: {
    fontFamily: "Times-Roman",
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 1,
  },
  bulletPoint: {
    fontFamily: "Times-Roman",
    marginBottom: 2,
  },
  text: {
    fontFamily: "Times-Roman"
  },
  company: {
    fontFamily: "Times-Bold",
    fontStyle: "bold",
    flex: 1,
    textAlign: 'left',
  },
  location: {
    fontFamily: "Times-Roman",
    fontStyle: "bold",
    flex: 1,
    textAlign: 'right',
  },
  jobTitle: {
    fontFamily: "Times-Italic",
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'left',
  },
  dateRange: {
    fontFamily: "Times-Roman",
    flex: 1,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  space: {
    marginBottom: 10
  },
  bolded: {
    fontFamily: "Times-Bold",
    fontStyle:"bold"
  }
});

const BulletPoint = ({ text }) => (
  <Text style={styles.bulletPoint}>• {text}</Text>
);

const Item = ({ item }) => (
  <View style={styles.space}>
    <View style={styles.row}>
      {styles.company && (
          <Text style={styles.company}>
            {item.company}
          </Text>
      )}
      {styles.location && (
        <Text style={styles.location}>
          {item.location}
        </Text>
      )}
    </View>
    <View style={styles.row}>
      <Text style={[styles.jobTitle, item.type === 'project' && styles.bolded]}>
        {item.title}
      </Text>
      <Text style={styles.dateRange}>
        {item.start} - {item.end}
      </Text>
    </View>
    {item.description.map((text, index) => (
      <BulletPoint key={index} text={text} />
    ))}
  </View>
);

const EducationSection = ({ info }) => (
  <View>
      <View style={styles.row}>
        <Text style={styles.company}>
          {info.institution}
        </Text>
        <Text style={styles.location}>
        {info.location}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bolded}>Major: </Text>
        <Text style={styles.itemSubtitle}>
          {info.degree} in {info.major}
        </Text>
        <Text style={styles.location}>
          {info.start} - {info.end}
        </Text>
      </View>
    <BulletPoint text={`Relevant Coursework: ${info.relevantCoursework.join(', ')}`} />
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

      <View style={styles.space}>
        <Text style={styles.sectionHeader}>EDUCATION</Text>
        <EducationSection info={bio.Education} />
      </View>

      {Object.keys(data).map((sectionKey) => (
        <View style={styles.space} key={sectionKey}>  {/* Here's where the space style is applied */}
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
