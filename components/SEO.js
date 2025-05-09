import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO({ 
  title, 
  description, 
  ogImage,
  ogType = 'website'
}) {
  const router = useRouter();
  const siteTitle = `${title} | My React Site`;
  
  // Build canonical URL dynamically based on the current path
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const path = router.asPath === '/' ? '/' : router.asPath;
  const canonical = `${origin}${path}`;
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={`${origin}${ogImage}`} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={`${origin}${ogImage}`} />}
    </Head>
  );
}