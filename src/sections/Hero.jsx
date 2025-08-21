import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Typewriter from "../components/Typewriter";
import Button from "../components/Button";
import Dither from '../components/Dither';

gsap.registerPlugin(useGSAP);

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden lg:min-h-screen "
      
    >

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[100vh] inset-0 ">
        {/* <img src="https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?q=80&w=1048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-auto z-0" /> */}
          <Dither
          waveColor={[1, 0.9, 0]}
          // waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={10}
          waveAmplitude={0.2}
          waveFrequency={1.4}
          waveSpeed={0.03}
        />
        <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      </div>

      {/* Hero layout */}
      <div className="
      pointer-events-none overflow-hidden relative z-10 xl:mt-10 mt-32 md:h-dvh  flex xl:items-center justify-center
      flex-col lg:flex-row items-center w-full px-5 md:px-20 gap-4 sm:gap-8 lg:gap-12 py-10 lg:py-0 bg-none">
        
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center text-center lg:text-left w-full lg:w-1/2 gap-4 sm:gap-6">
          <div className="hero-text">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-(family-name:--font-curl) font-medium">Hello, I'm</h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium font-(family-name:--font-curl)  whitespace-pre-line">
              <Typewriter
                words={[
                  "Anesu Mugiya",
                  "an Electrical and\nComputer Engineer",
                  "an Undergraduate at UCT",
                  "Passionate About Tech",
                ]}
              />
            </h1>
          </div>

          {/* <p className="text-[#f4c331] text-base sm:text-lg md:text-xl relative z-10 pointer-events-none">
            Let's make something great together!
          </p> */}

          <Button
            text="See My Work"
            className="md:w-80 md:h-16 w-48 h-12 mx-auto mt-5 lg:mx-0 pointer-events-auto"
            id="projects"
          />
        </header>

        {/* RIGHT: Image */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          <img
            src="/images/avat.png"
            alt="Me"
            className="pointer-events-none rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-auto object-contain"
          />
        </div>
        

        {/* <div id="imageContainer" className="flex justify-center lg:justify-end w-full h-[80vh] lg:w-1/2">
        <WavyImage src="/images/avatar.png" id="myImage" className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-[80-vh] object-contain" />
      </div> */}
      
        {/* <div className="flex justify-center lg:justify-end w-full lg:w-1/2 bg-transparent">
          <ChromaticWavyImage
          src="/images/avatar.png"
          className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl bg-transparent"
        />
        </div> */}





      </div>



      
    </section>
  );
};

export default Hero;
