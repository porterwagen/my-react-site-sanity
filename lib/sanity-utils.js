/**
 * Functions to fetch content from Sanity
 */
import { sanityClient, urlFor } from './sanity';
import { groq } from 'next-sanity';

/**
 * Get posts from Sanity
 * @param {number} count - Number of posts to fetch
 * @returns {Promise<Array>} - Array of posts
 */
export async function getPosts(count = 10) {
  const query = groq`
    *[_type == "post"] | order(publishedAt desc)[0...${count}] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "categories": categories[]->{title, slug},
      "authorName": author->name,
      "authorImage": author->image,
      mainImage
    }
  `;

  try {
    const posts = await sanityClient.fetch(query);
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
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      "categories": categories[]->{title, slug},
      "author": author->{name, image, bio},
      mainImage
    }
  `;

  try {
    const post = await sanityClient.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Format the Sanity post date
 * @param {string} dateString - Date string from Sanity
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
 * Get image URL from Sanity image reference
 * @param {Object} image - Sanity image reference
 * @returns {string|null} - URL of the image or null if not found
 */
export function getImageUrl(image) {
  return image ? urlFor(image).url() : null;
}

/**
 * Get pages from Sanity
 * @param {number} count - Number of pages to fetch
 * @returns {Promise<Array>} - Array of pages
 */
export async function getPages(count = 20) {
  const query = groq`
    *[_type == "page"] | order(title asc)[0...${count}] {
      _id,
      title,
      slug,
      content,
      mainImage
    }
  `;

  try {
    const pages = await sanityClient.fetch(query);
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
  const query = groq`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      mainImage,
      sections
    }
  `;

  try {
    const page = await sanityClient.fetch(query, { slug });
    return page;
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
  const query = groq`*[_type == "page"].slug.current`;
  
  try {
    const slugs = await sanityClient.fetch(query);
    return slugs;
  } catch (error) {
    console.error('Error getting page slugs:', error);
    return [];
  }
}

/**
 * Get projects data
 * @returns {Promise<Array>} - Array of projects
 */
export async function getProjects() {
  const query = groq`
    *[_type == "project"] | order(orderRank desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      categories,
      link
    }
  `;

  try {
    const projects = await sanityClient.fetch(query);
    return projects;
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
}

/**
 * Get a project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object|null>} - Project object or null if not found
 */
export async function getProjectBySlug(slug) {
  const query = groq`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      mainImage,
      body,
      categories,
      link
    }
  `;

  try {
    const project = await sanityClient.fetch(query, { slug });
    return project;
  } catch (error) {
    console.error(`Error getting project with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get global site settings
 * @returns {Promise<Object>} - Site settings
 */
export async function getSiteSettings() {
  const query = groq`*[_type == "siteSettings"][0]`;
  
  try {
    const settings = await sanityClient.fetch(query);
    return settings;
  } catch (error) {
    console.error('Error getting site settings:', error);
    return {};
  }
}
