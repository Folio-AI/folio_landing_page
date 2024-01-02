'use client'

import React, { useState, useEffect } from 'react';

interface Experience {
    company: string;
    title: string;
    start: string;
    end: string;
    location: string;
    description: string[];
}

interface Project {
    title: string;
    start: string;
    end: string;
    company: string;
    description: string[];
}

interface ResumeData {
    Experience: Experience[];
    Projects: Project[];
}

interface Bio {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  }
  
interface Education {
    institution: string;
    degree: string;
    major: string;
    minor: string;
    start: string;
    end: string;
    location: string;
    relevantCoursework: string[];
}
  
interface CandidateInfo {
    Bio: Bio;
    Education: Education;
}

interface Props {
    resumeData: ResumeData;
    // updateSharedState: (newState: any) => void;
}

const ResumeEditor: React.FC<Props> = ({ resumeData }) => {
    const [localResumeData, setLocalResumeData] = useState<ResumeData>(resumeData);

    useEffect(() => {
        // updateSharedState(localResumeData);
    }, [localResumeData]);

    const adjustTextareaHeight = () => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [localResumeData]);

    const updateDescription = (
        section: keyof ResumeData,
        index: number,
        descriptionIndex: number,
        newValue: string
    ) => {
        const updatedSection = [...localResumeData[section]];
        updatedSection[index].description[descriptionIndex] = newValue;

        const updatedResumeData = {
            ...localResumeData,
            [section]: updatedSection,
        };

        setLocalResumeData(updatedResumeData);
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    return (
        <div className="space-y-4 p-5">
            {(['Experience', 'Projects'] as Array<keyof ResumeData>).map((section) => (
                <div key={section} className="p-6 rounded-md shadow-md border border-gray-300">
                    <h2 className="font-bold text-black text-xl mb-4">{section}</h2>
                    <div className="space-y-2">
                        {localResumeData[section].map((item, index) => (
                            <div key={index} className="p-6 border-teal-500 border rounded-md mb-4 shadow-md">
                                <h3 className="font-bold text-lg text-black">{item.title}</h3>
                                <h3 className="text-sm italic mb-3">{item.company}</h3>
                                {item.description.map((desc, descIndex) => (
                                    <div key={descIndex} style={{ display: 'flex', alignItems: 'center' }}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 cursor-pointer text-teal-500 hover:text-teal-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                    </svg>

                                    <textarea 
                                        value={desc} 
                                        onChange={(e) => updateDescription(section, index, descIndex, e.target.value)}
                                        onInput={handleInput}
                                        className="text-sm p-2 mb-3 rounded-md text-black border border-gray-300 w-full shadow-md focus:ring-green-400"
                                        style={{ overflow: 'hidden', resize: 'none', flex: '1' }}
                                    />
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="currentColor" 
                                        className="w-5 h-5 cursor-pointer text-teal-500 hover:text-teal-800"
                                        style={{ marginLeft: '8px' }} // Optional: Add some space between textarea and SVG
                                    >
                                        <path className="" strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </div>
                                ))}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-teal-500 hover:text-teal-800">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResumeEditor;

// 'use client'

// import React from "react";
// import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

// export default function App() {
//   return (
//     <Card className="max-w-[400px]">
//       <CardHeader className="flex gap-3">
//         <Image
//           alt="nextui logo"
//           height={40}
//           radius="sm"
//           src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
//           width={40}
//         />
//         <div className="flex flex-col">
//           <p className="text-md">NextUI</p>
//           <p className="text-small text-default-500">nextui.org</p>
//         </div>
//       </CardHeader>
//       <Divider/>
//       <CardBody>
//         <p>Make beautiful websites regardless of your design experience.</p>
//       </CardBody>
//       <Divider/>
//       <CardFooter>
//         <Link
//           isExternal
//           showAnchorIcon
//           href="https://github.com/nextui-org/nextui"
//         >
//           Visit source code on GitHub.
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }
