"use client";

import Inquire from "./components/Inquire";
import ListPDF from "./components/ListPDF";
import UploadPDF from "./components/UploadPDF";

const endpoint = "https://blogapi.adefemigreat.com/";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="font-bold mt-12 text-5xl">Documaster</h1>
      <p className="text-lg mt-3 font-roboto">Interract with your PDFs</p>

      <hr className="mt-2" />

      <ListPDF endpoint={endpoint} />
      <Inquire endpoint={endpoint} />
    </main>
  );
}
