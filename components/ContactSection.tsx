'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced, hoverLift, hoverLiftReduced } from '@/lib/animations';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

interface ContactLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

const contactLinks: ContactLink[] = [
  {
    icon: <FaGithub className="w-6 h-6" />,
    label: 'GitHub',
    href: 'https://github.com/prayagdave25',
    color: '#333',
  },
  {
    icon: <FaLinkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prayag-dave-2504/',
    color: '#0A66C2',
  },
  {
    icon: <FaEnvelope className="w-6 h-6" />,
    label: 'Email',
    href: 'mailto:prayag.dave@example.com',
    color: '#EA4335',
  },
  {
    icon: <FaTwitter className="w-6 h-6" />,
    label: 'Twitter',
    href: 'https://twitter.com/prayagdave',
    color: '#1DA1F2',
  },
];

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const fadeVariant = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const liftVariant = prefersReducedMotion ? hoverLiftReduced : hoverLift;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        variants={fadeVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Let&apos;s Connect
        </h2>
        <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
          Interested in collaborating on AI projects or discussing enterprise architecture? 
          Reach out through any of these channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {contactLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            {...liftVariant}
            className="bg-background-secondary border border-border rounded-lg p-6 hover:border-accent-primary transition-colors group"
          >
            <div 
              className="mb-3 flex justify-center transition-transform group-hover:scale-110"
              style={{ color: link.color }}
            >
              {link.icon}
            </div>
            <p className="text-text-primary font-semibold">
              {link.label}
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
