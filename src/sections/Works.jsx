import React, { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import TitleHeader from "../components/TitleHeader";
const Works = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const projects = [
    {
      "id": 1,
      "title": "Micro-Mouse Robot",
      "description": "Designed and built a maze-solving robot using STM32 microcontroller, with sensing, power, and motherboard modules.",
      "tags": ["Embedded Systems", "STM32", "Robotics", "Hardware"],
      "category": "Hardware",
      "image": "/images/mc.jpg",
      "github": "https://github.com/AnesuMugiya/EngPortfolio",
      "live": ""
    },
    {
      "id":2,
      "title": "Badger Monitoring System",
      "description": "Developed a real-time honey badger monitoring system using ESP32-CAM devices, cloud-based AI detection, and a Django backend with MQTT.",
      "tags": ["IoT", "AI", "Django", "Embedded Systems", "ESP32-CAM", "YOLOv11n"],
      "category": "Embedded Systems",
      "image": "/images/badger.png",
      "github": "https://github.com/AnesuMugiya/BadgerMoniteringSystem",
      "live": ""
    },
    {
      "id": 3,
      "title": "Human Activity Recognition",
      "description": "A comparative study of Random Forest, Multilayer Perceptron (MLP), and LSTM models for classifying six human activities using smartphone IMU data from the MotionSense dataset. Includes preprocessing, feature extraction, and evaluation with user-wise data splitting.",
      "tags": ["Machine Learning", "PyTorch", "scikit-learn"],
      "category": "Machine Learning",
      "image": "/images/hr.png",
      "github": "https://github.com/AnesuMugiya/MotionSenseProject",
      "live": ""
    },
    {
      "id": 4,
      "title": "Codemob",
      "description": "Codemob is a web application that combines a Q&A forum and a tutorial platform. Users can ask questions, watch video tutorials, and interact with mentors to enhance their learning experience. Built with Django, Bootstrap, jQuery, and AJAX.",
      "tags": ["Django", "Bootstrap", "jQuery", "AJAX", "Web Development", "Learning Platform"],
      "category": "Software",
      "image": "/images/codem.png",
      "github": "https://github.com/AnesuMugiya/Codemob",
      "live": ""
    }

  ];

  const filters = ['All', 'Machine Learning', 'Embedded Systems', 'Software'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section 
      id="projects" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen"
      
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 ">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse delay-1000 -z-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with glassmorphic effect */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <TitleHeader title="My Projects" />
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-white/80 leading-relaxed">
            Explore my latest work featuring modern technologies and creative solutions
          </p>
        </div>

        {/* Glassmorphic Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`group relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? 'text-white shadow-xl'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {/* Background with glassmorphism */}
              <div className={`absolute inset-0 rounded-full backdrop-blur-md transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-white/20 border border-white/30 shadow-2xl'
                  : 'bg-white/10 border border-white/20 group-hover:bg-white/15 group-hover:border-white/25'
              }`}></div>
              
              {/* Active filter glow effect */}
              {activeFilter === filter && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-100/50 to-amber-400/50 blur-sm"></div>
              )}
              
              <span className="relative z-5">{filter}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid with enhanced responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Glassmorphic card background */}
              <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/15 hover:border-white/30">
                
                {/* Hover glow effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Image container with overlay */}
                <div className="pointer-events-none relative h-48 sm:h-52 lg:h-48 xl:h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Floating action buttons */}
                  <div className="z-10 absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="z-10 p-2 backdrop-blur-md bg-white/20 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
                    >
                      <FiGithub size={16} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 backdrop-blur-md bg-white/20 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 backdrop-blur-md bg-white/20 border border-white/30 rounded-full text-xs font-medium text-white">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 backdrop-blur-sm bg-white/10 border border-white/20 text-white/80 text-xs rounded-full hover:bg-white/20 transition-all duration-200"
                        style={{
                          animationDelay: `${tagIndex * 50}ms`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Bottom action buttons */}
                  <div className="flex space-x-4 pt-4 border-t border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="z-10 flex items-center text-white/70 hover:text-white transition-all duration-200 text-sm font-medium group/link"
                    >
                      <FiGithub className="mr-2 group-hover/link:rotate-12 transition-transform duration-200" size={16} />
                      <span className="group-hover/link:translate-x-1 transition-transform duration-200">View Code</span>
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-white transition-all duration-200 text-sm font-medium group/link"
                      >
                        <FiExternalLink className="mr-2 group-hover/link:rotate-12 transition-transform duration-200" size={16} />
                        <span className="group-hover/link:translate-x-1 transition-transform duration-200">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Shimmer effect on hover */}
                <div className="pointer-events-none z-5 absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state with glassmorphism */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-block p-8 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-white/70">Try selecting a different filter</p>
            </div>
          </div>
        )}
      </div>

      {/* Additional floating elements */}
      <div className="pointer-events-none absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/50 to-amber-100/20 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="pointer-events-none absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-amber-400/50 to-amber-100/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Works;