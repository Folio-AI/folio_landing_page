'use client'
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '@/components/pdf';  // adjust the path
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { candidateInfo, exampleData } from '@/app/api/build_docx/testData'
import "react-pdf/dist/esm/Page/TextLayer.css";
import Postprocess from '@/components/postprocess'
import UploadArea from '@/components/upload';
import React, { useEffect, useState, useRef } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Experience {
    company: string;
    title: string;
    start: string;
    end: string;
    location: string;
    description: string[];
}

interface Project {
    company: string;
    title: string;
    start: string;
    end: string;
    location: string;
    description: string[];
}

interface ResumeData {
    Experience: Experience[];
    Projects: Project[];
}
const Edit = () => {
const [stage, setStage] = useState(1);
const [experience, setExperience] = useState<ResumeData>();
const postProcessRef = useRef<HTMLDivElement>(null); // Updated this line


useEffect(() => {
    if(stage === 2 && postProcessRef.current) {
        postProcessRef.current.scrollIntoView({ behavior: 'smooth' }); 
    }
}, [stage]);

return (
    <>
    <title>Tailor Resume | Folio AI</title>
    <section id="resumeEditor" className="mb-44">
        <div className="text-center mt-44">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter" data-aos="zoom-y-out">
              Tailor <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Resume</span>
            </h1>
        </div>
        <div className="mt-14">
            {stage === 2 ?
                <div ref={postProcessRef} className="max-w-6xl mx-auto px-4 sm:px-6 relative pb-24 md:pb-32">
                    <Postprocess inputData={experience}/>
                </div> : <UploadArea updateStageFunction={setStage} setExperienceJSON={setExperience}/>
            }
        </div>
    </section>
    </>
);
}

export default Edit;
