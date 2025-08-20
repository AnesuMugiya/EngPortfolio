import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Typewriter from "../components/Typewriter";
import Button from "../components/Button";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden lg:min-h-screen"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 z-0 w-full">
        <img src="/images/g.jpg" alt="" className="w-full h-auto" />
      </div>

      {/* Hero layout */}
      <div className="
      relative z-10 xl:mt-10 mt-32 md:h-dvh h-[80vh] flex xl:items-center justify-center
      flex-col lg:flex-row items-center w-full px-5 md:px-20 gap-4 sm:gap-8 lg:gap-12 py-10 lg:py-0">
        
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center text-center lg:text-left w-full lg:w-1/2 gap-4 sm:gap-6">
          <div className="hero-text">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">Hello, I'm</h1>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold whitespace-pre-line">
              <Typewriter
                words={[
                  "Anesu Mugiya",
                  "an Electrical and\nComputer Engineer",
                  "an Undergraduate at UCT",
                  "passionate about Tech",
                ]}
              />
            </h1>
          </div>

          <p className="text-[#eabe7b] text-base sm:text-lg md:text-xl relative z-10 pointer-events-none">
            Let's make something great
          </p>

          <Button
            text="See My Work"
            className="md:w-80 md:h-16 w-48 h-12 mx-auto lg:mx-0"
            id="projects"
          />
        </header>

        {/* RIGHT: Image */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          <img
            src="/images/avatar.png"
            alt="Me"
            className="rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
