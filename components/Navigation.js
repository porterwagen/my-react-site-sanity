import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MobileNavigation from './MobileNavigation';
import MegaMenu from './MegaMenu';

export default function Navigation() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const navRef = useRef(null);
  
  // Sample dropdown items
  const dropdownItems = {
    resources: [
      { label: "Documentation", href: "/resources/documentation" },
      { label: "API Reference", href: "/resources/api" },
      { label: "Blog", href: "/resources/blog" },
      { label: "Tutorials", href: "/resources/tutorials" }
    ],
  };
  
  // Static mega menu content 
  const megaMenuContent = {
    columns: [
      {
        title: "Getting Started",
        links: [
          { 
            label: "Quick Start", 
            href: "/getting-started/quick-start",
            icon: "/file.svg"
          },
          { 
            label: "Installation", 
            href: "/getting-started/installation",
            icon: "/window.svg" 
          },
          { 
            label: "Basic Concepts", 
            href: "/getting-started/concepts",
            icon: "/globe.svg",
            description: "Learn the fundamental concepts" 
          }
        ]
      },
      {
        title: "Features",
        links: [
          { label: "Components", href: "/features/components" },
          { label: "Routing", href: "/features/routing" },
          { label: "State Management", href: "/features/state" }
        ],
        cta: {
          label: "Explore All Features",
          href: "/features"
        }
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Tutorials", href: "/tutorials" },
          { label: "Examples", href: "/examples" }
        ]
      },
      {
        title: "Support",
        links: [
          { label: "FAQ", href: "/support/faq" },
          { label: "Community", href: "/support/community" },
          { label: "Contact Us", href: "/contact" }
        ]
      }
    ],
    featured: {
      title: "New Tutorial Series",
      description: "Learn how to build amazing websites with our step-by-step guides",
      image: "/images/project1.jpg",
      cta: {
        label: "Get Started",
        href: "/tutorials/series"
      }
    }
  };
  
  // Define all navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { 
      label: "Resources", 
      hasDropdown: true,
      dropdownKey: "resources"
    },
    { 
      label: "Mega", 
      hasMegaMenu: true,
      dropdownKey: "mega"
    },
    { label: "Contact", href: "/contact" }
  ];
  
  // Check if we're on mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      // Only close if clicking outside both the trigger element and the mega menu
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        const megaMenuElement = document.querySelector('.mega-menu-container');
        const clickedInMegaMenu = megaMenuElement && megaMenuElement.contains(event.target);
        const clickedInTrigger = dropdownRefs.current[activeDropdown].contains(event.target);
        
        if (!clickedInTrigger && !clickedInMegaMenu) {
          setActiveDropdown(null);
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);
  
  // Handle dropdown toggle
  const toggleDropdown = (key) => {
    setActiveDropdown(prevActive => prevActive === key ? null : key);
  };
  
  // Setup ref for a dropdown
  const setDropdownRef = (key, el) => {
    if (el) {
      dropdownRefs.current[key] = el;
    }
  };

  return (
    <nav className="relative" ref={navRef}>
      <div className="flex justify-between items-center py-4">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          My Site
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <li 
              key={item.label} 
              className="relative"
              ref={el => (item.hasDropdown || item.hasMegaMenu) ? setDropdownRef(item.dropdownKey, el) : null}
            >
              {item.href ? (
                <Link 
                  href={item.href} 
                  className={`py-2 ${router.pathname === item.href ? 'text-blue-500 font-medium' : 'text-gray-700 hover:text-blue-500'}`}
                >
                  {item.label}
                </Link>
              ) : (
                <button 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 py-2"
                  onClick={() => toggleDropdown(item.dropdownKey)}
                  aria-expanded={activeDropdown === item.dropdownKey}
                >
                  <span>{item.label}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${activeDropdown === item.dropdownKey ? 'transform rotate-180' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              
              {/* Regular dropdown */}
              {item.hasDropdown && activeDropdown === item.dropdownKey && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg animate-fadeIn z-30 w-56 mt-1">
                  <ul className="py-2">
                    {dropdownItems[item.dropdownKey]?.map((dropItem, index) => (
                      <li key={index}>
                        <Link 
                          href={dropItem.href} 
                          className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {dropItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mega Menu - moved outside the li element to be full width */}
      {activeDropdown === 'mega' && (
        <div className="absolute left-0 w-full z-30 top-full">
          <MegaMenu isOpen={true} content={megaMenuContent} />
        </div>
      )}
      
      {/* Mobile Navigation Slide-in Menu */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}