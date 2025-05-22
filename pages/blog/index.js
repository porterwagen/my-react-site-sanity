import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { getPosts, formatDate, getImageUrl } from '../../lib/sanity-utils';

export default function BlogPage({ posts, lastFetched }) {
  return (
    <Layout>
      <SEO 
        title="Blog | My React Site" 
        description="Read our latest blog posts about web development, design, and more."
      />
      <PageHeader 
        title="Blog"
      >
        <div className="text-sm text-gray-500">
          Last updated: {new Date(lastFetched).toLocaleTimeString()}
        </div>
      </PageHeader>
      
      <div className="container mx-auto px-4 pb-8">
        
        {posts.length === 0 && (
          <div className="bg-gray-50 p-6 rounded-md">
            <p className="text-lg text-center">No posts found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => {
            const postImage = post.mainImage ? getImageUrl(post.mainImage) : null;
            
            return (
              <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
                {postImage && (
                  <div className="relative h-48">
                    <img 
                      src={postImage}
                      alt={post.title || 'Blog post featured image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{formatDate(post.publishedAt)}</p>
                  
                  <h2 className="text-xl font-semibold mb-3 hover:text-blue-600">
                    <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                  </h2>
                  
                  <div className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

// This function gets called at build time and then every 60 seconds
export async function getStaticProps() {
  try {
    const posts = await getPosts(10);
    return {
      props: { 
        posts,
        lastFetched: new Date().toISOString(),
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 60 seconds
      revalidate: 60, // In seconds
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      props: { 
        posts: [],
        lastFetched: new Date().toISOString(),
      },
      revalidate: 60,
    };
  }
}