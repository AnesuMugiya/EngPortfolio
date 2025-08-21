import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards, eduCards } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // 1) Card pan-in on scroll (unchanged)
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    // 2) Animate timeline line reveal as user scrolls through each column
    gsap.utils.toArray(".timeline-column").forEach((col) => {
      const line = col.querySelector(".timeline");
      if (!line) return;

      // Start with line scaled to 0
      gsap.set(line, { scaleY: 0 });

      gsap.to(line, {
        scaleY: 1,
        transformOrigin: "top top",
        ease: "none",
        scrollTrigger: {
          trigger: col,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    });

    // 3) Text fade/slide (unchanged)
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    }, "<");
  }, []);

  return (
    <section id="experience" className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Experience & Education" />

        {/* 2-col on desktop, stacked on mobile */}
        <div className="mt-32 grid md:grid-cols-2 gap-16">
          {/* EXPERIENCE COLUMN */}
          <div className="timeline-column relative">
            {/* Continuous gradient line positioned to go through dots */}
            <div className="absolute left-[5px] top-[70px] w-px h-full overflow-hidden">
              {/* <span className="gradient-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-400 via-yellow-300 to-white/60" /> */}
              <span className="timeline absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-400 via-yellow-300 to-white/60" />
            </div>

            <h2 className="text-2xl font-bold mb-10">Experience</h2>

            <div className="space-y-12">
              {expCards.map((card, index) => (
                <div key={card.title} className="timeline-card flex items-start gap-6">
                  {/* Dot positioned exactly on the line */}
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-amber-400/50 relative z-10" />
                  </div>

                  <div className="expText">
                    <h3 className="font-semibold text-xl">{card.title}</h3>
                    <p className="text-white/60 text-sm mt-1">🗓️ {card.date}</p>

                    {card.subtitle && (
                      <p className="text-white/70 italic mt-2">{card.subtitle}</p>
                    )}

                    <p className="text-[#839CB5] italic mt-3">Responsibilities</p>
                    <ul className="list-disc ml-5 mt-2 space-y-2 text-white/70">
                      {card.responsibilities.map((res, i) => (
                        <li key={i} className="text-base">{res}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION COLUMN */}
          <div className="timeline-column relative">
            {/* Continuous gradient line positioned to go through dots */}
            <div className="absolute left-[5px] top-[70px] w-px h-full overflow-hidden">
              {/* <span className="gradient-line absolute top-0 left-0 w-full h-full bg-gradient-to-b from-fuchsia-400 via-purple-400 to-indigo-300" /> */}
              <span className="timeline absolute top-0 left-0 w-full h-full bg-gradient-to-b from-fuchsia-400 via-purple-400 to-indigo-300" />
            </div>

            <h2 className="text-2xl font-bold mb-10">Education</h2>

            <div className="space-y-12">
              {eduCards.map((edu, index) => (
                <div key={edu.title} className="timeline-card flex items-start gap-6">
                  {/* Dot positioned exactly on the line */}
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-fuchsia-400 border-2 border-fuchsia-400/50 relative z-10" />
                  </div>

                  <div className="expText">
                    <h3 className="font-semibold text-xl">{edu.title}</h3>
                    <p className="text-white/60 text-sm mt-1">🗓️ {edu.date}</p>

                    {edu.thesis && (
                      <>
                        <p className="text-[#839CB5] italic mt-3">Thesis Topic</p>
                        <p className="text-white/70 mt-2">{edu.thesis}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;