import Link from 'next/link';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import BlogHeader from '../../components/BlogHeader';
import { getPosts, getPostBySlug, formatDate, getImageUrl } from '../../lib/sanity-utils';
import { calculateReadTime } from '../../lib/helpers';
import { PortableText } from '@portabletext/react';

export default function BlogPost({ post, lastFetched }) {
  const postImage = post ? getImageUrl(post.mainImage) : null;

  // Handle the case where the post couldn't be found
  if (!post) {
    return (
      <Layout>
        <SEO 
          title="Post Not Found | My React Site" 
          description="The blog post you're looking for could not be found."
        />
        <div className="container mx-auto px-4 py-8 text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Post Not Found</h1>
        </div>
        
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-red-50 p-6 rounded-md">
            <p className="text-red-700 text-center text-lg">Post not found</p>
            <div className="text-center mt-4">
              <Link 
                href="/blog" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Return to Blog
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Create custom breadcrumb path that includes post title
  const customBreadcrumbPath = `/blog/${post.slug.current}`;

  // Calculate read time based on the content (estimate from word count)
  const contentText = post.body ? JSON.stringify(post.body) : '';
  const readTime = calculateReadTime(contentText);
  
  return (
    <Layout>
      <SEO 
        title={`${post.title} | My React Site`}
        description={post.excerpt || ''}
      />
      
      <BlogHeader 
        title={post.title}
        date={formatDate(post.publishedAt)}
        readTime={readTime}
        customPath={customBreadcrumbPath}
        className="mb-6"
      >
        <div className="flex justify-between items-center mt-3">
          <div className="text-sm text-gray-500">
            Last updated: {new Date(lastFetched).toLocaleTimeString()}
          </div>
        </div>
      </BlogHeader>
      
      <div className="container mx-auto px-4 pb-8">
        <article>
          
          {postImage && (
            <div className="mb-8">
              <img 
                src={postImage}
                alt={post.title || 'Blog post featured image'}
                className="w-full max-h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          <div className="prose prose-blue max-w-none">
            {post.body && (
              <PortableText
                value={post.body}
                components={{
                  types: {
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
        </article>
      </div>
    </Layout>
  );
}

// This function gets called at build time to generate the paths
export async function getStaticPaths() {
  try {
    // Fetch all posts to generate their paths
    const posts = await getPosts(100); // Limit to 100 posts
    
    // Generate the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { slug: post.slug.current },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } means other routes will be generated on-demand
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return { paths: [], fallback: 'blocking' };
  }
}

// This gets called at build time and when revalidating
export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    
    // If post not found, return 404
    if (!post) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    return {
      props: { 
        post,
        lastFetched: new Date().toISOString(),
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 60 seconds
      revalidate: 60, // In seconds
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}