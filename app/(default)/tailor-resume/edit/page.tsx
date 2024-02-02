"use client";

import React, { useState, useEffect } from 'react';
import ResumeEditor from '@/components/resume-editor';
import ResumePDF from '@/components/pdf';
import { candidateInfo, exampleData } from '@/app/api/build_docx/testData';
import { pdf } from '@react-pdf/renderer';

export default function EditResume() {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        async function renderPDF() {
            const pdfComponent = <ResumePDF bio={candidateInfo} data={exampleData}/>;
            const pdfBlob = await pdf(pdfComponent).toBlob();
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
        }
        renderPDF();
    }, []);

    return (
        <div className="mx-auto px-4 sm:px-6 h-screen">
            {/* Title Section */}
            <div className="pt-32 md:pt-40 md:space-x-4 pl-6">
                <h1 className="text-3xl font-extrabold leading-tighter tracking-tighter mb-4 md:mb-12">
                    Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Resume</span>
                </h1>
            </div>
        
            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-start">
                <div className="flex-1 pb-12 md:pb-20">
                    <ResumeEditor resumeData={exampleData} />
                </div>
        
                <div className="flex-1">
                    {pdfUrl && (
                        <div className="w-[45vw] fixed right-5 top-32 h-[70vh] overflow-auto">
                            <a href={pdfUrl} download="Resume.pdf" className="text-white text-sm px-4 py-2 rounded-md bg-black hover:bg-gray-800 mb-5 block text-center">
                                Download
                            </a>
        
                            <iframe 
                                src={`${pdfUrl}#toolbar=0&view=FitH`} 
                                className="w-full h-full"
                                frameBorder="0"
                                title="Resume PDF"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
