import React, { useState } from 'react';
import { FaTrash, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';

const ResumeEditor = () => {
  const [experiences, setExperiences] = useState([
    { id: 1, company: 'Khan Academy', title: 'Software Engineer', date: 'Jun 2022 - Present', description: [''] },
    // Add more experiences as needed
  ]);

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">WORK EXPERIENCE</h2>
      {experiences.map((experience, index) => (
        <div key={experience.id} className="border rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Company" value={experience.company} className="border rounded w-full p-2" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Job Title" value={experience.title} className="border rounded w-full p-2" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Date" value={experience.date} className="border rounded w-full p-2" />
            </div>
            <textarea placeholder="Description" className="border rounded w-full p-2"></textarea>
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
    </div>
  );
};

export default ResumeEditor;
