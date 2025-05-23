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
      <div className="absolute inset-0 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 place-items-center">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center md:pb-16">
            <h1 className="h2 mb-4">
              Apply to Jobs Smarter
            </h1>
            <p className="text-xl text-gray-600">
              Integrate your existing port<span className="font-bold">(folio)</span>s and automatically tailor your resumes and cover letters for job roles.
            </p>
          </div>
          
          {/* Top image */}
          {/* <div className="pb-12 md:pb-16">
            <Image src={TopImage} width={1104} alt="Features top" />
          </div>  */}

          {/* Section content */}
          <div className="w-3/5 mx-auto">

            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                {/* <h3 className="h3 mb-3">Supercharge your Job Applications</h3> */}
                <p className="text-xl text-gray-600"></p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <button
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md hover:shadow-lg' : 'bg-gradient-to-r from-cyan-500 to-blue-900'}`}
                  onClick={(e) => { e.preventDefault(); setTab(1); }}
                >
                  <div>
                    <div className={`${tab == 1 ? 'text-white' : 'text-black'} font-bold leading-snug tracking-tight mb-1`}>1. Build your Profile</div>
                    <div className={`${tab == 1 ? 'text-white' : 'text-gray-600'} font-light`}>
                      Connect your existing LinkedIn, HandShake, Github, Google Scholar, or DevPost portfolios. Or upload an existing resume.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow shrink-0 ml-3">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                  </div>
                </button>

                {/* Downward pointing SVG arrow that looks nice */}
                <svg className="m-8 mx-auto" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 10 10 L 25 30 L 40 10 Z" fill="none" stroke="black"/>
                </svg>


                <button
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 2 ? 'bg-white shadow-md hover:shadow-lg' : 'bg-gradient-to-r from-cyan-500 to-blue-900'}`}
                  onClick={(e) => { e.preventDefault(); setTab(2); }}
                >
                  <div>
                    <div className={`${tab == 2 ? 'text-white' : 'text-black'} font-bold leading-snug tracking-tight mb-1`}>2. Tailor Your Resumes</div>
                    <div className={`${tab == 2 ? 'text-white' : 'text-gray-600'} font-light`}>
                      Enter a job description, and we'll optimize your resume for applicant tracking system (ATS) keyword scans and tailor your resume for the specific role.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow shrink-0 ml-3">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z" fillRule="nonzero" />
                    </svg>
                  </div>
                </button>
                {/* <button
                  className={`text-left flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                  onClick={(e) => { e.preventDefault(); setTab(3); }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">3. Keep Track of Your Applications</div>
                    <div className="text-gray-600 font-medium">
                      Keep track of all your job applications and keep your profile updated.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow shrink-0 ml-3">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z" fill="#191919" fillRule="nonzero" />
                    </svg>
                  </div>
                </button> */}
              </div>
            </div>

            {/* Tabs items */}
            {/* <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div className="relative flex flex-col text-center lg:text-right" data-aos="zoom-y-out" ref={tabs}>
                  
                  <Transition
                    show={tab === 1}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}                  
                  >
                    <div className="relative inline-flex flex-col">
                      <Image className="md:max-w-none mx-auto rounded" src={FeaturesBg01} width={500} height={375} alt="Features bg" />
                      <Image className="md:max-w-none absolute w-full left-0 transform animate-float" src={FeaturesElement01} width={500} height={147} alt="Element 01" style={{ top: '22%' }} />
                      <Image className="md:max-w-none absolute w-full left-0 transform animate-float animation-delay-500" src={FeaturesElement02} width={500} height={158} alt="Element 02" style={{ top: '39%' }} />
                      <Image className="md:max-w-none absolute w-full left-0 bottom-0 transform animate-float animation-delay-1000" src={FeaturesElement03} width={500} height={167} alt="Element 03" style={{ top: '77%' }} />
                    </div>
                  </Transition>
                  

                  <Transition
                    show={tab === 2}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}                  
                  >
                    <div className="relative inline-flex flex-col">
                      <Image className="md:max-w-none mx-auto rounded" src={FeaturesBg01} width={500} height={375} alt="Features bg" />
                      <Image className="md:max-w-none absolute w-full left-0 bottom-0 transform animate-float animation-delay-1000" src={FeaturesElement03} width={500} height={167} alt="Element 03" style={{ top: '18%' }} />
                      <Image className="md:max-w-none absolute w-full left-0 transform animate-float animation-delay-500" src={FeaturesElement02} width={500} height={158} alt="Element 02" style={{ top: '40%' }} />
                      <Image className="md:max-w-none absolute w-full left-0 transform animate-float" src={FeaturesElement01} width={500} height={147} alt="Element 01" style={{ top: '79%' }} />
                    </div>
                  </Transition>
                  
                  <Transition
                    show={tab === 3}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}                  
                  >
                    <div className="relative inline-flex flex-col">
                      <Image className="md:max-w-none mx-auto rounded" src={FeaturesBg01} width={500} height={375} alt="Features bg" />
                      <Image className="md:max-w-none absolute w-full left-0 transform animate-float" src={FeaturesElement01} width={500} height={147} alt="Element 01" style={{ top: '22%' }} />
                      <Image className="md:max-w-none absolute w-full left-0 transform animate-float animation-delay-500" src={FeaturesElement02} width={500} height={158} alt="Element 02" style={{ top: '39%' }} />
                      <Image className="md:max-w-none absolute w-full left-0 bottom-0 transform animate-float animation-delay-1000" src={FeaturesElement03} width={500} height={167} alt="Element 03" style={{ top: '77%' }} />
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

          </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}