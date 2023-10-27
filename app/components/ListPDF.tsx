import React, { useEffect, useState } from "react";
import UploadPDF from "./UploadPDF";

const ListPDF = ({ endpoint }: { endpoint: string }) => {
  const [pdfs, setPDFs] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUploadPDFs = async () => {
    setLoading(true);
    const res = await fetch(endpoint + "list");
    const data = await res.json();
    setPDFs(data.files);
    setLoading(false);
  };
  useEffect(() => {
    getUploadPDFs();
  }, []);
  return (
    <div>
      <h2 className="font-bold mt-12 text-2xl">Uploaded PDFs</h2>

      {loading ? (
        <div className="mt-4">
          <p>Loading...</p>
        </div>
      ) : pdfs.length < 1 ? <p>No document yet</p> : (
        <ul className="mt-4 list-disc pl-5 grid grid-cols-3 gap-3">
          {pdfs.map((pdf: any, i: number) => (
            <li className="font-roboto" key={i}>{pdf}</li>
          ))}
        </ul>
      )}
      <UploadPDF  endpoint={endpoint} getPdfs={getUploadPDFs} />
    </div>
  );
};

export default ListPDF;
