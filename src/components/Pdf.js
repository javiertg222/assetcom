import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import AlertData from "./AlertData";

const Pdf = () => (
  <PDFDownloadLink document={<MyDocument />} fileName={new Date()+".pdf"}>
    {(blob, url, loading, error) =>
      error
        ? AlertData("Algo ha salido mal...", "danger")
        : AlertData(
            loading ? "Loading document..." : "Descarga aquí!",
            "success"
          )
    }
  </PDFDownloadLink>
);

export default Pdf;
