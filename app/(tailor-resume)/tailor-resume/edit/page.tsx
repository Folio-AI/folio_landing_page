"use client";

import React, { useState, useEffect } from 'react';
import ResumeEditor from '@/components/resume-editor';
import ResumePDF from '@/components/pdf';
import { candidateInfo, exampleData } from '@/app/api/build_docx/testData';
import { pdf } from '@react-pdf/renderer';

export default function EditResume() {
    const [resumeData, setResumeData] = useState(exampleData);
    const [bioInfo, setBioInfo] = useState(candidateInfo);
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        async function generatePDF() {
        const pdfComponent = <ResumePDF bio={bioInfo} data={resumeData} />;
        const pdfBlob = await pdf(pdfComponent).toBlob();
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        }

        generatePDF();
    }, [resumeData, bioInfo]); // Dependency array ensures PDF regenerates when data changes

    const updateResumeData = (newData) => {
        setResumeData(newData);
    };

    const updateBioInfo = (newBio) => {
        setBioInfo(newBio);
    };

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
            <div className="pt-32 md:space-x-4 pl-6">
                <h1 className="text-3xl font-extrabold leading-tighter tracking-tighter mb-4 md:mb-12">
                    Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Resume</span>
                </h1>
            </div>
        
            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="flex-1 p-10 md:pb-20 overflow-auto max-h-[70vh] shadow-lg rounded-lg border border-gray-200 md:mr-8">
                    <ResumeEditor resumeData={exampleData} bioInfo={candidateInfo} updateResumeData={updateResumeData} updateBioInfo={updateBioInfo} />
                </div>

                <div className="flex-1">
                    {pdfUrl && (
                        <div className="w-[45vw] fixed right-5 top-38 h-[63.5vh]">
                            <a href={pdfUrl} download="Resume.pdf" className="text-white text-sm px-4 py-2 rounded-md bg-black hover:bg-gray-800 mb-5 block text-center">
                                Download
                            </a>

                            <iframe 
                                src={`${pdfUrl}#toolbar=1&view=FitH`} 
                                className="w-full h-full rounded-md border border-2 border-gray-200" 
                                title="Resume PDF"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>


    );
}
