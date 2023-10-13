'use client'
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '@/components/pdf';  // adjust the path
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { candidateInfo, exampleData } from '@/app/api/build_docx/testData'
import "react-pdf/dist/esm/Page/TextLayer.css";
import Postprocess from '@/components/postprocess'
import React, {useEffect, useState} from 'react'

// export const metadata = {
//     title: 'Tailor Resume | Folio AI',
//     description: 'Your AI-powered personal career management copilot.',
//   }

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Edit = () => {
const [file, setFile] = useState('');

useEffect(() => {
    pdf(<ResumePDF bio={candidateInfo} data={exampleData}/>).toBlob().then(blob => {
    setFile(URL.createObjectURL(blob));
    });
}, []);

return (
    <>
    <title>Tailor Resume | Folio AI</title>
    <section id="resumeEditor">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative pt-20 pb-24 md:pt-24 md:pb-32">
        <Postprocess />
    </div>
    </section>
    </>
);
}

export default Edit;
