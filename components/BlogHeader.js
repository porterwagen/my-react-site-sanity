import Link from 'next/link';
import React from 'react';
import Breadcrumbs from './Breadcrumbs';

/**
 * Specialized header component for blog posts
 * 
 * @param {string} title - The blog post title
 * @param {string} date - Publication date
 * @param {string} author - Optional author name
 * @param {string} readTime - Optional read time in minutes
 * @param {string} customPath - Optional custom path for breadcrumbs
 * @param {string} className - Additional classes to apply
 * @param {React.ReactNode} children - Optional additional content
 */
export default function BlogHeader({ 
  title, 
  date,
  author,
  readTime,
  customPath,
  className = "",
  children
}) {
  return (
    <div className={`blog-header container mx-auto px-4 py-8 ${className}`}>
      {/* Breadcrumbs with blog path */}
      <Breadcrumbs customPath={customPath} />
      
      {/* Back to blog link 
      <div className="mb-4">
        <Link 
          href="/blog" 
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>
      </div>
      */}
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

      {/* Meta information */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
        {author && (
          <span className="mr-4 mb-2">
            <span className="font-medium">By:</span> {author}
          </span>
        )}
        
        {date && (
          <span className="flex items-center mr-4 mb-2">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {date}
          </span>
        )}
        
        {readTime && (
          <span className="flex items-center mb-2">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {readTime} min read
          </span>
        )}
      </div>
      
      {/* Additional content (if any) */}
      {children}
    </div>
  );
}
