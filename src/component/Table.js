import jsPDF from "jspdf";
import React, { useRef } from "react";
import "jspdf-autotable";
import studentData from "../userdata";
import { useDownloadExcel } from "react-export-table-to-excel";
import html2canvas from "html2canvas";

const Tables = () => {
  const tableRef = useRef(null);
  const inputRef = useRef(null);
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

  const downloadText = () => {
    const textP = document.querySelector("#text-p");

    // console.log(text.innerText);
    const doc = new jsPDF("p", "in", "a4");
    let textlines = doc
      .setFontSize(12)
      .splitTextToSize(inputRef.current.innerText, 7.5);

    let verticalOffset = 0.5;
    doc.text(0.5, (verticalOffset = 12 / 72), textlines);
    verticalOffset += ((textlines.length + 0.5) * 12) / 72;
    doc.save("text.pdf");
  };
  return (
    <>
      <div ref={inputRef}>
        <p id="text-p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odio
          porro magnam ut esse odit. Sequi obcaecati, laborum sed esse tempora
          dicta, atque ullam necessitatibus velit voluptas quaerat officiis
          aperiam illum corrupti ea temporibus aut officia rem vitae cupiditate.
          Ipsa incidunt nemo nostrum ex maiores laudantium id harum adipisci.
          Officia?
        </p>
        <p>
          Iure doloremque, exercitationem impedit quo eos animi, autem velit et
          ratione non omnis repudiandae suscipit corrupti excepturi nisi aut
          maxime molestiae nihil fugit libero cumque rem officiis voluptates.
          Commodi, quia nisi hic laudantium alias fuga reprehenderit animi
          tempora perferendis explicabo libero distinctio. Et qui eveniet aut,
          nostrum incidunt ipsam eius?
        </p>
        <p>
          Atque sint aperiam reprehenderit? Tempora iure pariatur illum dicta
          quisquam dolorem in laborum minima repudiandae fuga repellendus
          excepturi, quam vel ut recusandae explicabo, illo beatae voluptates
          dolore reiciendis facilis. Aliquam, magnam culpa eveniet assumenda
          fugit eligendi, odit labore beatae corrupti laborum suscipit at
          provident quis omnis quam praesentium, reprehenderit alias.
        </p>
        <p>
          Error commodi magnam enim aliquam illum. Illum magni quidem quas ullam
          totam sed aliquam. Sunt optio quasi ratione voluptate beatae ipsa
          molestias quisquam ipsam quo temporibus perspiciatis incidunt
          voluptatibus praesentium nam maxime pariatur nesciunt animi, provident
          reprehenderit vero obcaecati harum! Dignissimos ipsum explicabo et
          cupiditate ab minima impedit quia exercitationem.
        </p>
        <p>
          Quis recusandae nobis eius facere perspiciatis explicabo totam minima
          sed voluptas molestiae deleniti hic ad doloribus quae sequi mollitia,
          cumque unde eos. Nihil nostrum illum ratione, quibusdam exercitationem
          eos qui modi atque accusantium, nobis iure aliquid perspiciatis ipsam
          dicta iusto possimus magnam doloribus aliquam ducimus quia id?
          Repudiandae, rem quo!
        </p>
      </div>
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
      <button onClick={downloadText}>DownLoad text pdf</button>
    </>
  );
};

export default Tables;
