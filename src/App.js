import { PDFViewer } from "@react-pdf/renderer";
import Demo from "./component/Demo";
import Tables from "./component/Table";
import { TextPdf } from "./component/TextPdf";

function App() {
  return (
    <div className="App">
      <Tables />
      {/* <Demo />{" "} */}
    </div>
  );
}

export default App;
