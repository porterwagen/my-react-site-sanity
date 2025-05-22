import React from 'react';
import Breadcrumbs from './Breadcrumbs';

/**
 * Flexible page header component with optional breadcrumbs and container styling
 * 
 * @param {string} title - The page title heading
 * @param {boolean} showBreadcrumbs - Whether to show breadcrumbs (default: true)
 * @param {string} customPath - Optional custom path for breadcrumbs
 * @param {React.ReactNode} children - Optional additional content below the title
 * 
 * Note: This component includes container mx-auto px-4 py-8 classes by default
 */
export default function PageHeader({ 
  title, 
  showBreadcrumbs = true, 
  customPath,
  children
}) {
return (
    <header className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 shadow-sm mb-8">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Breadcrumbs above title */}
            {showBreadcrumbs && (
                <div className="mb-3">
                    <Breadcrumbs customPath={customPath} />
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-700 leading-tight">
                    {title}
                </h1>

                {/* Optional additional content */}
                {children && (
                    <div className="text-gray-600">
                        {children}
                    </div>
                )}
            </div>
        </div>
    </header>
);
}
