import React from 'react';
import { Button } from '../common/Button';

export interface NavbarProps {
  onReset: () => void;
  draftSaved?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReset,
  draftSaved = false,
}) => {
  return (
    <nav className="bg-gradient-to-r from-primary-700 to-primary-900 border-b border-primary-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 bg-white rounded-lg p-2 shadow-md">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                BOQ Generator
              </h1>
              <p className="text-xs text-primary-200">Professional Quotation Management</p>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center space-x-4">
            {draftSaved && (
              <span className="text-sm text-primary-100 flex items-center bg-primary-800/50 px-3 py-1.5 rounded-lg animate-fade-in">
                <svg
                  className="w-4 h-4 mr-2 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Draft saved
              </span>
            )}
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={onReset}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
