
'use client';

import ResumeEditor from "@/components/resume-editor/resume-editor";
import {Card, CardBody, CardHeader, CardFooter, Divider, Link, Image} from "@nextui-org/react";

import { defaultAvatarURL } from '@/components/utils/utils';

import { useSession } from "next-auth/react";
import { User } from "@nextui-org/react";
import {Tabs, Tab} from "@nextui-org/react";
  
const candidateInfo = {
    Bio: {
        name: "Alex Taylor",
        address: "456 Park Ave, New York, NY",
        phone: "555-6789",
        email: "alex@email.com",
        website: "alexstechblog.com",
        skills: ["C#", ".NET", "Angular", "SQL", "Azure"]
    },

    Education: [{
        institution: "Massachusetts Institute of Technology",
        degree: "Master of Science",
        major: "Software Engineering",
        minor: "Data Science",
        start: "September 2017",
        end: "June 2019",
        location: "Cambridge, MA",
        relevantCoursework: [
            "Advanced Algorithms",
            "Machine Learning",
            "Distributed Systems",
            "Database Systems"
        ]
    },
    {
        institution: "University of Texas at Austin",
        degree: "Bachelor of Science",
        major: "Computer Science",
        minor: "Mathematics",
        start: "August 2013",
        end: "May 2017",
        location: "Austin, TX",
        relevantCoursework: [
            "Introduction to Computing",
            "Operating Systems",
            "Computer Networks",
            "Software Engineering"
        ]
    }],

    Experience: [
        {
            company: "Tech Solutions Inc.",
            title: "Senior Software Engineer",
            start: "July 2019",
            end: "Present",
            location: "New York, NY",
            description: [
                "Architected and implemented cloud-based solutions using Azure",
                "Led a team of 5 engineers in the development of a SaaS platform",
                "Improved system performance by 30% through code optimizations and refactoring"
            ]
        },
        {
            company: "Innovative Web Services",
            title: "Full Stack Developer",
            start: "June 2017",
            end: "June 2019",
            location: "Boston, MA",
            description: [
                "Developed and maintained client-side and server-side code for e-commerce websites",
                "Integrated payment processing using Stripe API",
                "Collaborated in an Agile environment with daily stand-ups and bi-weekly sprints"
            ]
        }
    ],

    Projects: [
        {
            title: "E-Commerce Website",
            start: "October 2021",
            end: "December 2021",
            company: "Freelance",
            description: [
                "Built a fully functional e-commerce platform for a local business",
                "Implemented a custom CMS for product management",
                "Integrated PayPal and credit card processing"
            ]
        },
        {
            title: "Inventory Management System",
            start: "April 2020",
            end: "July 2020",
            company: "University Project",
            description: [
                "Designed a web-based inventory management system for academic labs",
                "Implemented barcode scanning and real-time inventory tracking",
                "Utilized Python Flask for backend and Angular for frontend development"
            ]
        }
    ]
};

const edu = candidateInfo.Education;
const resumeData = candidateInfo;

const PlusIcon = () => (
    <svg
      className="h-6 w-6 text-blue-500"
      viewBox="0 0 24 24"
      fill="black"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

export default function Profile() {
    const { data: session } = useSession();

    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <div className="flex flex-col lg:flex-row">
                {/* Left section - 1/3 */}
                <div className="lg:w-1/3 lg:space-y-4 mb-4 lg:mb-0">
                    {/* Bio Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                        <div className="mb-4 text-center">
                            <img
                                className="h-24 w-24 rounded-full mx-auto"
                                src={session?.user?.image || defaultAvatarURL}
                                alt="Profile"
                            />
                            <h1 className="mt-4 text-xl font-semibold">{candidateInfo.Bio.name}</h1>
                        </div>
                    </div>

                    {/* Information Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-3">Basic Info</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-sm">Name</p>
                            <p className="text-sm font-semibold">{candidateInfo.Bio.name}</p>

                            <p className="text-sm">Address</p>
                            <p className="text-sm font-semibold">{candidateInfo.Bio.address}</p>

                            <p className="text-sm">Phone</p>
                            <p className="text-sm font-semibold">{candidateInfo.Bio.phone}</p>

                            <p className="text-sm">Email</p>
                            <p className="text-sm font-semibold">{candidateInfo.Bio.email}</p>

                            <p className="text-sm">Website</p>
                            <p className="text-sm font-semibold">{candidateInfo.Bio.website}</p>
                        </div>
                    </div>

                    {/* Skills Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold mb-3">Skills</h2>
                        <div className="mb-4">
                            {/* Display skills separated by commas */}
                            <p className="text-sm font-semibold">{candidateInfo.Bio.skills.join(', ')}</p>
                        </div>
                        {/* Other bio details */}
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-lg font-bold mb-6">Linked Accounts</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
    {/* GitHub SVG Icon */}
    <div className="account-item flex flex-col items-center justify-center">
      <svg className="w-8 h-8 fill-current text-black opacity-75 mx-auto mb-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
      </svg>
    </div>

    {/* Google SVG Icon */}
    <div className="account-itemflex flex-col items-center justify-center">
      <svg className="w-8 h-8 fill-current text-red-600 opacity-75 mx-auto mb-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
      </svg>
    </div>

    {/* LinkedIn SVG Icon */}
    <div className="account-item flex flex-col items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current text-blue-900 opacity-75 mx-auto mb-2" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4"/>
      </svg>
    </div>

    {/* Devpost SVG Icon */}
    <div className="account-item flex flex-col items-center justify-center">
      <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/>
      </svg>
    </div>
  </div>
</div>


                {/* Add cards for Information and Skills similar to the Bio Card */}
                </div>

                {/* Right section - 2/3 */}
                <div className="lg:w-2/3 lg:pl-4 space-y-4">
                     {/* Education Card */}
                     <div className="bg-white rounded-lg shadow p-8">
                     <div className="absolute top-2 right-2">
                        <PlusIcon />
                     </div>
                        <h2 className="text-lg font-bold mb-3">Education</h2>
                        {candidateInfo.Education.map((edu, index) => (
                            <div key={index} className="mb-8">
                                <div className="grid grid-cols-2 mb-2">
                                    {/* Left Column: Institution, Degree, Major, Minor */}
                                    <div>
                                        <h3 className="text-md font-semibold">{edu.institution}</h3>
                                        <p className="text-sm italic mb-4">{edu.degree}</p>
                                        <p className="text-sm">Major: {edu.major}</p>
                                        <p className="text-sm">Minor: {edu.minor}</p>
                                    </div>

                                    {/* Right Column: Dates and Location */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">{edu.start} - {edu.end}</p>
                                        <p className="text-sm text-gray-600">{edu.location}</p>
                                    </div>
                                </div>

                                {/* Relevant Coursework */}
                                <div>
                                    <p className="text-sm font-semibold">Relevant Coursework:</p>
                                    <ul className="list-disc list-inside text-sm">
                                        {edu.relevantCoursework.map((course, courseIndex) => (
                                            <li key={courseIndex}>{course}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Experience Card */}
                    <div className="bg-white rounded-lg shadow p-8">
                        <h2 className="text-lg font-bold mb-3">Experiences</h2>
                        {resumeData.Experience.map((exp, index) => (
                            <div key={index} className="mb-8">
                                <div className="grid grid-cols-2 mb-4">
                                    {/* Left Column: Company Name and Job Title in Italics */}
                                    <div>
                                        <h3 className="text-md font-semibold">{exp.company}</h3>
                                        <p className="text-sm italic">{exp.title}</p>
                                    </div>

                                    {/* Right Column: Job Location and Dates */}
                                    <div className="text-right">
                                        <p className="text-md">{exp.location}</p>
                                        <p className="text-sm text-gray-600">{exp.start} - {exp.end}</p>
                                    </div>
                                </div>

                                {/* Experience Description */}
                                <p className="text-sm">{exp.description}</p>
                            </div>
                        ))}
                    </div>


                    {/* Projects Card */}
                    <div className="bg-white rounded-lg shadow p-8">
                        <h2 className="text-lg font-bold mb-3">Projects</h2>
                        {/* Map through projects */}
                        {resumeData.Projects.map((project, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-md font-semibold">{project.title}</h3>
                            <p className="text-sm text-gray-600">{project.description}</p>
                            {/* Project description */}
                        </div>
                        ))}
                    </div>

                {/* Add cards for Education and Projects similar to the Experience Card */}
                </div>
            </div>
        </div>
    );
};