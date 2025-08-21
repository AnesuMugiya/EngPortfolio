import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import gsap from "gsap";
import clsx from "clsx";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 100) {
        // At top of page - show full nav
        setIsNavVisible(true);
        gsap.to(navRef.current, { 
          backgroundColor: "rgba(15, 23, 42, 0)",
          backdropFilter: "blur(0px)",
          duration: 0.3 
        });
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide nav
        setIsNavVisible(false);
      } else {
        // Scrolling up - show nav with glass effect
        setIsNavVisible(true);
        gsap.to(navRef.current, { 
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Lighter, more transparent
          backdropFilter: "blur(12px)", // Increased blur for stronger frost effect
          // border: "1px solid rgba(255, 255, 255, 0.1)", // Optional subtle border
          duration: 0.3 
        });
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Animate nav appearance
  useEffect(() => {
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isNavVisible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50  transition-all duration-300"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <a 
            href="#home" 
            className="text-2xl font-medium font-(family-name:--font-curl) text-[#f4c331] transition hover:text-[#b59410]"
          >
            Anesu.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#b59410] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://github.com/AnesuMugiya/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#f4c331] hover:text-[#b59410] transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/anesu-mugiya/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#f4c331] hover:text-[#b59410] transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a 
              href="mailto:anesutmugiya@gmail.com" 
              className="text-[#f4c331] hover:text-[#b59410] transition-colors"
            >
              <HiOutlineMail size={22} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-slate-300 hover:text-[#b59410] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex space-x-6 pt-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#b59410] transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#b59410] transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="mailto:your.email@example.com" 
                className="text-slate-300 hover:text-[#b59410] transition-colors"
              >
                <HiOutlineMail size={22} />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;