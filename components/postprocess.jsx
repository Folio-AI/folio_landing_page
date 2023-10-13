'use client'
import React, { useState, useEffect } from 'react';
import ResumeEditor from './resume-editor';
import ResumePDF from './pdf';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { pdf } from '@react-pdf/renderer';
import { candidateInfo, exampleData } from '@/app/api/build_docx/testData'
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Postprocess() {
  const [sharedState, setSharedState] = useState(exampleData);
  const [editor, setEditor] = useState(<ResumeEditor resumeData={exampleData} updateSharedState={setSharedState}/>)
  const [linkToPDFBlob, setLinkToPDFBlob] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [document, setDocument] = useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [delayedSharedState, setDelayedSharedState] = useState(sharedState);
  
  // useEffect(() => {
  //   // Introduce delay mechanism here
  //   const delayUpdate = setTimeout(() => {
  //     setDelayedSharedState(sharedState);
  //   }, 750);  // 1 second delay

  //   return () => clearTimeout(delayUpdate);  // Clean up on component unmount or if sharedState changes before delay elapses
  // }, [sharedState]);

  function handleRefresh() {
    setDelayedSharedState(sharedState);
  }

  function handleDownloadAsWord() {
    // Implement the download as Word logic here
    console.log('Download as Word clicked');
  }

  function handleDownloadAsPDF() {
    // Implement the download as PDF logic here
    console.log('Download as PDF clicked');
  }

  function derenderDownload() {
    setDocLoading(true);
  }

  function renderDownload() {
    setDocLoading(false);
  }

  useEffect(() => {
    async function renderPDF() {
      const pdfComponent = <ResumePDF bio={candidateInfo} data={sharedState}/>;
      const pdfObject = pdf(pdfComponent);
      const pdfBlob = await pdfObject.toBlob();
      const urlToPDFBlob = URL.createObjectURL(pdfBlob);
      setLinkToPDFBlob(urlToPDFBlob);
      const page = <Page loading={currPage} pageNumber={1} width={500} renderAnnotationLayer={false} />;
      const doc = <Document file={urlToPDFBlob} loading={derenderDownload} onLoadProgress={derenderDownload} onLoadSuccess={renderDownload}>{page}</Document>
      setDocument(doc);
      setCurrPage(page);
    }
    renderPDF();
  }, []);

  useEffect(() => {
    async function updatePDF() {
      const pdfComponent = <ResumePDF bio={candidateInfo} data={delayedSharedState}/>;
      const pdfObject = pdf(pdfComponent);
      const pdfBlob = await pdfObject.toBlob();
      const urlToPDFBlob = URL.createObjectURL(pdfBlob);
      setLinkToPDFBlob(urlToPDFBlob);
      const page = <Page loading={currPage} pageNumber={1} width={500} renderAnnotationLayer={false} />;
      const newDocument = <Document file={urlToPDFBlob} loading={document}>{page}</Document>
      setDocument(newDocument);
    }
    updatePDF();
  }, [delayedSharedState]);


  return (
    <div className="flex">
      <div className="border border-gray-300 rounded w-1/2 pr-4">
        <button className="bg-green-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mb-4 p-4" onClick={handleRefresh}>
          Refresh
        </button>
        <div className="p-4 scrollable-div" style={{height: 'calc(100vh - 40px)', overflow: 'auto'}}>
          {editor}
        </div>
      </div>
      <div className="w-1/2 pl-4 border border-gray-300 rounded p-4">
        {document}
        {!docLoading &&
        <div className="mt-4">
        </div>}
      </div>
    </div>
  );
  
}