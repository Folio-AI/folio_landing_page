export default function Cta() {
  return (
    <section id="waitlist">
      <style>
        {`
          .border-hover:focus {
            border-color: linear-gradient(to right, #1e3c72, #2a5298);
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20">
        <div className="pb-12 md:pb-20">

          {/* CTA box */}
          <div className="bg-blue-600 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl" data-aos="zoom-y-out">
            <div className="flex flex-col lg:flex-row justify-between items-center">

              {/* CTA content */}
              <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left">
                <h3 className="h3 text-white mb-2">Join Waitlist</h3>
                <p className="text-white text-lg opacity-75">Get notified of our first beta release.</p>
              </div>

              {/* CTA input and button */}
              <div className="flex items-center space-x-4">
                
                {/* CTA text input for user emails */}
                {/* <div className="w-64">
                  <input 
                    className="w-full h-12 px-4 py-2 text-sm rounded-md border border-gray-300 bg-white text-black shadow-sm focus:outline-none transition duration-300 ease-in-out border-hover" 
                    type="email" 
                    placeholder="roshun@usefolio.ai" 
                    aria-label="Your email…" 
                  />
                </div> */}
                
                {/* CTA button */}
                <div>
                  <a className="btn text-blue-600 bg-gradient-to-r from-blue-100 to-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                     target="_blank"
                     href="https://airtable.com/apptTVG7fIOLSxJpa/shrQnLqwM1gcwJ49L">
                    Join
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
