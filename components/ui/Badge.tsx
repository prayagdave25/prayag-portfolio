import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  icon, 
  className = '',
  interactive = false,
  onClick 
}) => {
  const Component = interactive ? 'button' : 'span';
  
  return (
    <Component
      onClick={onClick}
      className={`
        inline-flex 
        items-center 
        gap-2 
        px-3 
        py-1.5 
        text-sm 
        font-medium 
        text-[#F1F5F9] 
        bg-[#8B5CF6]/10 
        border 
        border-[#8B5CF6]/30 
        rounded-full 
        transition-all 
        duration-200 
        hover:bg-[#8B5CF6]/20 
        hover:border-[#8B5CF6]/50
        ${interactive ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 focus:ring-offset-[#0A192F]' : ''}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </Component>
  );
};
