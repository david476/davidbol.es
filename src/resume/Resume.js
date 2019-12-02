import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import './pdf_fonts';


// Create styles
const sizing = (f) => (f * 2)
const headingSizing  = (i) => {
  const size = 4 * Math.pow(1.26, 5 - i)
  return {
    marginTop: sizing(size/1.5),
    // marginBottom: sizing(size/3), margins don't collapse properly...
    fontSize: sizing(size),
  }
}

const {page, header, body, p, h1, h2, h3, h4, h5, h6, name, summary, headerLeft, headerRight, bodyLeft, bodyRight} = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: `${sizing(8)} ${sizing(16)}`,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: sizing(8),
  },
  headerLeft: {
    flexGrow: 1,
    paddingRight: sizing(8),
  },
  headerRight: {
    width: sizing(600),
  },
  body: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  bodyLeft: {
    flexGrow: 1,
    paddingRight: sizing(8),
  },
  bodyRight: {
    width: sizing(200),
  },
  p: {
    marginTop: sizing(4),
    // marginBottom: sizing(4), margins don't seem to collapse...
    fontSize: sizing(5),
    fontFamily: 'Lato',
    fontWeight: 400,
  },
  ...Object.assign(...Array.from({length: 6}, (_, i) => ({[`h${i+1}`]: {
      ...headingSizing(i+1),
      fontFamily: 'Roboto Slab',
      fontWeight: 300,
  }}))),
  name: {
    ...headingSizing(-1),
    fontFamily: 'Roboto Slab',
    fontWeight: 300,
  },
  summary: {
    marginTop: sizing(1),
    // marginBottom: sizing(4), margins don't seem to collapse...
    fontSize: sizing(6.25),
    fontFamily: 'Lato',
    fontWeight: 400,
  }
  // section: {
  //   margin: 10,
  //   padding: 10,
  //   flexGrow: 1
  // },
  // name: {
  //   fontFamily: 'Roboto Slab',
  //   fontWeight: 300,
  //   ...headingSizing(0),
  //   // color: '#009cd3',
  // },
  // p: {
  //   fontFamily: 'Lato',
  //   fontWeight: 400,
  //   fontSize: sizing(5),
  //   marginTop: sizing(4),
  //   marginBottom: sizing(4),
  // }
});

// Create Document Component
const Resume = () => (
  <Document>
    <Page size="LETTER" style={page}>
      <View style={header}>
        <View style={headerLeft}>
          <Text style={name}>David Boles</Text>
          <Text style={summary}>College sophomore passionate about designing complex systems across engineering disciplines.</Text>
        </View>
        <View style={headerRight}>
          <Text style={p}>
            Brown University
            69 Brown St., Mail# 4793
            Providence, RI 02912
            (415) 825-2464
            me@davidbol.es
            www.davidbol.es/portfolio
          </Text>
        </View>
      </View>
      <View style={body}>
        <Text style={p}>Evaluated toolchains and technologies for the next iteration of our satellite operating system wofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jo</Text>
        <Text style={p}>Evaluated toolchains and technologies for the next iteration of our satellite operating system wofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jo</Text>
        <Text style={p}>Evaluated toolchains and technologies for the next iteration of our satellite operating system wofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jowofeiwepfijwefoj qwepfijwefp owef powejfpw epfew jo</Text>
      </View>
    </Page>
  </Document>
);

export default Resume