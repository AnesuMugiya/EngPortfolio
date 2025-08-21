import React from 'react'

function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="/images/me.png" alt="mockup"></img>
          </div>  
          <div class="ml-auto place-self-center lg:col-span-7">
              <h1 class="max-w-2xl mb-4 tracking-tight leading-nonexl:text-6xl font-semibold md:text-5xl text-3xl">About Me</h1>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                I am an Electrical and Computer Engineering student, 
                currently on track to graduate with Honors. My academic journey 
                has given me a strong foundation in both hardware and software, 
                allowing me to approach problems from multiple perspectives and 
                design creative, efficient solutions.
              </p>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Beyond the classroom, I’m passionate about exploring how technology 
                can be used to solve real-world challenges. Whether it’s working 
                on projects that blend electronics with programming or learning new 
                tools and concepts, 
                I’m driven by curiosity and a desire to keep improving.
              </p>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Looking ahead, I’m excited to apply my skills to meaningful projects, 
                contribute to innovative teams, and continue growing as an engineer.
              </p>
              
              <a href="/cv.pdf" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  Download CV
              </a> 
          </div>
            
      
      </div>

      {/* Additional floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
}

export default About