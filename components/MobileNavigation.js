import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MobileNavigation({ isOpen, onClose }) {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState({});
  const navRef = useRef(null);

  // Static navigation data for mobile
  const navItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Products',
      children: [
        { label: 'Product Platform', href: '/products/platform' },
        { label: 'Analytics Suite', href: '/products/analytics' },
        { label: 'Integration Tools', href: '/products/integration' },
        { label: 'Mobile Solutions', href: '/products/mobile' }
      ]
    },
    {
      label: 'Solutions',
      children: [
        { 
          label: 'By Industry',
          children: [
            { label: 'Healthcare', href: '/solutions/healthcare' },
            { label: 'Finance', href: '/solutions/finance' },
            { label: 'Education', href: '/solutions/education' },
            { label: 'Retail', href: '/solutions/retail' },
            { label: 'Manufacturing', href: '/solutions/manufacturing' }
          ]
        },
        { 
          label: 'By Team Size',
          children: [
            { label: 'Startups', href: '/solutions/startups' },
            { label: 'SMB', href: '/solutions/smb' },
            { label: 'Enterprise', href: '/solutions/enterprise' },
            { label: 'Government', href: '/solutions/government' }
          ]
        }
      ]
    },
    {
      label: 'Resources',
      children: [
        { label: 'Documentation', href: '/resources/documentation' },
        { label: 'API Reference', href: '/resources/api' },
        { label: 'Blog', href: '/resources/blog' },
        { 
          label: 'Tutorials', 
          children: [
            { label: 'Beginner Guides', href: '/resources/tutorials/beginner' },
            { label: 'Advanced Topics', href: '/resources/tutorials/advanced' },
            { label: 'Video Tutorials', href: '/resources/tutorials/video' },
            { label: 'Code Samples', href: '/resources/tutorials/code-samples' }
          ]
        },
        { label: 'Webinars', href: '/resources/webinars' }
      ]
    },
    {
      label: 'Contact',
      href: '/contact',
    },
    // Additional mobile-only items
    {
      label: 'Help & FAQ',
      href: '/help',
    },
    {
      label: 'Privacy',
      href: '/privacy',
    },
    {
      label: 'Terms of Service',
      href: '/terms',
    },
  ];

  // Handle click outside to close the menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Disable scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle expanding/collapsing nested menus
  const toggleExpand = (itemLabel) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemLabel]: !prev[itemLabel]
    }));
  };

  // Render nested menu items recursively
  const renderItems = (items, level = 0) => {
    return items.map(item => (
      <li key={item.label} className="border-b border-gray-100">
        {item.href ? (
          <Link 
            href={item.href}
            className={`block py-3 px-4 ${level > 0 ? 'pl-' + (4 + level * 4) : ''} ${
              router.pathname === item.href ? 'text-blue-500 font-medium' : 'text-gray-700 hover:text-blue-500'
            }`}
            onClick={() => {
              if (router.pathname !== item.href) {
                router.push(item.href);
              }
              onClose();
            }}
          >
            {item.label}
          </Link>
        ) : (
          <div className="flex justify-between items-center">
            <button 
              onClick={() => toggleExpand(item.label)}
              className={`flex-1 text-left py-3 px-4 ${level > 0 ? 'pl-' + (4 + level * 4) : ''} text-gray-700`}
            >
              {item.label}
            </button>
            <button 
              onClick={() => toggleExpand(item.label)}
              className="py-3 px-4 text-gray-500"
              aria-label={expandedItems[item.label] ? "Collapse" : "Expand"}
            >
              {expandedItems[item.label] ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        )}
        
        {item.children && expandedItems[item.label] && (
          <ul className="bg-gray-50 animate-fadeIn">
            {renderItems(item.children, level + 1)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Slide-in menu */}
      <div 
        ref={navRef}
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu items */}
        <ul className="py-2 pb-20">
          {renderItems(navItems)}
        </ul>
      </div>
    </>
  );
}