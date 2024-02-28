import React, { useState, useEffect } from 'react';
import { FaTrash, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';

const ResumeEditor = ({ resumeData, bioInfo, updateResumeData, updateBioInfo }) => {
  // Initialize state with basic info, experiences, and projects
  // const [basicInfo, setBasicInfo] = useState(resumeData.basicInfo);
  const [experiences, setExperiences] = useState(resumeData.Experience);
  const [projects, setProjects] = useState(resumeData.Projects);
  const [candidateInfo, setCandidateInfo] = useState(bioInfo);

  const handleExperienceChange = (index: number, fieldName: string) => (e: any) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [fieldName]: e.target.value };
    setExperiences(newExperiences);
    // Optionally, propagate changes to parent component or perform other actions

    updateResumeData({ ...resumeData, Experience: newExperiences });
  };

  const handleExperienceDescriptionChange = (index: number) => (content: string) => {
    const newExperiences = [...experiences];
    newExperiences[index].description = content.split('•').map((line: string) => line.trim());
    setExperiences(newExperiences);

    console.log(newExperiences)
    // Optionally, propagate changes to parent component or perform other actions
    updateResumeData({ ...resumeData, Experience: newExperiences });
  };

  // Function to handle addition of new experience
  const handleAddExperience = () => {
    const newExperience = {
      id: experiences.length + 1,
      company: '',
      title: '',
      date: '',
      description: [''],
    };
    setExperiences([...experiences, newExperience]);
  };

  // Function to handle deletion of an experience
  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((experience) => experience.id !== id));
  };

  // Function to handle moving experiences up or down
  const moveExperience = (index, direction) => {
    const newExperiences = [...experiences];
    if (direction === 'up' && index > 0) {
      [newExperiences[index], newExperiences[index - 1]] = [newExperiences[index - 1], newExperiences[index]];
    } else if (direction === 'down' && index < newExperiences.length - 1) {
      [newExperiences[index], newExperiences[index + 1]] = [newExperiences[index + 1], newExperiences[index]];
    }
    setExperiences(newExperiences);
  };

  // Function to handle addition of new project
  const handleAddProject = () => {
    // Define how a new project should be added
  };

  // Function to handle deletion of a project
  const handleDeleteProject = (id) => {
    // Define how a project should be deleted
  };

  // Function to handle moving projects up or down
  const moveProject = (index, direction) => {
    // Define how projects should be reordered
  };

  const BulletPointTextArea = ({ initText, onContentChange }) => {
    const [content, setContent] = useState(initText);
  
    const handleChange = (e) => {
      const newValue = e.target.value;
      // Prevent deleting the first bullet point
      if (newValue.length < 2) {
        setContent("• ");
      } else {
        setContent(newValue);
      }

      setTimeout(() => onContentChange(newValue), 3000); // Trigger onContentChange(newValue);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default Enter behavior
        // Add a new bullet on enter, if not directly after an existing bullet
        if (!content.endsWith("\n• ")) {
          setContent(content + "\n• ");
        }
      }
    };
  
    return (
      <textarea
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border rounded w-full p-2 h-[20vh]"
        style={{ whiteSpace: 'pre-wrap' }} // Correctly handle new lines
      />
    );
  };

  return (
    <div className="space-y-6">
        <div>
        <h2 className="text-2xl font-bold mb-4">BIO</h2>
        <p>{candidateInfo.Bio.name}</p>
        <p>{candidateInfo.Bio.address}</p>
        <p>{candidateInfo.Bio.phone}</p>
        <p>{candidateInfo.Bio.email}</p>
        <p>{candidateInfo.Bio.website}</p>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">EDUCATION</h2>
        <div className="border rounded-lg p-4 space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input type="text" placeholder="Institution Name" value={candidateInfo.Education.institution} className="border rounded w-full p-2" onChange={(e) => {/* Handle change */}} />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input type="text" placeholder="Degree" value={candidateInfo.Education.degree} className="border rounded w-full p-2" onChange={(e) => {/* Handle change */}} />
        </div>

        {/* Include controls for editing institution details (similar to work experiences) */}
        </div>
        <button onClick={() => {/* Add institution */}} className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <FaPlus className="mr-2" />
            Add Institution
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">WORK EXPERIENCE</h2>
      {experiences.map((experience, index) => (
        <div key={experience.id} className="border rounded-lg p-4 space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input type="text" placeholder="Company" value={experience.company} onChange={handleExperienceChange(index, 'company')} className="border rounded w-full p-2" />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input type="text" placeholder="Job Title" value={experience.title} onChange={handleExperienceChange(index, 'title')} className="border rounded w-full p-2" />
            </div>
            <div className="grid grid-cols-4 gap-4 items-end">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
                <select value={experience.start_month} onChange={handleExperienceChange(index, 'start_month')} className="border rounded w-full p-2">
                {/* Map through months */}
                {Array.from({ length: 12 }, (_, i) => (
                    <option value={i + 1} key={i}>{new Date(0, i).toLocaleString('en-US', { month: 'long' })}</option>
                ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                <select value={experience.start_year} className="border rounded w-full p-2">
                {/* Map through years */}
                {Array.from({ length: 50 }, (_, i) => (
                    <option value={new Date().getFullYear() - i} key={i}>{new Date().getFullYear() - i}</option>
                ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Month</label>
                <select value={experience.end_month} className="border rounded w-full p-2">
                {/* Map through months */}
                {Array.from({ length: 12 }, (_, i) => (
                    <option value={i + 1} key={i}>{new Date(0, i).toLocaleString('en-US', { month: 'long' })}</option>
                ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                <select value={experience.end_year} className="border rounded w-full p-2">
                {/* Map through years */}
                {Array.from({ length: 50 }, (_, i) => (
                    <option value={new Date().getFullYear() - i} key={i}>{new Date().getFullYear() - i}</option>
                ))}
                </select>
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>

            <BulletPointTextArea 
                initText={experience.description.map((line: string) => `• ${line}`).join('\n')} 
                onContentChange={(newContent: string) => {
                    // Your update logic here
                    handleExperienceDescriptionChange(index)(newContent);
                }}
            />

            {/* <textarea placeholder="Description" className="border rounded w-full p-2">
                {experience.description.join('\n')}
            </textarea> */}
            </div>
            <div className="flex items-center justify-between mt-4">
            <FaArrowUp className="text-gray-600 cursor-pointer" onClick={() => moveExperience(index, 'up')} />
            <FaArrowDown className="text-gray-600 cursor-pointer" onClick={() => moveExperience(index, 'down')} />
            <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleDeleteExperience(experience.id)} />
            </div>
        </div>
        ))}

      <button onClick={handleAddExperience} className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        <FaPlus className="mr-2" />
        Add Job
      </button>

       {/* Projects Section */}
       <h2 className="text-2xl font-bold mb-4">PROJECTS</h2>
       {projects.map((project, index) => (
        <div key={project.id} className="border rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input type="text" value={project.company} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input type="text" value={project.title} className="border rounded w-full p-2" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* Start Month, Start Year, End Month, End Year similar to experiences */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <BulletPointTextArea initText={project.description.map((line: string) => `• ${line}`).join('\n')} />
          </div>
          <div className="flex items-center justify-between mt-4">
            <FaArrowUp onClick={() => moveProject(index, 'up')} />
            <FaArrowDown onClick={() => moveProject(index, 'down')} />
            <FaTrash onClick={() => handleDeleteProject(project.id)} />
          </div>
        </div>
      ))}
      <button onClick={handleAddProject} className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        <FaPlus className="mr-2" />
        Add Project
      </button>
    </div>
  );
};

export default ResumeEditor;
