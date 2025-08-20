import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const StarWrapper = (Component, idName) =>
  function constants() {
    const sectionRef = useRef(null);

    useEffect(() => {
      // Stagger animation for child elements
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
    }, []);

    return (
      <section
        ref={sectionRef}
        className="max-w-7xl mx-auto relative z-0"
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    );
  };

export default StarWrapper;