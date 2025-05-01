import PortfolioViewer from '@/components/portfolio-viewer';
import ResumeTimeline from '@/components/resume-timeline';
import ScrollObserver from '@/components/scroll-observer';

export default function Home() {
  return (
    <ScrollObserver>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section (Optional, can be added later) */}
        {/* <section id="hero" className="h-screen flex items-center justify-center bg-secondary text-center p-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">Welcome to Personal Zenith</h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fadeInUp" style={{ animationDelay: '0.2s' }}>My interactive portfolio and resume</p>
          </div>
        </section> */}

        {/* Portfolio Section */}
        <section id="portfolio" className="h-screen flex flex-col items-center justify-center p-4 md:p-8 scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center scroll-target">My Projects</h2>
          <div className="w-full h-[calc(100%-6rem)] md:h-[calc(100%-8rem)]">
            <PortfolioViewer />
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="min-h-screen flex flex-col items-center py-16 px-4 md:px-8 bg-secondary scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center scroll-target">My Journey</h2>
          <ResumeTimeline />
        </section>

        {/* Contact Section (Optional, can be added later) */}
        {/* <section id="contact" className="min-h-[50vh] flex items-center justify-center p-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center scroll-target">Get In Touch</h2>
            {/* Add Contact Form or Info Here *}
          </div>
        </section> */}

      </div>
    </ScrollObserver>
  );
}
