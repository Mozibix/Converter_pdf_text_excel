import jsPDF from "jspdf";
import React, { useRef } from "react";
import "jspdf-autotable";
import studentData from "../userdata";
import { useDownloadExcel } from "react-export-table-to-excel";

const Tables = () => {
  const tableRef = useRef(null);
  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Age", field: "age", type: "numeric" },
    { title: "Year", field: "year", type: "numeric" },
    { title: "Fee", field: "fee", type: "currency" },
  ];

  const downloadExcel = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "table data",
    sheet: "spreadsheet",
  });

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Table Data", 20, 10);
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: studentData,
    });
    doc.save("table-pdf");
  };
  return (
    <>
      <table ref={tableRef}>
        <tbody>
          <tr>
            {columns.map((col) => {
              return <th>{col.title}</th>;
            })}
          </tr>
          {studentData.map((data) => {
            return (
              <tr>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
                <td>{data.year}</td>
                <td>{data.fee}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={() => downloadExcel.onDownload()}>
        DownLoad Excel Docs
      </button>
      <button onClick={downloadPdf}>DownLoad Pdf Docs</button>
    </>
  );
};

export default Tables;
