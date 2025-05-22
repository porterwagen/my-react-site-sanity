/**
 * Functions to fetch content from WordPress API
 */

const API_URL = 'https://cms.awesomedemo.com/wp-json/wp/v2';

/**
 * Get posts from WordPress
 * @param {number} count - Number of posts to fetch
 * @returns {Promise<Array>} - Array of posts
 */
export async function getPosts(count = 10) {
  try {
    const response = await fetch(`${API_URL}/posts?_embed&per_page=${count}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
}

/**
 * Get a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post object or null if not found
 */
export async function getPostBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/posts?_embed&slug=${slug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Format the WordPress post date
 * @param {string} dateString - Date string from WordPress
 * @returns {string} - Formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Extract image from WordPress post
 * @param {Object} post - WordPress post object
 * @returns {string|null} - URL of the featured image or null if not found
 */
export function getFeaturedImage(post) {
  if (
    post._embedded &&
    post._embedded['wp:featuredmedia'] &&
    post._embedded['wp:featuredmedia'][0].source_url
  ) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

/**
 * Get pages from WordPress
 * @param {number} count - Number of pages to fetch
 * @returns {Promise<Array>} - Array of pages
 */
export async function getPages(count = 20) {
  try {
    const response = await fetch(`${API_URL}/pages?_embed&per_page=${count}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    
    const pages = await response.json();
    return pages;
  } catch (error) {
    console.error('Error getting pages:', error);
    return [];
  }
}

/**
 * Get a single page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} - Page object or null if not found
 */
export async function getPageBySlug(slug) {
  try {
    // Added _embed for media and acf fields with REST API
    const response = await fetch(`${API_URL}/pages?_embed&slug=${slug}&acf_format=standard`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }
    
    const pages = await response.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Error getting page with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all available slugs for pages
 * @returns {Promise<Array<string>>} - Array of page slugs
 */
export async function getAllPageSlugs() {
  const pages = await getPages(100); // Limit to 100 pages
  return pages.map(page => page.slug);
}