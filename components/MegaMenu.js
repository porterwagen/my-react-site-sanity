import React from 'react';
import Link from 'next/link';

export default function MegaMenu({ isOpen, content }) {
  if (!isOpen) return null;

  return (
    <div className="w-full bg-white shadow-lg rounded-b-lg animate-fadeIn z-30 mega-menu-container">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Map through columns from content prop */}
          {content.columns.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg border-b border-gray-200 pb-2">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className={`text-gray-600 hover:text-blue-600 transition-colors ${link.icon ? 'flex items-center' : ''}`}
                    >
                      {link.icon && (
                        <span className="mr-2">
                          <img src={link.icon} alt="" className="w-5 h-5" />
                        </span>
                      )}
                      <span>{link.label}</span>
                    </Link>
                    {link.description && (
                      <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                    )}
                  </li>
                ))}
              </ul>
              {column.cta && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    href={column.cta.href}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    {column.cta.label}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Featured section */}
        {content.featured && (
          <div className="col-span-1 lg:col-span-4 mt-6 bg-blue-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3">
                <h3 className="font-bold text-xl text-blue-800">{content.featured.title}</h3>
                <p className="text-blue-700 my-2">{content.featured.description}</p>
                <Link 
                  href={content.featured.cta.href}
                  className="inline-block mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {content.featured.cta.label}
                </Link>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0">
                <img src={content.featured.image} alt="" className="mx-auto h-32 object-contain" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}