import React, { useState } from "react";
import { toast } from "react-toastify";

const Inquire = ({ endpoint }: { endpoint: string }) => {
  const [loading, setLoading] = useState(false);
  const [answer, setAns] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setAns(null)

    let pdfNames = e.target.pdf.value;
    if (pdfNames) {
      pdfNames = pdfNames.split(",");
    }
    else{
        pdfNames = []
    }

    const formdata = {
        question: e.target.question.value,
        doc_ids: pdfNames
    }

    try {
      const res = await fetch(endpoint + "inquire", {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setAns(data.answer);
      e.target.reset();
    } catch (err:any) {
        toast(err.response.data.message, {type: "error"});
    }
    setLoading(false)

  };

  return (
    <>
      <div className="bg-black bg-opacity-25 p-5 mt-12 rounded-md">
        <h2 className="font-bold text-2xl mb-4">Inquire from your PDF</h2>

        <form onSubmit={handleSubmit}>
          <label
            className="block mb-2 mt-5 text-opacity-50 font-roboto"
            htmlFor="question"
          >
            Question
          </label>
          <input
            type="text"
            name="question"
            placeholder="What would you like to inquire from your PDFs"
            className="w-full px-4 py-2 rounded-md font-roboto text-black"
            required
          />

          <label
            className="block mb-2 text-opacity-50 mt-5 font-roboto"
            htmlFor="pdf"
          >
            PDF filename (Optional){" "}
            <span className="text-sm font-bold block">
              Just the name, e.g test. Can be separated by comma like test,
              test1. If not provided, all PDFs will be searched.
            </span>
          </label>
          <input
            type="text"
            name="pdf"
            placeholder="PDF filename(s)"
            className="w-full px-4 py-2 rounded-md font-roboto text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black mt-5 px-6 py-2 rounded-md"
          >
            {loading ? "Loading..." : "Inquire"}
          </button>
        </form>
      </div>

      {answer && (
        <div className="bg-black bg-opacity-25 p-5 mt-12 rounded-md">
          <h2 className="font-bold text-2xl mb-4">Answer</h2>
          <p className="font-roboto">{answer}</p>
        </div>
      )}
    </>
  );
};

export default Inquire;
