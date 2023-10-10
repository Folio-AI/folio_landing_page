'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import TopImage from '@/public/images/features-top-image.png'
import FeaturesBg01 from '@/public/images/features-home-bg-01.png'
import FeaturesElement01 from '@/public/images/features-home-element-01.png'
import FeaturesElement02 from '@/public/images/features-home-element-02.png'
import FeaturesElement03 from '@/public/images/features-home-element-03.png'

export default function FeaturesHome() {
  
  const [tab, setTab] = useState<number>(1)

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, []) 

  return (
    <section id="0" className="relative pt-32">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">
              Apply to Jobs Smarter
            </h1>
            <p className="text-xl text-gray-600">
              Integrate your existing port<span className="font-bold">(folio)</span>s, automatically tailor your resumes and cover letters for unqiue job applications, automatically fill out role-specific job application questions, track your job applications.
            </p>
          </div>
          
          {/* Top image */}
          {/* <div className="pb-12 md:pb-16">
            <Image src={TopImage} width={1104} alt="Features top" />
          </div> */}

          {/* Section content */}
          

        </div>
      </div>
    </section>
  )
}