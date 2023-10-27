import React, { useState } from "react";
import { toast } from "react-toastify";

const UploadPDF = ({ endpoint,getPdfs }: { endpoint: string, getPdfs: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("file", e.target.pdf.files[0]);
    try {
      const res = await fetch(endpoint + "upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      // reset form after submit
      e.target.reset();
      getPdfs();
      toast("File uploaded successfully", {type: "success"});
    } catch (err:any) {
        toast(err.response.data.message, {type: "error"});
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="font-bold mt-12 text-2xl mb-4">Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="pdf" accept="application/pdf" required className="font-roboto" />
        <button
          type="submit"
          disabled={loading}
          className="bg-black px-6 py-2 rounded-md"
        >
          {loading ? "Loading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadPDF;
