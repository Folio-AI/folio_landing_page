'use client'

import { useState } from 'react';
import { getDocument } from 'pdfjs-dist';
import { Document, Page, pdfjs } from 'react-pdf';
import {Card, Skeleton, Button} from "@nextui-org/react";

import { motion } from 'framer-motion';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function TailorResume() {
    // Fetcthing job info from job link
    // const fetcher = (url: any) => (data: any) => fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // }).then(res => res.json());

    // const [jobLink, setJobLink] = useState('');
    // const { data: jobDetails, error } = useSWR(
    //     jobLink ? { link: jobLink } : null, 
    //     fetcher(`/api/scrape-posting`)
    // );

    // const handleJobLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setJobLink(e.target.value);
    //     console.log(e.target.value)
    // };

    const [resumeText, setResumeText] = useState('');
    const [fileType, setFileType] = useState('');
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState('');

    const [jobPostingText, setJobPostingText] = useState('');
    const [uploadStatus, setUploadStatus] = useState<'none' | 'uploading' | 'submitting' | 'success'>('none');


        // Existing function for PDF
    const extractTextFromPDF = async (pdfData: any) => {
        const pdf = await getDocument({ data: pdfData }).promise;
        let textContent = '';

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const text = await page.getTextContent();
        textContent += text.items.map(item => {
            if ('str' in item) {
            return item.str;
            }

            return '';
        }).join(' ');
        }

        return textContent;
    };

    // New function for DOCX
    const extractTextFromDocx = async (arrayBuffer: ArrayBuffer) => {
        return new Promise<string>((resolve, reject) => {
        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
            .then(result => resolve(result.value))
            .catch(reject);
        });
    };

    // Add your function to extract text from Google Docs.

    // Modified handleUpload function
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadStatus('uploading'); // Assume you have this function
        const file = event.target.files?.[0];

        const uploadedFile = event.target.files?.[0];
        if (!uploadedFile) return;

        const fileType = uploadedFile.name.split('.').pop(); // Getting file extension
        setFileType(fileType);
        setFile(uploadedFile);

        // Create a URL for the file
        const fileUrl = URL.createObjectURL(uploadedFile);
        setFileURL(fileUrl);

        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                let text = '';
                const fileType = file.name.split('.').pop(); // Getting file extension

                if (fileType === 'pdf') {
                    text = await extractTextFromPDF(e.target?.result);
                } else if (fileType === 'docx' || fileType === 'doc') {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    text = await extractTextFromDocx(arrayBuffer);
                } else if (fileType === 'gdoc') {
                    // Handle Google Docs, call your function to extract text from Google Docs.
                }
                console.log(text);
                setResumeText(text); // Assume you have this function
                setUploadStatus('success'); // Assume you have this function
        };

        reader.readAsArrayBuffer(file);
        }
    };

    return (
        <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="border border-gray-200 rounded-xl shadow-xl p-12">
                    <div className="justify-center items-center">
                        <h1 className="text-3xl font-extrabold leading-tighter tracking-tighter mb-2">
                            Tailor <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Resume</span>
                        </h1>

                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-8">Enter job description and upload your resume.</p>

                        <div className="flex justify-between items-start space-x-4" data-aos="zoom-y-out">
                            {/* Form Section */}
                            <div className="flex flex-col space-y-4 w-1/2">
                                
                                <textarea
                                    placeholder="Enter Full Job Description"
                                    className="h-32 text-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>

                                <label className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:hover:border-gray-500">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, or DOCX</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleUpload} accept=".pdf, .docx, .doc" />
                                </label>

                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
                                >
                                    Tailor Resume
                                </button>
                            </div>

                            {/* PDF Viewer Section */}
                            {fileURL ? (
                                <div className="flex-1">
                                    <iframe
                                        src={`${fileURL}#toolbar=0`} 
                                        frameBorder="0"
                                        className="w-full border border-blue-200 rounded-lg"
                                        style={{ width: '100%', height: '500px', border: 'none' }}
                                        title="Resume"
                                        data-aos="fade-up"
                                    ></iframe>
                                </div>
                            ) : 
                            (
                                <div className="flex-1 flex justify-center items-center w-full h-[500px] border border-gray-300 rounded-lg bg-cover bg-center shadow-md overflow-hidden"
                                style={{ backgroundImage: 'url(https://example.com/placeholder-image.jpg)' }}>
                               <motion.button
                                   drag
                                   dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                   initial={{ scale: 1, x: 0, y: 0 }}
                                   animate={{
                                       x: [0, -50, 50, -50, 50, 0],
                                       y: [0, 25, -25, 25, -25, 0],
                                       scale: [1, 1.2, 1, 1.2, 1],
                                       rotate: [0, 10, -10, 10, -10, 0]
                                   }}
                                   transition={{
                                       duration: 10,
                                       ease: "easeInOut",
                                       repeat: Infinity,
                                       repeatType: "mirror"
                                   }}
                                   className="text-white text-lg italic px-4 py-2 rounded-md bg-black">
                                   Your uploaded resume.
                               </motion.button>
                           </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}
