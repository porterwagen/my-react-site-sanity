import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import projectsData from '../data/home_projects.json';
import FAQAccordion from '../components/FAQAccordion';

 
export default function Home({ preloadImage, projects }) {

  const desktopWebp = '/images/hero-desktop.webp';
  const mobileWebp = '/images/hero-mobile.webp';
  const desktopJpg = '/images/hero-desktop.jpg';
 
  return (
    <>
      <SEO 
        title="Headless WordPress with Next.js" 
        description="Testing Headless WordPress + Tailwind + Next.js"
      />
      <Head>
        {/* Preload the appropriate WebP image for LCP optimization (mobile by default) */}
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href={preloadImage}
          type="image/webp"
        />
      </Head>

      <Layout>
         
     <section className="relative w-full h-[400px] md:h-[500px] bg-[#937871] overflow-hidden">
      <div className="relative w-full h-full">
        {/* Preload the desktop WebP image for LCP optimization */}
     
      <picture>
        {/* Mobile WebP image (up to 767px) */}
        <source
          media="(max-width: 767px)"
          srcSet={mobileWebp}
          type="image/webp"
        />
        {/* Desktop WebP image (768px and up) */}
        <source
          media="(min-width: 768px)"
          srcSet={desktopWebp}
          type="image/webp"
        />
        {/* Fallback JPG for browsers without WebP support or picture support */}
        <img
          src={desktopJpg}
          alt="Header image"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
          width="1500" // Adjust based on desktop image dimensions
          height="776" // Adjust based on desktop image dimensions
        />
      </picture>
      </div>
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
           Discover Awesomeness
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
             A modern React website built with Next.js and Tailwind CSS, using WordPress as a headless CMS.
          </p>
        </div>
      </div>
   
      
    </section>
        
        <section className="container mx-auto px-4">
          
       
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How Awesome?</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li className="text-gray-700">
              <span className="font-medium text-red-700">NOTE, make bold and sentence below, fill out more</span>
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Headless WordPress Integration</span> - Pull blog posts and pages from WordPress CMS
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Incremental Static Regeneration (ISR)</span> - Content refreshes automatically every 60 seconds
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Interactive Mega Menu</span> - Expandable navigation with rich multimedia content
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Dynamic Blog Section</span> - Showcase WordPress blog posts in a modern layout
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Projects Showcase</span> - Display your portfolio of work with images and descriptions
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Responsive Design</span> - Fully mobile-friendly with tailored navigation for all devices
            </li>
            <li className="text-gray-700">
              <span className="font-medium">SEO Optimized</span> - Built-in SEO component for better search engine visibility
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Direct Page Rendering</span> - WordPress pages served directly from root URLs
            </li>
            <li className="text-gray-700">
              <span className="font-medium">Tailwind CSS</span> - Modern utility-first CSS framework for rapid UI development
            </li>
          </ul>
        </div>
         </section>

        <section className="container mx-auto px-4">
          
       
        {/* Project Feed Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Grid Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <a
                key={project.id}
                href={`/projects#project-${project.id}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
              >
                <div className="relative ">
                  <Image
                    src={project.image_mobile}
                    alt={project.title}
                    width={400}             
                    height={209}     
                    sizes="400px"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                    
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <span className="text-blue-600 font-medium hover:text-blue-800">
                    View Details →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
       </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <FAQAccordion />
          </div>
        </section>

      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // Server-side non-mobile detection (default to mobile preload)
  const userAgent = context.req.headers['user-agent'] || '';
  const isNonMobile = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const preloadImage = isNonMobile ? '/images/hero-desktop.webp' : '/images/hero-mobile.webp';

  // Load projects from JSON file
  const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');
  const projectsData = fs.readFileSync(projectsFilePath, 'utf8');
  const projects = JSON.parse(projectsData);


  return {
    props: {
      preloadImage,
      projects,
    },
  };
}