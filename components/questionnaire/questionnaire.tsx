'use client'

import React, { useState } from 'react';
import { useSession } from 'next-auth/react'
import clientPromise from '@/lib/mongodb'
import { useRouter } from 'next/navigation'

interface OnboardInfo {
    bio: BioEntry; // Assuming a string, adjust as needed
    education: EducationEntry[]; // Adjust according to your actual data structure
    workExperience: WorkExperienceEntry[];
    skills: string[]; // Array of skills, adjust as needed
  }
  
interface QuestionnaireProps {
    onStepChange: (currentStep: number) => void;
    updateQuestionTitle: (currentStep: number) => void;
  }


const initialWorkExperience = {
  companyOrg: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  location: '',
  description: ''
};

const initialBioExperience = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    github: '',
    linkedin: '',
    devpost: ''
  };

const initialEducationEntry = {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
};

const initialSkill = '';

const initialOnboardInfo: OnboardInfo = {
    bio: {...initialBioExperience},
    education: [{ ...initialEducationEntry }],
    workExperience: [{ ...initialWorkExperience }],
    skills: [],
};

interface WorkExperienceEntry {
    companyOrg: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
  }

interface BioEntry {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    website: string,
    github: string,
    linkedin: string,
    devpost: string
}

interface EducationEntry {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
export const Questionnaire: React.FC<QuestionnaireProps> = ({ onStepChange }) => {

    const [onboardInfo, setOnboardInfo] = useState<OnboardInfo>(initialOnboardInfo);
    
    const {data : session} = useSession();

    const router = useRouter();

    const [isFinished, setIsFinished] = useState(false);

    const [newSkill, setNewSkill] = useState('');

    const [currentStep, setCurrentStep] = useState(0);

    const isLastStep = currentStep === 3; // Since we have 4 steps (0 to 3)

    const validateCurrentStep = () => {
        // Simple validation logic based on currentStep
        // Return true if all required fields in the current step are filled
        // For example, for the bio step:
        if (currentStep === 0) {
            return onboardInfo.bio.firstName !== '' && onboardInfo.bio.lastName !== '' && onboardInfo.bio.email !== '';
            // Add similar checks for other steps
        }
        // Default to true for simplicity, update with actual validation logic
        return true;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            onStepChange(currentStep + 1);
            if (isLastStep) {
                setIsFinished(true);
            } else {
                setCurrentStep(currentStep + 1);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    }

    const handleInputChange = (index: number, field: keyof WorkExperienceEntry, value: string) => {
        const newEntries = [...onboardInfo.workExperience];
        if (!newEntries[index]) newEntries[index] = { ...initialWorkExperience };
        newEntries[index][field] = value;
        setOnboardInfo({...onboardInfo, workExperience: newEntries});
    };

    const handleBioInputChange = (field: keyof BioEntry, value: string) => {
        const newBio = { ...onboardInfo.bio, [field]: value };
        setOnboardInfo({...onboardInfo, bio: newBio});
    };

    const handleSkillChange = (index: number, value: string) => {
        const newSkills = [...onboardInfo.skills];
        newSkills[index] = value;
        setOnboardInfo({...onboardInfo, skills: newSkills});
    };

    

    const addSkill = () => {
        if (newSkill) {
            setOnboardInfo({
                ...onboardInfo,
                skills: [...onboardInfo.skills, newSkill]
            });
            setNewSkill(''); // Reset newSkill input
        }
    };

    const removeSkill = (index: number) => {
        const filteredSkills = onboardInfo.skills.filter((_, idx) => idx !== index);
        setOnboardInfo({...onboardInfo, skills: filteredSkills});
    };
    

    const addEntry = () => {
        setOnboardInfo({
            ...onboardInfo,
            workExperience: [...onboardInfo.workExperience, { ...initialWorkExperience }]
        });
    };

    const handleEducationInputChange = (index: number, field: keyof EducationEntry, value: string) => {
        const newEntries = [...onboardInfo.education];
        if (!newEntries[index]) newEntries[index] = { ...initialEducationEntry };
        newEntries[index][field] = value;
        setOnboardInfo({...onboardInfo, education: newEntries});
      };
    
    const addEducationEntry = () => {
        setOnboardInfo({
            ...onboardInfo,
            education: [...onboardInfo.education, { ...initialEducationEntry }]
        });
    };

    // const handleNext = () => {
    //     console.log(onboardInfo);
    //     console.log(session);
    // }

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
        onStepChange(currentStep - 1)
    }

    // const handleSubmit = async () => {
    // // Submit onboardInfo to MongoDB
    //     console.log(onboardInfo);
    //     if (session && session.user) {
    //         console.log(session.user.email)
    //     }
    // };
    const handleSubmit = async () => {
        // Check if session and user email exist
        onStepChange(currentStep + 1)
        if (session && session.user && session.user.email) {
            try {
                const response = await fetch('/api/onboarding', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userEmail: session.user.email,
                        onboardInfo: onboardInfo
                    })
                });
    
                if (response.ok) {
                    console.log('Onboarding info submitted successfully');
                    // Handle successful submission (e.g., show a success message, redirect, etc.)
                    router.push("/dashboard")
                } else {
                    console.error('Submission failed');
                    // Handle errors (e.g., show an error message)
                }
            } catch (error) {
                console.error('Failed to submit onboard info:', error);
                // Handle exceptions (e.g., show an error message)
            }
        } else {
            console.log('Session or user email not available');
            // Handle the case when the session or user email is not available
        }
    };
    

    const renderWork = () => {
        return (
            <>
                {onboardInfo.workExperience.map((entry, index) => (
                    <div key={index} className="space-y-6">
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`companyOrg-${index}`}>Company <span className="text-red-600">*</span></label>
                                <input 
                                    id={`companyOrg-${index}`} 
                                    type="text" 
                                    className="form-input w-full text-gray-800" 
                                    placeholder="Enter Company Name" 
                                    value={entry.companyOrg}
                                    onChange={(e) => handleInputChange(index, 'companyOrg', e.target.value)}
                                />
                            </div>
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`jobTitle-${index}`}>Job Title <span className="text-red-600">*</span></label>
                                <input 
                                    id={`jobTitle-${index}`} 
                                    type="text" 
                                    className="form-input w-full text-gray-800" 
                                    placeholder="Enter Job Title" 
                                    value={entry.jobTitle}
                                    onChange={(e) => handleInputChange(index, 'jobTitle', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`startDate-${index}`}>Start Date</label>
                                <input 
                                    id={`startDate-${index}`} 
                                    type="date" 
                                    className="form-input w-full text-gray-800" 
                                    value={entry.startDate}
                                    onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`endDate-${index}`}>End Date</label>
                                <input 
                                    id={`endDate-${index}`} 
                                    type="date" 
                                    className="form-input w-full text-gray-800" 
                                    value={entry.endDate}
                                    onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`location-${index}`}>Location</label>
                                <input 
                                    id={`location-${index}`} 
                                    type="text" 
                                    className="form-input w-full text-gray-800" 
                                    placeholder="Enter Location" 
                                    value={entry.location}
                                    onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`description-${index}`}>Description</label>
                                <textarea 
                                    id={`description-${index}`} 
                                    className="form-textarea w-full text-gray-800" 
                                    placeholder="Enter Description" 
                                    rows={3} 
                                    style={{ resize: 'vertical' }}
                                    value={entry.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={addEntry} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline">Add More Experience</button>
            </>
        );
    }
    

    const renderBio = () => {
        return (
            <>
                <div className="space-y-6">
                    {/* Name Fields */}
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-1/2 px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="firstName">First Name <span className="text-red-600">*</span></label>
                            <input 
                                id="firstName" 
                                type="text" 
                                className="form-input w-full text-gray-800" 
                                placeholder="Enter First Name" 
                                required 
                                value={onboardInfo.bio.firstName}
                                onChange={(e) => handleBioInputChange('firstName', e.target.value)}
                            />
                        </div>
                        <div className="w-1/2 px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="lastName">Last Name <span className="text-red-600">*</span></label>
                            <input 
                                id="lastName" 
                                type="text" 
                                className="form-input w-full text-gray-800" 
                                placeholder="Enter Last Name" 
                                required 
                                value={onboardInfo.bio.lastName}
                                onChange={(e) => handleBioInputChange('lastName', e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Email Field */}
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                            <input 
                                id="email" 
                                type="email" 
                                className="form-input w-full text-gray-800" 
                                placeholder="Enter Email" 
                                required 
                                value={onboardInfo.bio.email}
                                onChange={(e) => handleBioInputChange('email', e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Address Field */}
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="address">Address <span className="text-red-600">*</span></label>
                            <input 
                                id="address" 
                                type="text" 
                                className="form-input w-full text-gray-800" 
                                placeholder="Enter Address" 
                                required 
                                value={onboardInfo.bio.address}
                                onChange={(e) => handleBioInputChange('address', e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Phone Number Field */}
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="phone">Phone <span className="text-red-600">*</span></label>
                            <input 
                                id="phone" 
                                type="tel" 
                                className="form-input w-full text-gray-800" 
                                placeholder="Enter Phone Number" 
                                value={onboardInfo.bio.phone}
                                onChange={(e) => handleBioInputChange('phone', e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Links Fields */}
                    {/* Assuming links is an object with specific keys for each link type */}
                    <div className="space-y-4">
                        <label className="block text-gray-800 text-sm font-medium mb-1">Links</label>
                        {/* Add inputs for each type of link you want to capture */}
                        <input 
                            type="url" 
                            placeholder="Personal Website" 
                            className="p-2 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500" 
                            value={onboardInfo.bio.website || ''}
                            onChange={(e) => handleBioInputChange('website', e.target.value)}
                        />
                        <input 
                            type="url" 
                            placeholder="GitHub Profile" 
                            className="p-2 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500" 
                            value={onboardInfo.bio.github || ''} 
                            onChange={(e) => handleBioInputChange('github', e.target.value)}
                        />
                        <input type="url" placeholder="LinkedIn Profile" className="p-2 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500" value={onboardInfo.bio.linkedin || ''} onChange={(e) => handleBioInputChange('linkedin', e.target.value)}/>
                        <input type="url" placeholder="Devpost Profile" className="p-2 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500" value={onboardInfo.bio.devpost || ''} onChange={(e) => handleBioInputChange('devpost', e.target.value)}/>
                    </div>
                </div>
            </>
        )
    }
    

    const renderEducation = () => {
        return (
            <>
                {onboardInfo.education.map((entry, index) => (
                    <div key={index} className="space-y-6">
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`institution-${index}`}>Institution <span className="text-red-600">*</span></label>
                                <input 
                                    id={`institution-${index}`} 
                                    type="text" 
                                    className="form-input w-full text-gray-800" 
                                    placeholder="Enter Institution Name" 
                                    value={entry.institution}
                                    onChange={(e) => handleEducationInputChange(index, 'institution', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`degree-${index}`}>Degree <span className="text-red-600">*</span></label>
                                <input 
                                    id={`degree-${index}`} 
                                    type="text" 
                                    className="form-input w-full text-gray-800" 
                                    placeholder="Enter Degree" 
                                    value={entry.degree}
                                    onChange={(e) => handleEducationInputChange(index, 'degree', e.target.value)}
                                />
                            </div>
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`fieldOfStudy-${index}`}>Field of Study <span className="text-red-600">*</span></label>
                                <input 
                                    id={`fieldOfStudy-${index}`} 
                                    type="text" 
                                    className="form-input w-full text-gray-800" 
                                    placeholder="Enter Field of Study" 
                                    value={entry.fieldOfStudy}
                                    onChange={(e) => handleEducationInputChange(index, 'fieldOfStudy', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`startDate-${index}`}>Start Date</label>
                                <input 
                                    id={`startDate-${index}`} 
                                    type="date" 
                                    className="form-input w-full text-gray-800" 
                                    value={entry.startDate}
                                    onChange={(e) => handleEducationInputChange(index, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className="w-1/2 px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`endDate-${index}`}>End Date</label>
                                <input 
                                    id={`endDate-${index}`} 
                                    type="date" 
                                    className="form-input w-full text-gray-800" 
                                    value={entry.endDate}
                                    onChange={(e) => handleEducationInputChange(index, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={`description-${index}`}>Description</label>
                                <textarea 
                                    id={`description-${index}`} 
                                    className="form-textarea w-full text-gray-800" 
                                    placeholder="Enter Description" 
                                    rows={3} 
                                    style={{ resize: 'vertical' }}
                                    value={entry.description}
                                    onChange={(e) => handleEducationInputChange(index, 'description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={addEducationEntry} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline">Add More Education</button>
            </>
        );
    }

    const renderSkills = () => {
        return (
            <div className="space-y-6">
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3 mb-4">
                        <label className="block text-gray-800 text-sm font-medium mb-1">Add a Skill</label>
                        <input 
                            type="text" 
                            className="form-input w-full text-gray-800" 
                            placeholder="Enter a new skill" 
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                        />
                        <button 
                            onClick={addSkill} 
                            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                        >
                            Add Skill
                        </button>
                    </div>
                </div>
                <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1">Your Skills</label>
                    <ul className="list-disc pl-5">
                        {onboardInfo.skills.map((skill, index) => (
                            <li key={index} className="mb-2">
                                {skill}
                                <button 
                                    onClick={() => removeSkill(index)}
                                    className="text-red-500 ml-2"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0: return renderBio();
            case 1: return renderEducation();
            case 2: return renderWork();
            case 3: return renderSkills();
            default: return <div>Unknown step</div>;
        }
    }


  return (
    <div className="flex flex-col items-center" style={{ width: '100%' }}>
        <div className="bg-white p-10 rounded-lg shadow-lg w-1/2 mb-4">
            {renderCurrentStep()}
        </div>
        <div>
            {currentStep > 0 && (
                <button onClick={handlePrev} className="mt-4 mr-4">Previous</button>
            )}
            {isLastStep ? <button onClick={handleSubmit} className="mt-4">Submit</button> : <button onClick={handleNext} className="mt-4">Next</button>}
        </div>
    </div>
);
};
