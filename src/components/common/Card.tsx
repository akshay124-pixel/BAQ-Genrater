import React from 'react';
import clsx from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  noPadding?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className,
  noPadding = false,
  hover = false,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-md border border-gray-100',
        hover && 'card-hover',
        'animate-fade-in',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="w-1 h-6 bg-primary-600 rounded-full mr-3"></span>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 ml-4">{subtitle}</p>
          )}
        </div>
      )}
      <div className={clsx(!noPadding && 'p-6')}>{children}</div>
    </div>
  );
};
