import VideoThumb from '@/public/images/hero-image-01.png';
import ModalVideo from '@/components/modal-video';
import Link from 'next/link';

export default function HeroHome() {
  return (
    <section className="relative min-h-screen bg-white"> {/* Ensure a background color for contrast with the SVG */}

      {/* Illustration behind hero content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none"> {/* Adjusted for full coverage */}
        <svg width="100%" height="100%" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
            <circle cx="700" cy="400" r="96" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 z-10"> {/* Adjusted z-index for content to be on top */}

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Folio <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">AI</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Apply to jobs smarter and faster.</p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <Link href="/signup" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">Try for Free</Link>
                </div>
                {/* Additional buttons or content can be added here */}
              </div>
            </div>
          </div>

          {/* Hero image */}
          {/* Implement ModalVideo component if needed */}

        </div>

      </div>
    </section>
  );
}
