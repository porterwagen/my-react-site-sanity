import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { getAllPageSlugs, getPageBySlug, getImageUrl } from '../lib/sanity-utils';
import { useRouter } from 'next/router';
import { PortableText } from '@portabletext/react';

// This component will handle Sanity pages or show a 404
export default function DynamicPage({ page, lastFetched }) {
  const router = useRouter();

  // If fallback is true and the page is not yet generated,
  // this will be displayed initially until the page is generated
  if (router.isFallback) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle the case where the page couldn't be found
  if (!page) {
    return (
      <Layout>
        <SEO 
          title="Page Not Found | My React Site" 
          description="The page you're looking for could not be found."
        />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 p-6 rounded-md">
            <p className="text-red-700 text-center text-lg">Page not found</p>
            <div className="text-center mt-4">
              <Link 
                href="/" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const pageImage = page.mainImage ? getImageUrl(page.mainImage) : null;
  const customBreadcrumbPath = `/${page.slug.current}`;

  return (
    <Layout hideBreadcrumbs={true}>
      <SEO 
        title={`${page.title} | My React Site`}
        description={page.excerpt || ''}
      />
      
      <PageHeader 
        title={page.title}
        showBreadcrumbs={true}
        customPath={customBreadcrumbPath}
      >
        <div className="text-sm text-gray-500">
          Last updated: {new Date(lastFetched).toLocaleTimeString()}
        </div>
      </PageHeader>
      
      <div className="container mx-auto px-4 py-8">
        {pageImage && (
          <div className="mb-8">
            <img 
              src={pageImage}
              alt={page.title || 'Featured image'}
              className="w-full max-h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        
        {/* Render page content */}
        <div className="prose prose-blue max-w-none">
          {page.content && (
            <PortableText
              value={page.content}
              components={{
                types: {
                  // Add any custom components for block types here
                  image: ({value}) => {
                    if (!value.asset) return null;
                    return (
                      <img
                        src={getImageUrl(value)}
                        alt={value.alt || 'Image'}
                        className="w-full rounded-lg"
                      />
                    );
                  },
                },
                marks: {
                  // Add any custom mark components here
                  link: ({children, value}) => {
                    const rel = value.href.startsWith('/') ? undefined : 'noreferrer noopener';
                    return (
                      <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
                        {children}
                      </a>
                    );
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

// This function gets called at build time to generate paths
export async function getStaticPaths() {
  try {
    // Get all page slugs from Sanity
    const slugs = await getAllPageSlugs();
    
    // Filter out slugs that match existing static pages
    // These are page names we want to protect from being overridden
    const reservedSlugs = ['index', 'about', 'projects', 'blog', 'pages', 'api'];
    
    const filteredSlugs = slugs.filter(slug => !reservedSlugs.includes(slug));
    
    // Generate the paths for Sanity pages
    const paths = filteredSlugs.map((slug) => ({
      params: { slug },
    }));

    return { 
      paths, 
      // We'll use 'fallback: blocking' so new pages are generated on-demand
      fallback: 'blocking'
    };
  } catch (error) {
    console.error("Error generating page paths:", error);
    return { paths: [], fallback: 'blocking' };
  }
}

// This gets called at build time and when revalidating
export async function getStaticProps({ params }) {
  try {
    const page = await getPageBySlug(params.slug);
    
    // If page not found, return 404
    if (!page) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    return {
      props: { 
        page,
        lastFetched: new Date().toISOString(),
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching page content:", error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}