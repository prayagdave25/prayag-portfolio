import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  interactive = false,
  onClick 
}) => {
  const interactiveProps = interactive ? {
    role: 'button',
    tabIndex: 0,
    onClick,
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && onClick) {
        e.preventDefault();
        onClick();
      }
    },
  } : {};

  return (
    <div
      className={`
        bg-[#1E293B] 
        border border-[#334155] 
        rounded-lg 
        p-6 
        transition-all 
        duration-300 
        hover:border-[#8B5CF6] 
        hover:shadow-lg 
        hover:shadow-[#8B5CF6]/20
        ${interactive ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#0A192F]' : ''}
        ${className}
      `}
      {...interactiveProps}
    >
      {children}
    </div>
  );
};
