'use client'
import { getDocument } from 'pdfjs-dist';
import React, { useState } from 'react';

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

type UpdateStageFunctionType = (stage: number) => void;
type setExperienceJSONType = (result: ResumeData) => void;

interface UploadAreaProps {
  updateStageFunction: UpdateStageFunctionType;
  setExperienceJSON: setExperienceJSONType;
}


export default function UploadArea({ updateStageFunction, setExperienceJSON }: UploadAreaProps) {
  const [resumeText, setResumeText] = useState('');
  const [jobPostingText, setJobPostingText] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'none' | 'uploading' | 'submitting' | 'success'>('none');


  const extractTextFromPDF = async (pdfData: any) => {
    const pdf = await getDocument({ data: pdfData }).promise;
    let textContent = '';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const text = await page.getTextContent();
      textContent += text.items.map(item => item.str).join(' ');
    }

    return textContent;
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadStatus('uploading'); // Set to uploading when a file is selected
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = await extractTextFromPDF(e.target?.result);
        setResumeText(text);
        setUploadStatus('success'); // Set to success when extraction is done
      };
      reader.readAsArrayBuffer(file);
    }
  }

  const handleSubmit = async () => {
    setUploadStatus('submitting');

    const response = await fetch('/api/parse_resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resume_raw_text: resumeText, // Assuming this is the state variable for resume text
        job_posting_text: jobPostingText // Assuming this is the state variable for job posting text
      })
    });
  
    const data = await response.json();
    console.log(JSON.stringify(data));
    setExperienceJSON(data);
    updateStageFunction(2);

    setUploadStatus('success');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row w-full max-w-5xl p-8 bg-white shadow-2xl rounded-lg border-2 border-teal-400">
        {/* Left Section */}
        <div className="flex flex-col items-start w-1/3 pr-8">
          {/* Step 1: Upload Button */}
          <div data-aos="fade-up" className="text-xl text-slate-700 font-semibold mb-2">Step 1: Upload Your Resume</div>
          <button data-aos="fade-up" className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white rounded-lg shadow-lg tracking-wide cursor-pointer">
            <input type="file" className="hidden" onChange={handleUpload} />
            Upload
          </button>
          {uploadStatus === 'uploading' && <div className="mt-2 text-blue-600">Uploading... <span className="animate-spin">🔄</span></div>}
          {uploadStatus === 'success' && <div className="mt-2 text-green-600">Upload successful! ✅</div>}
        </div>


        {/* Right Section */}
        <div data-aos="fade-up" className="flex flex-col w-2/3 pl-4 border-l">
          {/* Step 2: Expanding Text Box */}
          <div data-aos="fade-up" className="text-xl text-slate-700 font-semibold mb-2">Step 2: Paste Job Description</div>
          <textarea
            data-aos="fade-up"
            className="w-full p-4 border rounded-md shadow-md focus:ring-green-400"
            rows={4}
            placeholder="Paste the job description here..."
            value={jobPostingText} 
            onChange={(e) => setJobPostingText(e.target.value)}
          ></textarea>

          {/* Step 3: Submit Button */}
          <div data-aos="fade-up" className="text-xl text-slate-700 font-semibold mt-8 mb-2">Step 3: Let Us Do The Work</div>
          <button 
            data-aos="fade-up" 
            className={`btn-sm px-4 py-2 rounded text-white shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500`} 
            onClick={handleSubmit} 
            // disabled={uploadStatus === 'submitting'} // Disable the button when submitting
        >
            {uploadStatus === 'submitting' ? 'Loading...' : 'Tailor Resume'}
        </button>
        </div>
      </div>
    </div>
    );
}
