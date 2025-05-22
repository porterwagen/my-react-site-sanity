import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import Head from 'next/head';

const Breadcrumbs = ({ customPath }) => {
  const router = useRouter();
  
  // Use the custom path if provided, otherwise use the router path
  const path = customPath || router.asPath;
  
  // Create breadcrumb items by splitting the path
  const generateBreadcrumbs = () => {
    // Remove query parameters
    const cleanPath = path.split('?')[0].split('#')[0];
    
    // Split the path into segments
    const segments = cleanPath.split('/').filter((segment) => segment !== '');
    
    // Generate the breadcrumb items
    const breadcrumbs = [
      { name: 'Home', path: '/' }
    ];
    
    // Add each segment to the breadcrumbs array
    let constructedPath = '';
    segments.forEach((segment, index) => {
      constructedPath += `/${segment}`;
      
      // For dynamic routes like [slug], replace with actual value
      let name = segment;
      if (name.includes('[') && name.includes(']')) {
        // This is a placeholder for dynamic routes
        name = router.query[name.replace(/[\[\]]/g, '')];
      } else {
        // Capitalize first letter and replace hyphens with spaces
        name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      }
      
      breadcrumbs.push({
        name,
        path: constructedPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // If we only have the Home breadcrumb, don't render anything
  if (breadcrumbs.length <= 1 && path === '/') {
    return null;
  }
  
  // Generate JSON-LD structured data for breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}${breadcrumb.path}`,
        'name': breadcrumb.name
      }
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center text-sm text-gray-600">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={breadcrumb.path}>
                <li 
                  className={`flex items-center ${isLast ? 'font-semibold text-gray-800' : ''}`}
                >
                  {!isLast ? (
                    <Link 
                      href={breadcrumb.path} 
                      className="hover:text-blue-600 transition duration-150"
                    >
                      <span>{breadcrumb.name}</span>
                    </Link>
                  ) : (
                    <span aria-current="page">{breadcrumb.name}</span>
                  )}
                </li>
                {!isLast && (
                  <li className="mx-2 text-gray-400">
                    <span>/</span>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
