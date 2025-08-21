import About from "./sections/About";
import Hero from "./sections/Hero";
import NavBar from "./sections/NavBar";
import Works from "./sections/Works";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  return (
    
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Works />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;