import React from 'react'

function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex group">
          <img
            src="/images/me.png"
            alt="mockup"
            className="w-full h-auto filter grayscale group-hover:grayscale-0 transition duration-1000 ease-out"
          />
        </div>

          <div className="ml-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-7 tracking-tight leading-nonexl:text-6xl font-semibold md:text-5xl text-3xl ">About Me</h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
                I am an Electrical and Computer Engineering student, 
                currently on track to graduate with Honors. My academic journey 
                has given me a strong foundation in both hardware and software, 
                allowing me to approach problems from multiple perspectives and 
                design creative, efficient solutions.
              </p>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
                Beyond the classroom, I’m passionate about exploring how technology 
                can be used to solve real-world challenges. Whether it’s working 
                on projects that blend electronics with programming or learning new 
                tools and concepts, 
                I’m driven by curiosity and a desire to keep improving.
              </p>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">
                Looking ahead, I’m excited to apply my skills to meaningful projects, 
                contribute to innovative teams, and continue growing as an engineer.
              </p>
              
              <a
                href="/cv.pdf"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-[#f4c331] border border-white-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-800 dark:hover:bg-white dark:focus:ring-white"
              >
                Download CV
              </a>

          </div>
            
      
      </div>

     
    </section>
  );
}

export default About