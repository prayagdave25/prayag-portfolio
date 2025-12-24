import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
// import { ChatInterface } from '@/components/ChatInterface';
import { TechnologyGrid } from '@/components/TechnologyGrid';
import { VectorLoomShowcase } from '@/components/VectorLoomShowcase';
import { SkillsPillars } from '@/components/SkillsPillars';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { 
  heroContent, 
  // chatConfig,
  technologyCategories,
  vectorLoomProject,
  skillsPillars 
} from '@/lib/constants';

export default function Home() {
  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-text-primary focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-secondary"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <ErrorBoundary componentName="Hero Section">
          <section id="hero" className="min-h-screen" aria-label="Introduction">
            <HeroSection 
              headline={heroContent.headline}
              subHeadline={heroContent.subHeadline}
            />
          </section>
        </ErrorBoundary>

        {/* About Section */}
        <ErrorBoundary componentName="About Section">
          <section id="about" className="py-20 px-4 md:px-8 lg:px-16 bg-background-secondary" aria-label="About Me">
            <AboutSection />
          </section>
        </ErrorBoundary>

        {/* Chat Interface Section */}
        {/* TODO: Uncomment when ChatInterface component is implemented (Task 5) */}
        {/* <ErrorBoundary componentName="Chat Interface">
          <section id="chat" className="py-20 px-4 md:px-8 lg:px-16" aria-label="Interactive Chat">
            <ChatInterface 
              placeholderText={chatConfig.placeholderText}
              sampleQuestions={chatConfig.sampleQuestions}
            />
          </section>
        </ErrorBoundary> */}

        {/* Skills Pillars Section */}
        <ErrorBoundary componentName="Skills Pillars">
          <section id="skills" className="py-20 px-4 md:px-8 lg:px-16" aria-label="Professional Skills">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
              Dual Expertise
            </h2>
            <SkillsPillars pillars={skillsPillars} />
          </section>
        </ErrorBoundary>

        {/* Technology Grid Section */}
        <ErrorBoundary componentName="Technology Grid">
          <section id="technologies" className="py-20 px-4 md:px-8 lg:px-16 bg-background-secondary" aria-label="Technology Expertise">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
              Technology Stack
            </h2>
            <TechnologyGrid categories={technologyCategories} />
          </section>
        </ErrorBoundary>

        {/* VectorLoom Showcase Section */}
        <ErrorBoundary componentName="VectorLoom Showcase">
          <section id="vectorloom" className="py-20 px-4 md:px-8 lg:px-16" aria-label="Featured Project">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
              Featured Project
            </h2>
            <VectorLoomShowcase 
              title={vectorLoomProject.title}
              tagline={vectorLoomProject.tagline}
              description={vectorLoomProject.description}
              features={vectorLoomProject.features}
              techStack={vectorLoomProject.techStack}
              githubUrl={vectorLoomProject.githubUrl}
              demoUrl={vectorLoomProject.demoUrl}
            />
          </section>
        </ErrorBoundary>

        {/* Experience Section */}
        <ErrorBoundary componentName="Experience Section">
          <section id="experience" className="py-20 px-4 md:px-8 lg:px-16 bg-background-secondary" aria-label="Professional Experience">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4 font-mono">
              <span className="text-accent-primary">{'# '}</span>
              Experience Roadmap
            </h2>
            <p className="text-center text-text-secondary mb-12 font-mono text-sm">
              <span className="text-accent-primary">{'// '}</span>
              A decade of building financial systems and pioneering AI innovation
            </p>
            <ExperienceSection />
          </section>
        </ErrorBoundary>

        {/* Contact Section */}
        <ErrorBoundary componentName="Contact Section">
          <section id="contact" className="py-20 px-4 md:px-8 lg:px-16" aria-label="Contact Information">
            <ContactSection />
          </section>
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}
