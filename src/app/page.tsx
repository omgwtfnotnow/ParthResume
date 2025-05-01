

import ProjectsGrid from '@/components/projects-grid'; // Import the new ProjectsGrid
import ResumeTimeline from '@/components/resume-timeline';
import ScrollObserver from '@/components/scroll-observer';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link for smooth scrolling buttons
import { Github, Linkedin, Mail } from 'lucide-react'; // Import icons for contact section
import { BackgroundGradientAnimation } from '@/components/background-gradient-animation'; // Import the new component

export default function Home() {
  return (
    <ScrollObserver>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section with BackgroundGradientAnimation */}
        <section
          id="home"
          className="h-[calc(100vh-4rem)] relative -mt-16 pt-16" // Removed old gradient, set relative for absolute children
        >
          <BackgroundGradientAnimation>
            {/* Content overlayed on the gradient */}
            <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none"> {/* Added z-10, removed z-50 from user example as z-10 should be sufficient */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white animate-fadeInUp scroll-target"> {/* Changed text to white */}
                Hi, I am Parth Vasave
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 animate-fadeInUp scroll-target" style={{ animationDelay: '0.2s' }}> {/* Changed text to white/80 */}
                Showcasing my journey and projects in web development.
              </p>
               {/* Content structure matches the user example's intent */}
            </div>
          </BackgroundGradientAnimation>
        </section>

        {/* About Section - Remains bg-background */}
        <section id="about" className="min-h-[60vh] flex items-center justify-center py-16 px-4 md:px-8 bg-background scroll-mt-16">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 scroll-target animate-fadeInUp">About Me</h2>
            {/* Updated About Me content */}
            <p className="text-lg text-muted-foreground mb-4 scroll-target animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              Hey there! I’m a passionate and curious Computer Science student with a love for building things that live on the web—and sometimes beyond it. Whether it’s a sleek website or a fun little experiment with code, I enjoy solving problems and turning ideas into interactive realities.
            </p>
            <p className="text-lg text-muted-foreground scroll-target animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              I’m currently pursuing my Bachelor of Engineering in Computer Science and Engineering (Data Science) from the University of Mumbai. Along the way, I’ve worked on diverse projects ranging from 3D web experiences and game development to full-stack apps. I enjoy experimenting with new technologies and pushing my creative and technical boundaries.
            </p>
          </div>
        </section>

        {/* Projects Section - Changed bg-secondary to bg-background */}
        <section id="projects" className="min-h-screen flex flex-col items-center py-16 px-4 md:px-8 bg-background scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-target animate-fadeInUp">My Projects</h2>
          <div className="w-full max-w-6xl">
             <ProjectsGrid /> {/* Use the new ProjectsGrid component */}
          </div>
        </section>

        {/* Experience Section - Remains bg-background */}
        <section id="experience" className="flex flex-col items-center py-12 px-4 md:px-8 bg-background scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-target animate-fadeInUp">Work Experience</h2>
          <ResumeTimeline filterType="experience" />
        </section>

        {/* Education Section - Changed bg-secondary to bg-background */}
        <section id="education" className="flex flex-col items-center py-12 px-4 md:px-8 bg-background scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-target animate-fadeInUp">Education</h2>
          <ResumeTimeline filterType="education" />
        </section>


        {/* Contact Section - Remains bg-background */}
        <section id="contact" className="min-h-[50vh] flex items-center justify-center py-16 px-4 md:px-8 bg-background scroll-mt-16"> {/* Changed bg to background, reduced min-h */}
          <div className="w-full max-w-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 scroll-target animate-fadeInUp">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 scroll-target animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              Feel free to reach out or connect with me on social media!
            </p>
            <div className="flex justify-center items-center space-x-6 scroll-target animate-fadeInUp pointer-events-auto" style={{ animationDelay: '0.2s' }}> {/* Added pointer-events-auto */}
              <a
                href="https://github.com/omgwtfnotnow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <Github size={32} />
              </a>
              <a
                href="https://www.linkedin.com/in/parth-vasave/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="mailto:Mailparthvasave@gmail.com"
                className="text-foreground hover:text-accent transition-colors duration-200"
                aria-label="Email Parth Vasave"
              >
                <Mail size={32} />
              </a>
            </div>
          </div>
        </section>

      </div>
    </ScrollObserver>
  );
}
