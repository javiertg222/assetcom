import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Crear styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Crear el componente MyDocument
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Activos</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
