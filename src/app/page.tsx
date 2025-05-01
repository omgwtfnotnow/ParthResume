import ProjectsGrid from '@/components/projects-grid'; // Import the new ProjectsGrid
import ResumeTimeline from '@/components/resume-timeline';
import ScrollObserver from '@/components/scroll-observer';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Import Link for smooth scrolling buttons
import { Github, Linkedin, Mail } from 'lucide-react'; // Import icons for contact section

export default function Home() {
  return (
    <ScrollObserver>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section id="home" className="h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center p-8 -mt-16 pt-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp scroll-target">
              Welcome to My Portfolio
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fadeInUp scroll-target" style={{ animationDelay: '0.2s' }}>
              Showcasing my journey and projects in web development.
            </p>
            <div className="flex justify-center gap-4 animate-fadeInUp scroll-target" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" variant="secondary" asChild>
                <Link href="#projects">View Projects</Link>
              </Button>
              {/* Updated Button: Removed text-primary-foreground, adjusted hover */}
              <Button size="lg" variant="outline" className="border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-[60vh] flex items-center justify-center py-16 px-4 md:px-8 bg-background scroll-mt-16">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 scroll-target animate-fadeInUp">About Me</h2>
            <p className="text-lg text-muted-foreground mb-4 scroll-target animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              I'm a passionate software engineer specializing in creating modern, responsive, and user-friendly web applications. With a strong foundation in front-end and back-end technologies, I love bringing ideas to life through code.
            </p>
            <p className="text-lg text-muted-foreground scroll-target animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              My goal is to build efficient, scalable, and visually appealing digital experiences. Let's create something amazing together!
              {/* Consider adding skills here or in a dedicated section */}
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex flex-col items-center py-16 px-4 md:px-8 bg-secondary scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-target animate-fadeInUp">My Projects</h2>
          <div className="w-full max-w-6xl">
             <ProjectsGrid /> {/* Use the new ProjectsGrid component */}
          </div>
        </section>

        {/* Experience Section - Removed min-h-screen, changed py-16 to py-12 */}
        <section id="experience" className="flex flex-col items-center py-12 px-4 md:px-8 bg-background scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-target animate-fadeInUp">Work Experience</h2>
          <ResumeTimeline filterType="experience" />
        </section>

        {/* Education Section - Removed min-h-screen, changed py-16 to py-12 */}
        <section id="education" className="flex flex-col items-center py-12 px-4 md:px-8 bg-secondary scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-target animate-fadeInUp">Education</h2>
          <ResumeTimeline filterType="education" />
        </section>


        {/* Contact Section */}
        <section id="contact" className="min-h-[50vh] flex items-center justify-center py-16 px-4 md:px-8 bg-background scroll-mt-16"> {/* Changed bg to background, reduced min-h */}
          <div className="w-full max-w-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 scroll-target animate-fadeInUp">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 scroll-target animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              Feel free to reach out or connect with me on social media!
            </p>
            <div className="flex justify-center items-center space-x-6 scroll-target animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
