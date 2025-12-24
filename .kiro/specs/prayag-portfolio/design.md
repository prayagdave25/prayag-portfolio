# Design Document: Prayag Portfolio Website

## Overview

This design document outlines the architecture and implementation approach for building a high-conversion, professional portfolio website for Prayag Vikram Dave. The portfolio will be built using Next.js 14 with the App Router, TailwindCSS for styling, and Framer Motion for animations. The design emphasizes a dark mode aesthetic with deep navy backgrounds, charcoal accents, and electric violet highlights to convey technical sophistication.

The portfolio serves dual purposes:
1. **Immediate Impact**: Showcase Prayag's 10 years of enterprise FinTech experience with national-scale systems
2. **Future-Forward Positioning**: Highlight his transition into AI Engineering with VectorLoom as the flagship project

The architecture is designed to be performant, accessible, and easily extensible for future enhancements like integrating the VectorLoom backend for the interactive chat feature.

## Architecture

### Technology Stack

**Frontend Framework**: Next.js 14 (App Router)
- Server-side rendering for optimal SEO and performance
- React Server Components for reduced client-side JavaScript
- Built-in image optimization and lazy loading
- File-based routing for clean URL structure

**Styling**: TailwindCSS v3
- Utility-first approach for rapid development
- Custom color palette for dark mode design system
- Responsive design utilities for mobile-first development
- JIT (Just-In-Time) compilation for optimal bundle size

**Animation**: Framer Motion v10
- Declarative animation API for smooth transitions
- Scroll-triggered animations for engagement
- GPU-accelerated transforms for 60fps performance
- Gesture support for interactive elements

**TypeScript**: For type safety and better developer experience

### Project Structure

```
prayag-portfolio/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page (all sections)
│   └── globals.css             # Global styles and Tailwind imports
├── components/
│   ├── HeroSection.tsx         # Hero with headline and sub-headline
│   ├── ChatInterface.tsx       # Interactive chat UI component
│   ├── TechnologyGrid.tsx      # Technology stack showcase
│   ├── VectorLoomShowcase.tsx  # Featured project section
│   ├── SkillsPillars.tsx       # Enterprise Lead & AI Innovator
│   └── ui/
│       ├── Card.tsx            # Reusable card component
│       ├── Badge.tsx           # Technology badge component
│       └── AnimatedCounter.tsx # Count-up animation component
├── lib/
│   ├── constants.ts            # Technology lists, colors, content
│   └── animations.ts           # Reusable Framer Motion variants
├── public/
│   ├── icons/                  # Technology icons and logos
│   └── images/                 # Project screenshots and assets
├── tailwind.config.ts          # Custom theme configuration
└── package.json
```

### Design System

**Color Palette**:
```typescript
const colors = {
  background: {
    primary: '#0A192F',    // Deep navy
    secondary: '#1E293B',  // Charcoal
    tertiary: '#334155',   // Lighter charcoal
  },
  accent: {
    primary: '#8B5CF6',    // Electric violet
    secondary: '#A78BFA',  // Lighter violet
    hover: '#7C3AED',      // Darker violet for hover
  },
  text: {
    primary: '#F1F5F9',    // Off-white
    secondary: '#CBD5E1',  // Light gray
    muted: '#94A3B8',      // Muted gray
  },
  border: '#334155',       // Subtle borders
}
```

**Typography**:
- Headings: Inter font family (bold, 600-800 weight)
- Body: Inter font family (regular, 400-500 weight)
- Code/Technical: JetBrains Mono (monospace)

**Spacing Scale**: Following Tailwind's default spacing (4px base unit)

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Components and Interfaces

### 1. HeroSection Component

**Purpose**: Create immediate impact with professional positioning and value proposition.

**Interface**:
```typescript
interface HeroSectionProps {
  headline: string;
  subHeadline: string;
}
```

**Implementation Details**:
- Full viewport height (min-h-screen) with centered content
- Animated text entrance: fade-in + slide-up using Framer Motion
- Staggered animation for headline, sub-headline, and CTA
- Gradient background overlay for depth
- Responsive typography scaling (text-4xl on mobile, text-6xl on desktop)

**Animation Sequence**:
1. Headline fades in and slides up (delay: 0ms, duration: 600ms)
2. Sub-headline fades in and slides up (delay: 200ms, duration: 600ms)
3. CTA button fades in (delay: 400ms, duration: 600ms)

**Accessibility**:
- Semantic HTML with h1 for headline
- High contrast text (F1F5F9 on 0A192F)
- Focus indicators for interactive elements

### 2. ChatInterface Component

**Purpose**: Provide an innovative, interactive way to explore Prayag's resume through a chat-like interface.

**Interface**:
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  placeholderText: string;
  sampleQuestions?: string[];
  onSendMessage?: (message: string) => Promise<Message>;
}
```

**Implementation Details**:
- Chat container with fixed height and scrollable message area
- Message bubbles with distinct styling for user vs assistant
- Input field with send button and keyboard support (Enter to send)
- Placeholder text: "Ask me about Prayag's experience with CSD Ghana or his work with RAG"
- Sample questions displayed as clickable chips above input
- Typing indicator animation for assistant responses
- Avatar icons for user and assistant messages

**UI Structure**:
```
┌─────────────────────────────────────┐
│  Chat with my Resume                │
├─────────────────────────────────────┤
│                                     │
│  [Assistant Avatar] Welcome! Ask... │
│                                     │
│  [Sample Question Chips]            │
│  • CSD Ghana experience             │
│  • VectorLoom RAG work              │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [Input Field]              [Send]  │
└─────────────────────────────────────┘
```

**Future Integration Points**:
- `onSendMessage` prop accepts async function for VectorLoom API calls
- Message state management ready for real backend responses
- Error handling structure for API failures
- Loading states for async operations

**Animation**:
- Messages slide in from bottom with fade (duration: 300ms)
- Typing indicator pulses (3 dots animation)
- Smooth scroll to latest message

### 3. TechnologyGrid Component

**Purpose**: Showcase comprehensive technology expertise across multiple domains.

**Interface**:
```typescript
interface TechnologyCategory {
  title: string;
  icon: string;
  technologies: Technology[];
}

interface Technology {
  name: string;
  icon?: string;
  proficiency?: 'expert' | 'advanced' | 'intermediate';
}

interface TechnologyGridProps {
  categories: TechnologyCategory[];
}
```

**Implementation Details**:
- Grid layout: 2 columns on mobile, 3 columns on tablet, 5 columns on desktop
- Each category card contains:
  - Category title with icon
  - List of technologies with badges
  - Hover effects for interactivity
- Technology badges with icons (using react-icons or custom SVGs)
- Staggered entrance animation when scrolled into view

**Categories**:
1. **Backend & Architecture**: Java, Spring Boot, EJB, Struts, Hibernate, Microservices, Python, FastAPI
2. **Cloud & DevOps**: AWS (EC2, SQS), Kubernetes, Docker, CI/CD
3. **AI & Data Science**: RAG, Weaviate, Vector Databases, NLP, LangChain, Groq, Ollama
4. **Frontend & Mobile**: Next.js, React, TailwindCSS, Flutter, Android, JavaScript
5. **Databases**: Oracle 12c, MySQL, MS SQL Server, PL/SQL

**Animation**:
- Cards fade in and slide up with stagger (50ms delay between each)
- Hover: scale(1.02) + glow effect on border
- Technology badges animate in with stagger within each card

### 4. VectorLoomShowcase Component

**Purpose**: Highlight VectorLoom as the flagship AI project with technical details and visual appeal.

**Interface**:
```typescript
interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
}

interface TechStack {
  name: string;
  icon: string;
  color: string;
}

interface VectorLoomShowcaseProps {
  title: string;
  description: string;
  features: ProjectFeature[];
  techStack: TechStack[];
  githubUrl: string;
  demoUrl?: string;
}
```

**Implementation Details**:
- Large featured card with gradient border (violet accent)
- Project title: "VectorLoom - Powerful RAG Application"
- Brief description of RAG capabilities
- Technology stack icons: Weaviate, FastAPI, Next.js (with tooltips)
- Feature highlights:
  - 3D Vector Visualization
  - Hybrid Search (semantic + keyword)
  - Multi-modal data ingestion
  - Multiple LLM provider support
- Links to GitHub repository and live demo (if available)
- Screenshot or demo video placeholder

**Layout**:
```
┌─────────────────────────────────────────────┐
│  VectorLoom                                 │
│  Powerful RAG Application                   │
│                                             │
│  [Weaviate] [FastAPI] [Next.js]            │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ 3D Vector│  │ Hybrid   │  │ Multi-   │ │
│  │ Visual   │  │ Search   │  │ modal    │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  [GitHub] [Live Demo]                       │
└─────────────────────────────────────────────┘
```

**Animation**:
- Card entrance: fade + scale from 0.95 to 1
- Tech icons: rotate and fade in with stagger
- Feature cards: slide in from bottom with stagger
- Hover on links: glow effect + scale

### 5. SkillsPillars Component

**Purpose**: Present dual expertise in Enterprise Systems and AI Innovation as distinct but complementary pillars.

**Interface**:
```typescript
interface SkillPillar {
  title: string;
  subtitle: string;
  icon: string;
  skills: string[];
  color: string;
}

interface SkillsPillarsProps {
  pillars: SkillPillar[];
}
```

**Implementation Details**:
- Two-column layout on desktop, stacked on mobile
- Each pillar is a distinct card with:
  - Title: "Enterprise Lead" or "AI Innovator"
  - Icon representing the domain
  - List of key technologies
  - Accent color (different shade of violet for each)
- Visual separator or bridge element between pillars
- Equal height cards for visual balance

**Pillars**:
1. **Enterprise Lead**
   - Java, Spring Boot, EJB, Struts, Oracle 12c
   - Color: Lighter violet (#A78BFA)
   
2. **AI Innovator**
   - Python, LLM Orchestration, Vector Databases, NLP
   - Color: Primary violet (#8B5CF6)

**Animation**:
- Pillars slide in from left and right simultaneously
- Skills list items fade in with stagger
- Hover: subtle lift effect (translateY(-4px))

## Data Models

### Content Data Structure

All static content will be stored in `lib/constants.ts` for easy maintenance and updates.

```typescript
// lib/constants.ts

export const heroContent = {
  headline: "Senior Technical Lead | FinTech Architect | AI Engineer",
  subHeadline: "Building national-scale financial infrastructure and intelligent RAG systems. From 1.5M+ record migrations to AI-driven data insights.",
};

export const chatConfig = {
  placeholderText: "Ask me about Prayag's experience with CSD Ghana or his work with RAG",
  sampleQuestions: [
    "Tell me about the CSD Ghana project",
    "What is VectorLoom?",
    "What's your experience with Spring Boot?",
    "How do you use RAG in your projects?",
  ],
};

export const technologyCategories: TechnologyCategory[] = [
  {
    title: "Backend & Architecture",
    icon: "server",
    technologies: [
      { name: "Java", proficiency: "expert" },
      { name: "Spring Boot", proficiency: "expert" },
      { name: "EJB", proficiency: "expert" },
      { name: "Struts", proficiency: "advanced" },
      { name: "Hibernate", proficiency: "expert" },
      { name: "Microservices", proficiency: "advanced" },
      { name: "Python", proficiency: "advanced" },
      { name: "FastAPI", proficiency: "advanced" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    technologies: [
      { name: "AWS EC2", proficiency: "advanced" },
      { name: "AWS SQS", proficiency: "advanced" },
      { name: "Kubernetes", proficiency: "advanced" },
      { name: "Docker", proficiency: "expert" },
      { name: "CI/CD", proficiency: "advanced" },
    ],
  },
  {
    title: "AI & Data Science",
    icon: "brain",
    technologies: [
      { name: "RAG", proficiency: "expert" },
      { name: "Weaviate", proficiency: "expert" },
      { name: "Vector Databases", proficiency: "expert" },
      { name: "NLP", proficiency: "advanced" },
      { name: "LangChain", proficiency: "expert" },
      { name: "Groq", proficiency: "advanced" },
      { name: "Ollama", proficiency: "advanced" },
    ],
  },
  {
    title: "Frontend & Mobile",
    icon: "mobile",
    technologies: [
      { name: "Next.js", proficiency: "expert" },
      { name: "React", proficiency: "expert" },
      { name: "TailwindCSS", proficiency: "expert" },
      { name: "Flutter", proficiency: "advanced" },
      { name: "Android", proficiency: "advanced" },
      { name: "JavaScript", proficiency: "expert" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    technologies: [
      { name: "Oracle 12c", proficiency: "expert" },
      { name: "MySQL", proficiency: "expert" },
      { name: "MS SQL Server", proficiency: "advanced" },
      { name: "PL/SQL", proficiency: "expert" },
    ],
  },
];

export const vectorLoomProject = {
  title: "VectorLoom",
  tagline: "Powerful RAG Application",
  description: "A full-stack Retrieval-Augmented Generation application for end-to-end data interaction and insight extraction. Built with FastAPI, Weaviate, and Next.js.",
  features: [
    {
      title: "3D Vector Visualization",
      description: "Interactive visualization of vector embeddings in 3D space",
      icon: "cube",
    },
    {
      title: "Hybrid Search",
      description: "Combines semantic and keyword search for optimal retrieval",
      icon: "search",
    },
    {
      title: "Multi-modal Ingestion",
      description: "Support for PDF, DOCX, CSV, GitHub repos, and web scraping",
      icon: "upload",
    },
    {
      title: "Multiple LLM Providers",
      description: "Ollama, Groq, OpenAI, Anthropic, and more",
      icon: "brain",
    },
  ],
  techStack: [
    { name: "Weaviate", icon: "weaviate-icon", color: "#00C853" },
    { name: "FastAPI", icon: "fastapi-icon", color: "#009688" },
    { name: "Next.js", icon: "nextjs-icon", color: "#000000" },
    { name: "LangChain", icon: "langchain-icon", color: "#1C3C3C" },
  ],
  githubUrl: "https://github.com/prayagdave25/vectorloom",
  demoUrl: null,
};

export const skillsPillars: SkillPillar[] = [
  {
    title: "Enterprise Lead",
    subtitle: "10 years building national-scale financial systems",
    icon: "building",
    skills: [
      "Java & Spring Boot",
      "EJB & Struts",
      "Oracle 12c",
      "Microservices Architecture",
      "High-Availability Systems",
    ],
    color: "#A78BFA",
  },
  {
    title: "AI Innovator",
    subtitle: "Building intelligent RAG systems",
    icon: "sparkles",
    skills: [
      "Python & FastAPI",
      "LLM Orchestration",
      "Vector Databases",
      "NLP & RAG",
      "LangChain & Weaviate",
    ],
    color: "#8B5CF6",
  },
];
```

### Animation Variants

Reusable Framer Motion animation variants stored in `lib/animations.ts`:

```typescript
// lib/animations.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
};

export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

For this portfolio website, correctness properties focus on ensuring consistent behavior across components, proper implementation of animations and styling, responsive design, accessibility, and SEO optimization.

### Property 1: Animation Implementation Consistency

*For any* component that requires animation (HeroSection, ChatInterface, TechnologyGrid, VectorLoomShowcase, SkillsPillars), the component should use Framer Motion's motion components with appropriate animation variants (fadeInUp, scaleIn, staggerContainer, etc.) and all animations should use GPU-accelerated properties (transform, opacity) only.

**Validates: Requirements 1.3, 2.6, 3.6, 4.7, 5.5, 8.4**

### Property 2: Design System Color Consistency

*For any* component in the portfolio, the component should use colors from the defined design system palette (background.primary: #0A192F, background.secondary: #1E293B, accent.primary: #8B5CF6, text.primary: #F1F5F9) and all text-background color combinations should meet WCAG AA contrast ratio requirements (minimum 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 1.4, 6.1, 6.2, 6.3, 6.4**

### Property 3: Responsive Layout Behavior

*For any* component in the portfolio, when rendered at different viewport widths (mobile < 640px, tablet 640-1024px, desktop > 1024px), the component should apply appropriate Tailwind responsive classes and maintain usability with proper layout adjustments, and all interactive elements on mobile should have minimum touch target size of 44x44px.

**Validates: Requirements 1.5, 2.7, 3.8, 4.8, 7.1, 7.2, 7.3, 7.5**

### Property 4: Backend Integration Interface

*For any* interactive component that will connect to a backend (ChatInterface), the component should accept an async callback prop (onSendMessage) that takes a string parameter and returns a Promise<Message>, allowing for future API integration without component refactoring.

**Validates: Requirements 2.4**

### Property 5: Visual Indicator Presence

*For any* component that displays technology information (TechnologyGrid, VectorLoomShowcase, SkillsPillars), each technology or skill item should be rendered with an associated icon or visual element alongside the text label.

**Validates: Requirements 3.7, 5.4**

### Property 6: Visual Hierarchy and Separation

*For any* section component that displays multiple categories or pillars (SkillsPillars), the categories should be visually distinct through the use of different background colors, borders, or spacing, ensuring clear visual hierarchy.

**Validates: Requirements 5.3**

### Property 7: Interactive Element Feedback

*For any* interactive element (buttons, links, cards), when hovered or focused, the element should provide visual feedback through CSS transitions (color, transform, or opacity changes) with smooth transition timing.

**Validates: Requirements 6.5**

### Property 8: Image Optimization

*For any* image displayed in the portfolio, the image should be rendered using Next.js Image component with appropriate width, height, and alt attributes, enabling automatic optimization and lazy loading.

**Validates: Requirements 8.3**

### Property 9: Semantic HTML Structure

*For any* page or section in the portfolio, the HTML structure should use semantic elements (header, main, section, article, nav) and maintain proper heading hierarchy (h1 → h2 → h3) without skipping levels.

**Validates: Requirements 9.5**

### Property 10: Keyboard Navigation Support

*For any* interactive element in the portfolio, the element should be keyboard accessible (focusable via Tab key) and display a visible focus indicator that meets WCAG visibility requirements.

**Validates: Requirements 10.2**

### Property 11: Screen Reader Compatibility

*For any* component with interactive or informational elements, the component should include appropriate ARIA labels, roles, and descriptions where semantic HTML alone is insufficient, ensuring screen reader users can understand the content and functionality.

**Validates: Requirements 10.3**

### Property 12: Reduced Motion Respect

*For any* animated component, when the user's system has prefers-reduced-motion enabled, the component should either disable animations entirely or reduce them to simple fade transitions without movement.

**Validates: Requirements 10.4**

## Error Handling

### Component Error Boundaries

Each major section component (HeroSection, ChatInterface, TechnologyGrid, VectorLoomShowcase, SkillsPillars) should be wrapped in React Error Boundaries to prevent a single component failure from crashing the entire page.

**Error Boundary Implementation**:
```typescript
// components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center text-text-secondary">
          <p>Something went wrong loading this section.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Chat Interface Error Handling

The ChatInterface component should handle various error scenarios:

1. **API Connection Errors**: Display user-friendly message when backend is unavailable
2. **Timeout Errors**: Show timeout message if response takes too long (> 30 seconds)
3. **Invalid Response Format**: Handle malformed API responses gracefully
4. **Network Errors**: Detect offline status and inform user

**Error States**:
```typescript
interface ChatError {
  type: 'connection' | 'timeout' | 'invalid_response' | 'network';
  message: string;
  retryable: boolean;
}
```

### Image Loading Failures

Next.js Image components should include fallback handling:

```typescript
<Image
  src={iconPath}
  alt={techName}
  width={48}
  height={48}
  onError={(e) => {
    // Fallback to placeholder or text-only display
    e.currentTarget.style.display = 'none';
  }}
/>
```

### Animation Performance Degradation

If animations cause performance issues (detected via frame rate monitoring), the system should automatically reduce animation complexity:

```typescript
// Detect low frame rate and disable complex animations
const useReducedAnimations = () => {
  const [shouldReduce, setShouldReduce] = useState(false);
  
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldReduce(prefersReduced);
  }, []);
  
  return shouldReduce;
};
```

## Testing Strategy

The portfolio website will employ a dual testing approach combining unit tests for specific examples and edge cases with property-based tests for universal behaviors.

### Testing Framework Setup

**Unit Testing**: Jest + React Testing Library
- Test specific component renders
- Test user interactions
- Test edge cases and error conditions

**Property-Based Testing**: fast-check (JavaScript property testing library)
- Test universal properties across many inputs
- Generate random test data for comprehensive coverage
- Minimum 100 iterations per property test

**Accessibility Testing**: jest-axe
- Automated accessibility checks
- WCAG compliance verification

**Visual Regression Testing**: Playwright
- Screenshot comparison for visual consistency
- Cross-browser testing

### Unit Test Examples

**Example 1: Hero Section Content**
```typescript
// components/__tests__/HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

describe('HeroSection', () => {
  it('displays the correct headline', () => {
    render(
      <HeroSection
        headline="Senior Technical Lead | FinTech Architect | AI Engineer"
        subHeadline="Building national-scale financial infrastructure..."
      />
    );
    
    expect(screen.getByText(/Senior Technical Lead/i)).toBeInTheDocument();
  });
  
  it('displays the correct sub-headline', () => {
    render(
      <HeroSection
        headline="Senior Technical Lead | FinTech Architect | AI Engineer"
        subHeadline="Building national-scale financial infrastructure and intelligent RAG systems"
      />
    );
    
    expect(screen.getByText(/Building national-scale/i)).toBeInTheDocument();
  });
});
```

**Example 2: Chat Interface Placeholder**
```typescript
// components/__tests__/ChatInterface.test.tsx
import { render, screen } from '@testing-library/react';
import { ChatInterface } from '../ChatInterface';

describe('ChatInterface', () => {
  it('displays the correct placeholder text', () => {
    render(
      <ChatInterface
        placeholderText="Ask me about Prayag's experience with CSD Ghana or his work with RAG"
      />
    );
    
    expect(screen.getByPlaceholderText(/Ask me about Prayag's experience/i)).toBeInTheDocument();
  });
  
  it('renders message input and conversation area', () => {
    render(<ChatInterface placeholderText="Ask a question" />);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
});
```

**Example 3: Technology Categories**
```typescript
// components/__tests__/TechnologyGrid.test.tsx
import { render, screen } from '@testing-library/react';
import { TechnologyGrid } from '../TechnologyGrid';
import { technologyCategories } from '@/lib/constants';

describe('TechnologyGrid', () => {
  it('displays Backend & Architecture category with all technologies', () => {
    render(<TechnologyGrid categories={technologyCategories} />);
    
    expect(screen.getByText('Backend & Architecture')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('Spring Boot')).toBeInTheDocument();
    expect(screen.getByText('EJB')).toBeInTheDocument();
  });
  
  it('displays all five technology categories', () => {
    render(<TechnologyGrid categories={technologyCategories} />);
    
    expect(screen.getByText('Backend & Architecture')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    expect(screen.getByText('AI & Data Science')).toBeInTheDocument();
    expect(screen.getByText('Frontend & Mobile')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
  });
});
```

**Example 4: SEO Meta Tags**
```typescript
// app/__tests__/metadata.test.tsx
import { render } from '@testing-library/react';
import { metadata } from '../layout';

describe('SEO Metadata', () => {
  it('includes correct page title', () => {
    expect(metadata.title).toBe('Prayag Vikram Dave | Senior Technical Lead | FinTech Architect | AI Engineer');
  });
  
  it('includes meta description', () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description).toContain('FinTech');
  });
  
  it('includes Open Graph tags', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph.title).toBeDefined();
    expect(metadata.openGraph.description).toBeDefined();
  });
});
```

**Example 5: Lighthouse Performance**
```typescript
// e2e/__tests__/performance.test.ts
import { test, expect } from '@playwright/test';

test('achieves Lighthouse performance score of 90+', async ({ page }) => {
  await page.goto('/');
  
  const lighthouse = await page.lighthouse();
  const performanceScore = lighthouse.performance * 100;
  
  expect(performanceScore).toBeGreaterThanOrEqual(90);
});
```

**Example 6: Accessibility Compliance**
```typescript
// components/__tests__/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HeroSection } from '../HeroSection';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('HeroSection has no accessibility violations', async () => {
    const { container } = render(
      <HeroSection
        headline="Senior Technical Lead"
        subHeadline="Building systems"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Property-Based Tests

**Property Test 1: Animation Implementation Consistency**
```typescript
// components/__tests__/animations.property.test.tsx
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { HeroSection } from '../HeroSection';
import { ChatInterface } from '../ChatInterface';
import { TechnologyGrid } from '../TechnologyGrid';

/**
 * Feature: prayag-portfolio, Property 1: Animation Implementation Consistency
 * For any component that requires animation, the component should use Framer Motion
 * with GPU-accelerated properties only.
 */
describe('Property: Animation Implementation', () => {
  it('all animated components use Framer Motion motion components', () => {
    fc.assert(
      fc.property(
        fc.record({
          headline: fc.string(),
          subHeadline: fc.string(),
        }),
        (props) => {
          const { container } = render(
            <HeroSection headline={props.headline} subHeadline={props.subHeadline} />
          );
          
          // Check that motion components are used (they have data-framer-motion attribute)
          const motionElements = container.querySelectorAll('[data-framer-motion]');
          expect(motionElements.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Test 2: Design System Color Consistency**
```typescript
// components/__tests__/colors.property.test.tsx
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { TechnologyGrid } from '../TechnologyGrid';

/**
 * Feature: prayag-portfolio, Property 2: Design System Color Consistency
 * For any component, colors should come from the design system palette and meet
 * WCAG AA contrast requirements.
 */
describe('Property: Color Consistency', () => {
  it('all components use design system colors', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          title: fc.string(),
          technologies: fc.array(fc.record({ name: fc.string() })),
        })),
        (categories) => {
          const { container } = render(<TechnologyGrid categories={categories} />);
          
          // Check that background colors match design system
          const elements = container.querySelectorAll('[class*="bg-"]');
          elements.forEach((el) => {
            const classes = el.className;
            // Verify only design system color classes are used
            const hasValidBg = 
              classes.includes('bg-background-primary') ||
              classes.includes('bg-background-secondary') ||
              classes.includes('bg-accent-primary');
            
            if (classes.includes('bg-')) {
              expect(hasValidBg).toBe(true);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Test 3: Responsive Layout Behavior**
```typescript
// components/__tests__/responsive.property.test.tsx
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { TechnologyGrid } from '../TechnologyGrid';

/**
 * Feature: prayag-portfolio, Property 3: Responsive Layout Behavior
 * For any component, responsive classes should be applied at appropriate breakpoints
 * and touch targets should be minimum 44x44px on mobile.
 */
describe('Property: Responsive Behavior', () => {
  it('interactive elements have minimum touch target size', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          title: fc.string(),
          technologies: fc.array(fc.record({ name: fc.string() })),
        })),
        (categories) => {
          // Set mobile viewport
          global.innerWidth = 375;
          global.innerHeight = 667;
          
          const { container } = render(<TechnologyGrid categories={categories} />);
          
          // Check all interactive elements
          const interactiveElements = container.querySelectorAll('button, a, [role="button"]');
          interactiveElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            expect(rect.width).toBeGreaterThanOrEqual(44);
            expect(rect.height).toBeGreaterThanOrEqual(44);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Test 4: Backend Integration Interface**
```typescript
// components/__tests__/chat-interface.property.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import fc from 'fast-check';
import { ChatInterface } from '../ChatInterface';

/**
 * Feature: prayag-portfolio, Property 4: Backend Integration Interface
 * For any interactive component, it should accept async callback props that return Promises.
 */
describe('Property: Backend Integration', () => {
  it('ChatInterface accepts and calls async onSendMessage callback', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.string(),
        async (messageContent) => {
          const mockSendMessage = jest.fn().mockResolvedValue({
            id: '123',
            role: 'assistant',
            content: 'Response',
            timestamp: new Date(),
          });
          
          const { getByRole } = render(
            <ChatInterface
              placeholderText="Ask a question"
              onSendMessage={mockSendMessage}
            />
          );
          
          const input = getByRole('textbox');
          const sendButton = getByRole('button', { name: /send/i });
          
          fireEvent.change(input, { target: { value: messageContent } });
          fireEvent.click(sendButton);
          
          await waitFor(() => {
            expect(mockSendMessage).toHaveBeenCalledWith(messageContent);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Test 5: Visual Indicator Presence**
```typescript
// components/__tests__/icons.property.test.tsx
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { TechnologyGrid } from '../TechnologyGrid';

/**
 * Feature: prayag-portfolio, Property 5: Visual Indicator Presence
 * For any technology item, an icon should be rendered alongside the text.
 */
describe('Property: Visual Indicators', () => {
  it('all technology items have associated icons', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          title: fc.string(),
          icon: fc.string(),
          technologies: fc.array(fc.record({
            name: fc.string(),
            icon: fc.string(),
          })),
        })),
        (categories) => {
          const { container } = render(<TechnologyGrid categories={categories} />);
          
          // For each technology, check that an icon element exists
          categories.forEach((category) => {
            category.technologies.forEach((tech) => {
              const techElement = container.querySelector(`[data-tech="${tech.name}"]`);
              if (techElement) {
                const iconElement = techElement.querySelector('svg, img, [data-icon]');
                expect(iconElement).toBeTruthy();
              }
            });
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Test 6: Keyboard Navigation Support**
```typescript
// components/__tests__/keyboard.property.test.tsx
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { ChatInterface } from '../ChatInterface';

/**
 * Feature: prayag-portfolio, Property 10: Keyboard Navigation Support
 * For any interactive element, it should be keyboard accessible with visible focus.
 */
describe('Property: Keyboard Navigation', () => {
  it('all interactive elements are keyboard accessible', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (placeholderText) => {
          const { container } = render(
            <ChatInterface placeholderText={placeholderText} />
          );
          
          const interactiveElements = container.querySelectorAll('button, a, input, [role="button"]');
          interactiveElements.forEach((el) => {
            // Check that element is focusable (has tabIndex >= 0 or is naturally focusable)
            const tabIndex = el.getAttribute('tabindex');
            const isFocusable = tabIndex === null || parseInt(tabIndex) >= 0;
            expect(isFocusable).toBe(true);
            
            // Check that focus styles are defined
            const styles = window.getComputedStyle(el, ':focus');
            const hasFocusStyle = 
              styles.outline !== 'none' ||
              styles.boxShadow !== 'none' ||
              el.className.includes('focus:');
            expect(hasFocusStyle).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Test 7: Reduced Motion Respect**
```typescript
// components/__tests__/reduced-motion.property.test.tsx
import { render } from '@testing-library/react';
import fc from 'fast-check';
import { HeroSection } from '../HeroSection';

/**
 * Feature: prayag-portfolio, Property 12: Reduced Motion Respect
 * For any animated component, animations should be disabled when prefers-reduced-motion is enabled.
 */
describe('Property: Reduced Motion', () => {
  it('respects prefers-reduced-motion setting', () => {
    fc.assert(
      fc.property(
        fc.record({
          headline: fc.string(),
          subHeadline: fc.string(),
        }),
        (props) => {
          // Mock prefers-reduced-motion
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
              matches: query === '(prefers-reduced-motion: reduce)',
              media: query,
              onchange: null,
              addListener: jest.fn(),
              removeListener: jest.fn(),
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            })),
          });
          
          const { container } = render(
            <HeroSection headline={props.headline} subHeadline={props.subHeadline} />
          );
          
          // Check that motion components have reduced animation
          const motionElements = container.querySelectorAll('[data-framer-motion]');
          motionElements.forEach((el) => {
            // Verify that animation duration is 0 or very short when reduced motion is preferred
            const styles = window.getComputedStyle(el);
            const duration = parseFloat(styles.transitionDuration || '0');
            expect(duration).toBeLessThanOrEqual(0.1); // Max 100ms for reduced motion
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Test Configuration

**Jest Configuration** (`jest.config.js`):
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

**Test Execution**:
- Unit tests: `npm test`
- Property tests: `npm test -- --testPathPattern=property`
- Coverage: `npm test -- --coverage`
- Watch mode: `npm test -- --watch`

### Testing Balance

The testing strategy balances unit tests and property tests:

**Unit Tests Focus**:
- Specific content rendering (headlines, technology lists, project details)
- User interactions (clicking, typing, form submission)
- Edge cases (empty states, error conditions)
- Integration points (component composition)

**Property Tests Focus**:
- Universal behaviors (all components use design system colors)
- Responsive behavior across viewport sizes
- Accessibility compliance across all components
- Animation consistency
- Interface contracts (async callbacks, prop types)

This dual approach ensures both concrete examples work correctly and universal properties hold across all inputs, providing comprehensive coverage without excessive test duplication.
