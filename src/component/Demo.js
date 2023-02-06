import React from "react";
import { useRef } from "react";
import jsPDF from "jspdf";
import TextPdf from "./TextPdf";

const Demo = () => {
  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      width: "100%",
    });

    doc.html(reportTemplateRef.current, {
      callback(doc) {
        doc.save("document");
      },
    });
  };

  return (
    <div>
      <button className="button" onClick={handleGeneratePdf}>
        Generate PDF
      </button>
      <div ref={reportTemplateRef}>
        <TextPdf />
      </div>
    </div>
  );
};

export default Demo;
