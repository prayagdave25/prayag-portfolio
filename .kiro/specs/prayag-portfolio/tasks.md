# Implementation Plan: Prayag Portfolio Website

## Overview

This implementation plan breaks down the portfolio website development into discrete, incremental coding tasks. Each task builds on previous work, starting with project setup, then implementing core components, adding animations and styling, and finally ensuring accessibility and performance optimization.

The portfolio will be built using Next.js 14 (App Router), TailwindCSS, TypeScript, and Framer Motion. All tasks reference specific requirements for traceability.

## Tasks

- [x] 1. Initialize Next.js project and configure development environment
  - Create Next.js 14 project with App Router and TypeScript
  - Install dependencies: TailwindCSS, Framer Motion, react-icons
  - Configure Tailwind with custom design system colors (deep navy, charcoal, electric violet)
  - Set up project structure (components/, lib/, public/ directories)
  - Create global styles with dark mode theme
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 2. Create design system constants and utilities
  - [x] 2.1 Create lib/constants.ts with all content data
    - Define heroContent with headline and sub-headline
    - Define technologyCategories with all 5 categories and technologies
    - Define vectorLoomProject with features and tech stack
    - Define skillsPillars with Enterprise Lead and AI Innovator data
    - Define chatConfig with placeholder and sample questions
    - _Requirements: 1.1, 1.2, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 5.1, 5.2_
  
  - [x] 2.2 Create lib/animations.ts with Framer Motion variants
    - Define fadeInUp, fadeIn, scaleIn animation variants
    - Define staggerContainer for sequential animations
    - Define slideInLeft and slideInRight variants
    - Define hoverLift and hoverScale interaction variants
    - Ensure all variants use only transform and opacity (GPU-accelerated)
    - _Requirements: 1.3, 8.4_

- [x] 3. Build reusable UI components
  - [x] 3.1 Create components/ui/Card.tsx
    - Implement Card component with dark mode styling
    - Apply background-secondary color and border
    - Add hover effects with smooth transitions
    - Make responsive with proper padding
    - _Requirements: 6.2, 6.5_
  
  - [x] 3.2 Create components/ui/Badge.tsx
    - Implement Badge component for technology tags
    - Style with accent color and rounded corners
    - Add icon support alongside text
    - Make size responsive
    - _Requirements: 3.7, 6.3_
  
  - [x] 3.3 Create components/ui/AnimatedCounter.tsx
    - Implement counter animation component (for future use)
    - Use Framer Motion for smooth count-up effect
    - Accept target number and duration props
    - _Requirements: 1.3_

- [x] 4. Implement HeroSection component
  - [x] 4.1 Create components/HeroSection.tsx
    - Build full viewport height section with centered content
    - Implement headline and sub-headline with proper typography
    - Use Framer Motion for staggered fade-in and slide-up animations
    - Apply responsive text sizing (text-4xl mobile, text-6xl desktop)
    - Use semantic HTML with h1 for headline
    - Ensure high contrast text colors (WCAG AA compliance)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 6.4, 9.5_
  
  - [ ]* 4.2 Write unit tests for HeroSection
    - Test that headline text renders correctly
    - Test that sub-headline text renders correctly
    - Test responsive typography classes
    - _Requirements: 1.1, 1.2, 1.5_
  
  - [ ]* 4.3 Write property test for HeroSection animations
    - **Property 1: Animation Implementation Consistency**
    - **Validates: Requirements 1.3, 8.4**

- [ ] 5. Implement ChatInterface component
  - [ ] 5.1 Create components/ChatInterface.tsx
    - Build chat container with message area and input field
    - Implement Message interface (id, role, content, timestamp)
    - Create message bubbles with distinct styling for user vs assistant
    - Add placeholder text and sample question chips
    - Implement send button with keyboard support (Enter key)
    - Add typing indicator animation
    - Structure component to accept async onSendMessage callback
    - Apply smooth animations for message appearances
    - Make responsive with touch-friendly controls
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  
  - [ ]* 5.2 Write unit tests for ChatInterface
    - Test placeholder text renders correctly
    - Test message input and send button are present
    - Test sample questions render when provided
    - Test visual indicators (avatars, bubbles) are present
    - _Requirements: 2.1, 2.2, 2.3, 2.5_
  
  - [ ]* 5.3 Write property test for ChatInterface backend integration
    - **Property 4: Backend Integration Interface**
    - **Validates: Requirements 2.4**

- [ ] 6. Checkpoint - Ensure hero and chat components work
  - Verify HeroSection displays correctly with animations
  - Verify ChatInterface renders with proper styling
  - Run tests and fix any issues
  - Ask the user if questions arise

- [ ] 7. Implement TechnologyGrid component
  - [ ] 7.1 Create components/TechnologyGrid.tsx
    - Build grid layout (2 cols mobile, 3 cols tablet, 5 cols desktop)
    - Create category cards with title, icon, and technology list
    - Render technology badges with icons using Badge component
    - Implement staggered entrance animations on scroll
    - Add hover effects (scale + glow) to cards
    - Ensure responsive stacking on mobile
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_
  
  - [ ]* 7.2 Write unit tests for TechnologyGrid
    - Test all 5 categories render correctly
    - Test Backend & Architecture technologies display
    - Test Cloud & DevOps technologies display
    - Test AI & Data Science technologies display
    - Test Frontend & Mobile technologies display
    - Test Databases technologies display
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ]* 7.3 Write property test for technology icons
    - **Property 5: Visual Indicator Presence**
    - **Validates: Requirements 3.7**
  
  - [ ]* 7.4 Write property test for responsive grid behavior
    - **Property 3: Responsive Layout Behavior**
    - **Validates: Requirements 3.8, 7.1, 7.2, 7.3, 7.5**

- [ ] 8. Implement VectorLoomShowcase component
  - [ ] 8.1 Create components/VectorLoomShowcase.tsx
    - Build featured card with gradient violet border
    - Display project title "VectorLoom - Powerful RAG Application"
    - Render technology stack icons (Weaviate, FastAPI, Next.js, LangChain)
    - Create feature cards for 3D Visualization, Hybrid Search, Multi-modal, LLM providers
    - Add GitHub and demo links
    - Implement entrance animations (fade + scale)
    - Add staggered animations for tech icons and features
    - Make responsive with card stacking on mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_
  
  - [ ]* 8.2 Write unit tests for VectorLoomShowcase
    - Test project title displays correctly
    - Test technology icons render (Weaviate, FastAPI, Next.js)
    - Test "3D Vector Visualization" feature displays
    - Test "Hybrid Search" feature displays
    - Test description text is present
    - Test GitHub link is present with correct href
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  
  - [ ]* 8.3 Write property test for VectorLoom animations
    - **Property 1: Animation Implementation Consistency**
    - **Validates: Requirements 4.7**

- [x] 9. Implement SkillsPillars component
  - [x] 9.1 Create components/SkillsPillars.tsx
    - Build two-column layout (stacked on mobile)
    - Create pillar cards for "Enterprise Lead" and "AI Innovator"
    - Display skills lists with icons
    - Apply different violet shades for each pillar
    - Implement slide-in animations (left and right)
    - Add staggered animations for skills list items
    - Add hover lift effect
    - Ensure equal height cards
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 9.2 Write unit tests for SkillsPillars
    - Test "Enterprise Lead" pillar displays with correct technologies
    - Test "AI Innovator" pillar displays with correct technologies
    - Test icons are present for technologies
    - _Requirements: 5.1, 5.2, 5.4_
  
  - [ ]* 9.3 Write property test for visual hierarchy
    - **Property 6: Visual Hierarchy and Separation**
    - **Validates: Requirements 5.3**

- [x] 10. Checkpoint - Ensure all components render correctly
  - Verify all components display with proper styling
  - Test responsive behavior at different breakpoints
  - Run all tests and fix any failures
  - Ask the user if questions arise

- [x] 11. Create main page and integrate all components
  - [x] 11.1 Create app/page.tsx
    - Import and compose all section components
    - Arrange sections in order: Hero, Chat, Technology Grid, VectorLoom, Skills
    - Add proper spacing between sections
    - Wrap sections in semantic HTML (main, section tags)
    - _Requirements: 9.5_
  
  - [x] 11.2 Create app/layout.tsx with metadata
    - Configure root layout with Inter font
    - Add SEO meta tags with correct title
    - Add meta description highlighting key achievements
    - Add Open Graph tags for social media sharing
    - Add JSON-LD structured data for Person schema
    - Ensure proper heading hierarchy
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ]* 11.3 Write unit tests for SEO metadata
    - Test page title is correct
    - Test meta description is present
    - Test Open Graph tags are present
    - Test JSON-LD Person schema is present
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 12. Implement accessibility features
  - [x] 12.1 Add keyboard navigation support
    - Ensure all interactive elements are focusable
    - Add visible focus indicators with ring utilities
    - Test tab navigation flow
    - _Requirements: 10.2_
  
  - [x] 12.2 Add ARIA labels and semantic HTML
    - Add ARIA labels to ChatInterface input and buttons
    - Add ARIA roles where semantic HTML is insufficient
    - Add alt text to all images and icons
    - Ensure screen reader compatibility
    - _Requirements: 10.3_
  
  - [x] 12.3 Implement prefers-reduced-motion support
    - Create useReducedMotion hook
    - Conditionally disable or reduce animations based on user preference
    - Test with prefers-reduced-motion media query
    - _Requirements: 10.4_
  
  - [ ]* 12.4 Write property test for keyboard navigation
    - **Property 10: Keyboard Navigation Support**
    - **Validates: Requirements 10.2**
  
  - [ ]* 12.5 Write property test for screen reader compatibility
    - **Property 11: Screen Reader Compatibility**
    - **Validates: Requirements 10.3**
  
  - [ ]* 12.6 Write property test for reduced motion
    - **Property 12: Reduced Motion Respect**
    - **Validates: Requirements 10.4**
  
  - [ ]* 12.7 Run accessibility audit with jest-axe
    - Test HeroSection for accessibility violations
    - Test ChatInterface for accessibility violations
    - Test TechnologyGrid for accessibility violations
    - Test VectorLoomShowcase for accessibility violations
    - Test SkillsPillars for accessibility violations
    - _Requirements: 10.1_

- [x] 13. Optimize performance
  - [x] 13.1 Optimize images with Next.js Image component
    - Replace any img tags with Next.js Image
    - Add proper width, height, and alt attributes
    - Enable lazy loading for below-fold images
    - _Requirements: 8.3_
  
  - [x] 13.2 Verify animation performance
    - Audit animation variants to ensure only transform/opacity used
    - Test animations maintain 60fps
    - Add error boundaries for component failures
    - _Requirements: 8.2, 8.4_
  
  - [ ]* 13.3 Write property test for image optimization
    - **Property 8: Image Optimization**
    - **Validates: Requirements 8.3**
  
  - [ ]* 13.4 Run Lighthouse performance audit
    - Test that performance score is 90 or above
    - Test that accessibility score is 90 or above
    - Test that SEO score is 90 or above
    - _Requirements: 8.1_

- [x] 14. Implement error handling
  - [x] 14.1 Create ErrorBoundary component
    - Build React Error Boundary class component
    - Add fallback UI for component errors
    - Log errors to console
    - _Requirements: Design - Error Handling_
  
  - [x] 14.2 Add error handling to ChatInterface
    - Handle API connection errors
    - Handle timeout errors
    - Handle invalid response format
    - Display user-friendly error messages
    - _Requirements: Design - Error Handling_

- [ ] 15. Write comprehensive property tests
  - [ ]* 15.1 Write property test for design system colors
    - **Property 2: Design System Color Consistency**
    - **Validates: Requirements 1.4, 6.1, 6.2, 6.3, 6.4**
  
  - [ ]* 15.2 Write property test for interactive feedback
    - **Property 7: Interactive Element Feedback**
    - **Validates: Requirements 6.5**
  
  - [ ]* 15.3 Write property test for semantic HTML
    - **Property 9: Semantic HTML Structure**
    - **Validates: Requirements 9.5**

- [ ] 16. Final checkpoint and polish
  - Run all tests (unit and property) and ensure they pass
  - Test the portfolio on multiple devices and browsers
  - Verify all animations are smooth and performant
  - Check accessibility with screen reader
  - Verify SEO metadata is correct
  - Ask the user for final review and feedback

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- All components should be built with TypeScript for type safety
- Focus on mobile-first responsive design throughout implementation
