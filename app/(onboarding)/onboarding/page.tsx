'use client';
// page.tsx

import React, { useState, useEffect } from 'react';
import { Questionnaire } from '@/components/questionnaire/questionnaire';
import { ProgressBar } from '@/components/questionnaire/progressbar';
import { animated } from '@react-spring/web'
export default function Onboarding() {
  const [progress, setProgress] = useState(0); // Initial progress
  const [question, setQuestion] = useState('First, a little about you.')
  const [currentStep, setCurrentStep] = useState(0);

  // Update progress as needed

  const handleStepChange = (newStep: number) => {
    if (newStep > currentStep) {
      // Update progress only when moving forward
      const newProgress = (newStep / 4) * 100;
      setProgress(newProgress);
    }
    setCurrentStep(newStep); // Keep track of the current step
    updateQuestionTitle(newStep); // Update question title regardless of direction
  };
  const updateQuestionTitle = (currentStep: number) => {
    // Update question based on currentStep
    switch(currentStep) {
      case 0:
        setQuestion('First, a little about you.');
        break;
      case 1:
        setQuestion('Tell us about your education.');
        break;
      case 2:
        setQuestion('Describe your work experience.');
        break;
      case 3:
        setQuestion('List your skills.');
        break;
      default:
        setQuestion('Almost done!');
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="fixed left-20 top-20 bottom-0 flex items-center" style={{ height: '300px' }}>
        <ProgressBar progress={progress} />
      </div>
      <div className='min-h-screen flex flex-col justify-start items-center pt-10' style={{ width: '100%'}}>
        {/* Title above the Questionnaire */}
        <div className="mb-4 text-xl font-semibold text-gray-700">{question}</div>
        <Questionnaire onStepChange={handleStepChange} updateQuestionTitle={updateQuestionTitle}/>
        
      </div>
    </div>
  );
}
